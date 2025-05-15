/**
 * @jest-environment jsdom
 */

import '../public/js/components/pixel-drawer/pixel-drawer.js'

describe('PixelDrawer', () => {
  let drawer

  beforeEach(() => {
    drawer = new (customElements.get('pixel-drawer'))()
  })

  test('setTool only accepts valid tools', () => {
    drawer.setTool('brush')
    expect(drawer.currentTool).toBe('brush')

    drawer.setTool('eraser')
    expect(drawer.currentTool).toBe('eraser')

    drawer.setTool('invalidTool')
    expect(drawer.currentTool).toBe('eraser') // unchanged
  })
})
