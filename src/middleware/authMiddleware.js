/**
 * @file Defines the snippet router.
 * @module authMiddleware
 * @author Jonatan Wetterberg
 */

/**
 * Middleware to check if the user is authenticated.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {undefined} - Does not return a value, calls next() or sends a redirect.
 */
export function isAuthenticated (req, res, next) {
  if (req.session.user) {
    return next()
  }

  req.session.flash = { type: 'danger', text: 'Please log in first!' }
  return res.redirect('/retro-canvas/gallery')
}
