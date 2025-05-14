import { AuthController } from '../src/controllers/AuthController.js'

describe('AuthController.status()', () => {
  test('Should return loggedIn: false when no user is in session', () => {
    const req = { session: {} }
    const res = { json: jest.fn() }
    const expectedResponse = { loggedIn: false }

    const controller = new AuthController()
    controller.status(req, res)

    expect(res.json).toHaveBeenCalledWith(expectedResponse)
  })
})
