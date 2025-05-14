import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

const schema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  imageData: {
    type: String,
    required: true
  }
})

schema.add(BASE_SCHEMA)

export const GalleryModel = mongoose.model('Gallery', schema)
