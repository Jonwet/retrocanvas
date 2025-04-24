import '../pixel-drawer/index.js';

customElements.define('pixel-app', 
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <pixel-drawer></pixel-drawer>
      `;
    }

    connectedCallback() {
      const canvas = this.shadowRoot.querySelector('pixel-drawer');
    }
  }
);