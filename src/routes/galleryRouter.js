import express from 'express'
import { GalleryController } from '../controllers/GalleryController.js'

const controller = new GalleryController()
export const router = express.Router()

router.post('/publish', express.json(), (req, res) => controller.publish(req, res))
router.get('/', (req, res) => controller.list(req, res))
router.get('/view', (req, res) => controller.renderGalleryPage(req, res))
