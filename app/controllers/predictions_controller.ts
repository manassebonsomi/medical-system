import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import Prediction from '#models/prediction'

export default class PredictionsController {

  async index({ view }: HttpContext) {
    // On récupère toutes les prédictions de la base de données
    const predictions = await Prediction.query().orderBy('created_at', 'desc')

    return view.render('pages/results-prediction', { predictions })
  }

  async predict({ request, response, view, auth }: HttpContext) {
    // Récupération et validation de l'image
    const image = request.file('image', {
      size: '10mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    const modelType = request.input('model')

    if (!image || !image.isValid) {
      return response.badRequest({ message: "Image invalide ou manquante" })
    }

    if (!modelType) {
      return response.badRequest({ message: "Type de modèle invalide" })
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

      // const user = auth.user!

      const record = await Prediction.create({
        filename: image.fileName,
        label: result.label,
        accuracy: result.accuracy,
        modelUsed: modelType,
        // userId: user.id
      })

      // Rendu de la vue avec les données propres
      return view.render('pages/prediction', {
        prediction: record, // On passe l'objet complet de la DB
        // imageUrl: `/uploads/${fileName}`,
        imageUrl: `/uploads/${image.fileName}`, // Chemin pour la balise <img>
      })

    } catch (error) {
      const message = error instanceof Error ? error.message : JSON.stringify(error)
      console.error("Erreur API Python:", message)
      return response.internalServerError("L'API d'analyse médicale est indisponible.")
    }
  }
}