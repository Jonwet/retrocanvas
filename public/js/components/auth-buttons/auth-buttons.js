import { htmlTemplate } from './auth-buttons.html.js'
import { cssTemplate } from './auth-buttons.css.js'

customElements.define('auth-buttons',

  /**
   * Implements the auth buttons component.
   */
  class extends HTMLElement {
    /**
     * Initializes the auth-buttons component by attaching shadow DOM and templates.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    }

    /**
     * Called when the element is inserted into the DOM.
     * Initializes the component by loading the authentication status.
     */
    connectedCallback () {
      this.loadStatus()
    }

    /**
     * Fetches the authentication status from the server and updates the UI accordingly.
     */
    async loadStatus () {
      const res = await fetch('/auth/status', { credentials: 'include' })
      const data = await res.json()
      this.render(data.loggedIn)
    }

    /**
     * Updates the UI based on the authentication status.
     *
     * @param {boolean} isAuth - Indicates whether the user is authenticated.
     */
    render (isAuth) {
      const container = this.shadowRoot.querySelector('#auth-actions')
      container.innerHTML = ''

      if (isAuth) {
        const logoutBtn = document.createElement('button')
        logoutBtn.textContent = 'Logout'
        logoutBtn.addEventListener('click', async () => {
          await fetch('/auth/logout', {
            method: 'POST',
            credentials: 'include'
          })
          this.loadStatus()
        })

        container.append(logoutBtn)
      } else {
        const loginBtn = document.createElement('button')
        loginBtn.textContent = 'Login'
        loginBtn.addEventListener('click', () => {
          window.location.href = '/retro-canvas/auth/login'
        })

        const registerBtn = document.createElement('button')
        registerBtn.textContent = 'Register'
        registerBtn.addEventListener('click', () => {
          window.location.href = '/retro-canvas/auth/register'
        })

        container.append(loginBtn, registerBtn)
      }
    }
  }
)
