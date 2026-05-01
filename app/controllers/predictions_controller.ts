import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'


export default class PredictionsController {

  async predict({ request, response }: HttpContext) {

    // const image = request.file('image')

    const image = request.file('image', {
        size: '5mb',
        extnames: ['jpg', 'png', 'jpeg']
      })

    if (!image) {
      return response.badRequest({ message: "Image requise" })
    }

    await image.move('uploads')

    const formData = new FormData()
    formData.append(
      'file',
      fs.createReadStream(`uploads/${image.fileName}`)
    )

    const apiResponse = await axios.post(
      'http://localhost:8000/predict',
      formData,
      {
        headers: formData.getHeaders()
      }
    )

    console.log(apiResponse.data)
    console.log(apiResponse)

    // return response.ok(apiResponse.data)

    return response.status(200).send(
      await view.render('pages/prediction', {
        apiResponse.data
      })
    )
  }
}