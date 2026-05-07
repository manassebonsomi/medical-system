import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

export default class PredictionsController {
  async predict({ request, response, view }: HttpContext) {
    // Récupération et validation de l'image
    const image = request.file('image', {
      size: '10mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    if (!image || !image.isValid) {
      return response.badRequest({ message: "Image invalide ou manquante" })
    }

    // Définir le chemin de destination (dans public/uploads pour qu'elle soit accessible)
    const uploadPath = app.makePath('public/uploads')
    
    // Déplacer le fichier
    await image.move(uploadPath, {
      name: `${Date.now()}.${image.extname}`, // Nom unique pour éviter les conflits
      overwrite: true,
    })

    const filePath = `${uploadPath}/${image.fileName}`

    try {
      // Préparation de l'envoi vers l'API Flask
      const formData = new FormData()
      // Note : 'file' doit correspondre à request.files['file'] côté Python
      formData.append('file', fs.createReadStream(filePath))

      const apiResponse = await axios.post(
        'http://localhost:5000/api/predict',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      )

      // Extraction des données de prédiction
      const result = apiResponse.data.prediction

      // Rendu de la vue avec les données propres
      return view.render('pages/prediction', {
        label: result.label,
        accuracy: result.accuracy,
        imageUrl: `/uploads/${image.fileName}`, // Chemin pour la balise <img>
      })

    } catch (error) {
      console.error("Erreur API Python:", error.message)
      return response.internalServerError("L'API d'analyse médicale est indisponible.")
    }
  }
}