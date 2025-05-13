customElements.define('auth-buttons',

  /**
   *
   */
  class extends HTMLElement {
  /**
   *
   */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
    }

    /**
     *
     */
    connectedCallback () {
      this.loadStatus()
    }

    /**
     *
     */
    async loadStatus () {
      const res = await fetch('/auth/status', { credentials: 'include' })
      const data = await res.json()
      this.render(data.loggedIn)
    }

    /**
     *
     * @param isAuth
     */
    render (isAuth) {
      this.shadowRoot.innerHTML = `
    <style>
      button { margin: 0 5px; }
    </style>
    ${isAuth
? `
      <button id="logoutBtn">Logout</button>
      <button id="galleryBtn">Gallery</button>
    `
: `
      <button id="loginBtn">Login</button>
      <button id="registerBtn">Register</button>
    `}
  `

      if (isAuth) {
        this.shadowRoot.querySelector('#logoutBtn').addEventListener('click', async () => {
          await fetch('/auth/logout', {
            method: 'POST',
            credentials: 'include'
          })
          this.loadStatus()
        })
      } else {
        this.shadowRoot.querySelector('#loginBtn').addEventListener('click', () => {
          window.location.href = '/auth/login'
        })
        this.shadowRoot.querySelector('#registerBtn').addEventListener('click', () => {
          window.location.href = '/auth/register'
        })
      }
    }
  }
)
