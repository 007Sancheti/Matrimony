import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import './ajax-call.js';
class MatrimonyHome extends PolymerElement {
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
        background-size: contain;
      }
    }
  </style>
  <app-localstorage-document id="get" session-only="true">
  </app-localstorage-document>
  <paper-toast id="toast" text={{message}}></paper-toast>
  <ajax-call id="ajax"></ajax-call>
  <template is="dom-repeat" items={{users}}>
    <paper-card image="{{_getImage(item.gender,item.image)}}" elevation="2" animated-shadow="false">
      <div class="card-content">
        <p>Name: {{item.name}}</p>
        <p>Gender: {{item.gender}}</p>
        <p>Age: {{item.age}}</p>
      </div>
      <div class="card-actions">
        <paper-button id="like" raised on-click="_like">{{item.status}}</paper-button>
      </div>
    </paper-card>
  </template>
    `;
  }
  static get properties()
  {
    return {
      "obj":{
        type:Object
      },
      "ajax":{
        type:Object,
        value:{}
      },
      "search":{
        type:String
      }
    }
  }
  ready() {
    super.ready()
    console.log(this.$.get.getStoredValue('search').then(value=>{
      console.log(value)
    }))
    this.addEventListener('Home-Data', event => {
      this.users = event.detail.data
    })
    this.addEventListener('Already-Shortlisted', event => {
      if(event.detail.data!='')
      {
        this.message="User Already Shortlisted"
        this.$.toast.open();
      }
      else{
        let likedBy=sessionStorage.getItem('mobileNo');
        this.obj.status='Unlike'
        this.ajax._makeAjax(`http://localhost:3000/users/${this.obj.id}`,"put",this.obj, false,'')
        let {name,mobileNo,mail,religion,education,educationDetail,gender,occupationDetail,image,annualIncome,age}=this.obj
        let loginUserData=JSON.parse(sessionStorage.getItem('userData'))
        let postObj={name,mobileNo,mail,religion,education,educationDetail,
          gender,occupationDetail,image,annualIncome,age,status:'Unike',likedBy:loginUserData}
        this.ajax._makeAjax("http://localhost:3000/shortListed", "post",postObj, false,'')
        this.message="Liked Successfully"
        this.$.toast.open();
        this.dispatchEvent(new CustomEvent('Refresh-Likes',{bubbles:true,composed:true}))
      }
    })
  }
  connectedCallback() {
    super.connectedCallback();
    //to fetch all the available products
    this.ajax=this.$.ajax;
    let gender=sessionStorage.getItem('gender')
    if(gender=='Male')
    {
      gender='Female'
    }
    else
    {
      gender='Male'
    }
    this.ajax._makeAjax(`http://localhost:3000/users?gender=${gender}`, "get", null, false,'Home')
  }
  _like(event)
  {
    console.log(event.model.item)
    this.obj=event.model.item
    this.ajax._makeAjax(`http://localhost:3000/shortListed?name=${this.obj.name}`, "get",null, false,'Already-Shortlisted')
    console.log(name)

  }
  getData()
  {
    this.ajax=this.$.ajax;
    let gender=sessionStorage.getItem('gender')
    if(gender=='Male')
    {
      gender='Female'
    }
    else
    {
      gender='Male'
    }
    this.ajax._makeAjax(`http://localhost:3000/users?gender=${gender}`, "get", null, false,'Home')
  }
  _getImage(gender,image) {
    if(gender=='Male')
    return this.resolveUrl(`../../images/${gender}/${image}.jpg`);
    else
    return this.resolveUrl(`../../images/${gender}/${image}.jpg`);
  }
}

window.customElements.define('matrimony-home', MatrimonyHome);
