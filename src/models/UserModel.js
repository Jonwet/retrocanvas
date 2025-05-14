/**
 * @file Defines the snippet router.
 * @module UserModel
 * @author Jonatan Wetterberg
 */

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

// Create a schema.
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  }
})

schema.add(BASE_SCHEMA)

// Create a model using the schema.
export const UserModel = mongoose.model('User', schema)
