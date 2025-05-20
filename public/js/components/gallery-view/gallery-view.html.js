/**
 * Creates a gallery template containing images and navigation buttons.
 *
 * @param {Array<object>} images - An array of image objects, each containing `imageData` (string) and `user` (string).
 * @returns {HTMLTemplateElement} A template element containing the gallery structure.
 */
export function createGalleryTemplate (images) {
  const template = document.createElement('template')
  template.innerHTML = `
    <div class="gallery">
      ${images.map(img => `
        <div class="item">
          <img src="${img.imageData}" alt="Artwork by ${img.user}" />
          <p>${img.user}</p>
        </div>
      `).join('')}
    </div>
  `
  return template
}
