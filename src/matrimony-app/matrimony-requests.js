import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-button/paper-button.js';
import './ajax-call.js';
class MatrimonyRequests extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
    }

    .card-content {
      text-transform: capitalize;
    }

    paper-card {
      max-width: 300px;
      margin: 10px;

      --paper-card-header-image: {
        height: 200px;
      }
    }
    .card-actions{
      display:flex;
      justify-content:space-between;
    }
  </style>
  <paper-toast id="toast" text={{message}}></paper-toast>
  <ajax-call id="ajax"></ajax-call>
  <template is="dom-repeat" items={{users}}>
    <paper-card image="{{_getImage(item.likedBy.gender,item.likedBy.image)}}" elevation="2" animated-shadow="false">
      <div class="card-content">
        <p>Name: {{item.likedBy.name}}</p>
        <p>Gender: {{item.likedBy.gender}}</p>
      </div>
      <div class="card-actions">
      <paper-button raised on-click="_add">Send Interest</paper-button>
      <paper-button raised on-click="_handleDelete"><iron-icon icon="clear" data-set$={{item}} ></iron-icon></paper-button>
    </div>
    </paper-card>
  </template>
    `;
  }
  ready() {
    super.ready()
    this.addEventListener('ShortListed-User', event => {
      this.users = event.detail.data
      // this.users=event.detail.data.find(element=>element.likedBy=sessionStorage.getItem('mobileNo'))
    })
  }
  connectedCallback() {
    super.connectedCallback();
    let ajax = this.$.ajax;
    ajax._makeAjax(`http://localhost:3000/shortListed?mobileNo=${sessionStorage.getItem('mobileNo')}`, "get", null, false,'ShortListed')
  }
  _getImage(gender,image) {
    if(gender=='Male')
    return this.resolveUrl(`../../images/${gender}/${image}.jpg`);
    else
    return this.resolveUrl(`../../images/${gender}/${image}.jpg`);
  }
}

window.customElements.define('matrimony-requests', MatrimonyRequests);
