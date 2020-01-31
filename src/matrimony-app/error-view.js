import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
class ErrorView extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
    }
  </style>
    <h1>Error View 404 Page Not Found</h1>
  </template>
    `;
  }
}

window.customElements.define('error-view', ErrorView);
