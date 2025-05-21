import express from 'express'
import { GalleryController } from '../controllers/GalleryController.js'
import { isAuthenticated } from '../middleware/authMiddleware.js'

const controller = new GalleryController()
export const router = express.Router()

router.param('id', (req, res, next, id) => controller.loadGalleryDocument(req, res, next, id))

router.post('/publish', express.json(), (req, res) => controller.publish(req, res))
router.get('/', (req, res) => controller.list(req, res))
router.get('/view', (req, res) => controller.renderGalleryPage(req, res))

router.get('/:id/delete', isAuthenticated, (req, res, next) => controller.delete(req, res, next))
router.post('/:id/delete', isAuthenticated, (req, res, next) => controller.deletePost(req, res, next))
