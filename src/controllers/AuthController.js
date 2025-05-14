/**
 * @file Defines the Auth router.
 * @module taskRouter
 * @author Jonatan Wetterberg
 */

import bcrypt from 'bcryptjs'
import { UserModel } from '../models/UserModel.js'

/**
 *
 */
export class AuthController {
  /**
   * Displays the registration form.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  register (req, res) {
    res.render('auth/register')
  }

  /**
   * Handles the registration form submission.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @returns {Promise<void>} - A promise that resolves when the user is registered.
   */
  async registerPost (req, res) {
    try {
      const { username, password } = req.body
      if (!username || !password) {
        req.session.flash = { type: 'danger', text: 'All fields are required!' }
        return res.redirect('/auth/register')
      }

      const existingUser = await UserModel.findOne({ username })
      if (existingUser) {
        req.session.flash = { type: 'danger', text: 'Username already exists!' }
        return res.redirect('./register')
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      await UserModel.create({ username, password: hashedPassword })

      req.session.flash = { type: 'success', text: 'Registration successful! Please log in.' }
      res.redirect('/')
    } catch (error) {
      console.error(error)
      req.session.flash = { type: 'danger', text: 'Error registering user!' }
      return res.redirect('/auth/register')
    }
  }

  /**
   * Displays the login form.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  login (req, res) {
    res.render('auth/login')
  }

  /**
   * Handles the login form submission.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @returns {Promise<void>} - A promise that resolves when the user is registered.
   */
  async loginPost (req, res) {
    try {
      const { username, password } = req.body
      if (!username || !password) {
        req.session.flash = { type: 'danger', text: 'All fields are required!' }
        return res.redirect('/auth/login')
      }

      const user = await UserModel.findOne({ username })
      if (!user) {
        req.session.flash = { type: 'danger', text: 'Invalid username or password!' }
        return res.status(401).render('auth/login', { flash: req.session.flash })
      }

      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {
        req.session.flash = { type: 'danger', text: 'Invalid username or password!' }
        return res.status(401).render('auth/login', { flash: req.session.flash })
      }

      req.session.user = { id: user._id, username: user.username }
      req.session.flash = { type: 'success', text: 'Logged in successfully!' }
      res.redirect('/')
    } catch (error) {
      console.error(error)
      req.session.flash = { type: 'danger', text: 'Error logging in!' }
      return res.redirect('/auth/login')
    }
  }

  /**
   * Logs out the user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  logout (req, res) {
    // First destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err)
        return res.redirect('./')
      }
      res.clearCookie('connect.sid')
      // Redirect directly to home after logout
      res.redirect('/')
    })
  }

  /**
   * Checks if the user is logged in.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  status (req, res) {
    if (req.session.user) {
      res.json({ loggedIn: true, user: req.session.user })
    } else {
      res.json({ loggedIn: false })
    }
  }
}
