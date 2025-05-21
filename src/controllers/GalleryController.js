import { GalleryModel } from '../models/GalleryModel.js'

/**
 *
 */
export class GalleryController {
  /**
   * Renders the gallery page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  renderGalleryPage (req, res) {
    console.log('Rendering gallery view')

    res.render('gallery/gallery')
  }

  /**
   * Publishes an image to the gallery.
   *
   * @param {object} req - Express request object containing session and body data.
   * @param {object} res - Express response object used to send the response.
   * @returns {Promise<void>} A promise that resolves when the image is published.
   */
  async publish (req, res) {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { imageData } = req.body
    if (!imageData) {
      return res.status(400).json({ error: 'Missing image data' })
    }

    await GalleryModel.create({
      user: req.session.user.username,
      imageData
    })

    res.status(201).json({ message: 'Published' })
  }

  /**
   * Retrieves a list of images from the gallery and sends them as a JSON response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object used to send the JSON response.
   */
  async list (req, res) {
    const images = await GalleryModel.find().sort({ createdAt: -1 }).limit(50)
    res.json(images)
  }

  /**
   * Deletes the specified image.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @returns {undefined} - Does not return a value, redirects to the snippets list.
   */
  async deletePost (req, res) {
    try {
      if (req.doc.user.toString() !== req.session.user.id) {
        req.session.flash = { type: 'danger', text: 'You are not authorized to delete this snippet.' }

        return res.status(403).render('snippets/delete', { snippet: req.doc, flash: req.session.flash, viewData: req.doc })
      }

      await req.doc.deleteOne()

      req.session.flash = { type: 'success', text: 'The snippet was deleted successfully.' }

      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
    }
  }
}
