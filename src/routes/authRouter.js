/**
 * @file Defines the auth router.
 * @module taskRouter
 * @author Jonatan Wetterberg
 */

import express from 'express'
import { AuthController } from '../controllers/AuthController.js'

export const router = express.Router()

// Create a new instance of the controller.
const controller = new AuthController()

// Map HTTP verbs and route paths to controller action methods.
router.get('/register', (req, res) => controller.register(req, res))
router.post('/register', (req, res) => controller.registerPost(req, res))

router.get('/login', (req, res) => controller.login(req, res))
router.post('/login', (req, res) => controller.loginPost(req, res))

router.post('/logout', (req, res) => controller.logout(req, res))

router.get('/status', (req, res) => controller.status(req, res))
