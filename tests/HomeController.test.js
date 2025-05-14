import { HomeController } from '../src/controllers/HomeController.js'

describe('HomeController.index()', () => {
  test('should render the "home/index" view', () => {
    // Arrange
    const req = {}
    const res = { render: jest.fn() }
    const next = jest.fn()

    const controller = new HomeController()

    controller.index(req, res, next)

    expect(res.render).toHaveBeenCalledWith('home/index')
  })
})
