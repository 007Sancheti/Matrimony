import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import './ajax-call.js';
class MatrimonyLogin extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
    }
    paper-input.custom {
    margin-bottom: 14px;
    --primary-text-color: #01579B;
    --paper-input-container-color: black;
    --paper-input-container-focus-color: black;
    --paper-input-container-invalid-color: black;
    border: 1px solid #BDBDBD;
    border-radius: 5px;

    /* Reset some defaults */
    --paper-input-container: { padding: 0;};
    --paper-input-container-underline: { display: none; height: 0;};
    --paper-input-container-underline-focus: { display: none; };

    /* New custom styles */
    --paper-input-container-input: {
      box-sizing: border-box;
      font-size: inherit;
      padding: 4px;
    };
    --paper-input-container-input-focus: {
      background: rgba(0, 0, 0, 0.1);
    };
    --paper-input-container-input-invalid: {
      background: rgba(255, 0, 0, 0.3);
    };
    --paper-input-container-label: {
      top: -8px;
      left: 4px;
      background: white;
      padding: 2px;
      font-weight: bold;
    };
    --paper-input-container-label-floating: {
      width: auto;
    };
  }
    form {
      width: 500px;
      border: 2px solid black;
      margin: 0px auto;
      padding: 20px;
    }

    paper-button {
      margin-top: 20px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    iron-icon {
      margin-right: 10px;
    }
  </style>
  <app-localstorage-document id="get" key="search" data="{{search}}" session-only="true">
  </app-localstorage-document>
  <app-location route={{route}}></app-location>
  <h1>Hello {{prop1}}</h1>
  <paper-toast id="toast" text={{message}}></paper-toast> 
  <iron-form id="form">
    <form>
      <ajax-call id="ajax"></ajax-call>
      <paper-input class="custom" always-float-label label="Mobile Number" id="mobileNo" required type="number" maxlength="10"
      error-message="Please Enter Mobile No."></paper-input>
      <paper-input class="custom" always-float-label type="password" id="password" label="Password"></paper-input class="custom" always-float-label>
      <paper-button raised on-click=_login>Login</paper-button>
    </form>
  </iron-form>
    `;
  }
  ready()
  {
    super.ready();
    this.addEventListener('User-Data', event => {
      console.log("running")
      let userData = event.detail.data
      if(userData.length!=0)
      {
        let {name,mobileNo,mail,religion,education,educationDetail,gender,occupationDetail,image,annualIncome,age}=userData[0]
     let postObj={name,mobileNo,mail,religion,education,educationDetail,gender,occupationDetail,image,annualIncome,age}
        console.log(userData[0].gender)
        this.message='Validation Successful'
        this.$.toast.open();
        sessionStorage.setItem('mobileNo',mobileNo)
        sessionStorage.setItem('gender',gender)
        sessionStorage.setItem('login',true)
        sessionStorage.setItem('userData',JSON.stringify(postObj))
        this.dispatchEvent(new CustomEvent('LoggedIn-Nav',{bubbles:true,composed:true}))
        this.set('route.path','/home')
      }
      else{
        this.message='Wrong Password'
        this.$.toast.open();
      }
    })
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'login-page'
      },
      action: {
        type: String
      },
      message:{
        type:String
      },
      search:{
        type:String
      }
    };
  }
  /**
  *_login() is fired when user clicks on login button
  **/
  _login()
  {
    let mobileNo=this.$.mobileNo.value;
    let password=this.$.password.value;
    let ajax=this.$.ajax;
    ajax._makeAjax(`http://localhost:3000/users?mobileNo=${mobileNo}&&password=${password}`, "get", null, false,'Login')
  }
}

window.customElements.define('matrimony-login', MatrimonyLogin);
