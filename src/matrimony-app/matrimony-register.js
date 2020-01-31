import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import './ajax-call.js'
class MatrimonyRegister extends PolymerElement {
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
    --paper-input-container: {
      padding: 0;
    }

    ;

    --paper-input-container-underline: {
      display: none;
      height: 0;
    }

    ;

    --paper-input-container-underline-focus: {
      display: none;
    }

    ;

    /* New custom styles */
    --paper-input-container-input: {
      box-sizing: border-box;
      font-size: inherit;
      padding: 4px;
    }

    ;

    --paper-input-container-input-focus: {
      background: rgba(0, 0, 0, 0.1);
    }

    ;

    --paper-input-container-input-invalid: {
      background: rgba(255, 0, 0, 0.3);
    }

    ;

    --paper-input-container-label: {
      top: -8px;
      left: 4px;
      background: white;
      padding: 2px;
      font-weight: bold;
    }

    ;

    --paper-input-container-label-floating: {
      width: auto;
    }

    ;
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

  paper-tabs {
    --paper-tabs-selection-bar-color: black;
  }

  iron-icon {
    margin-right: 10px;
  }

  iron-pages {
    margin-top: 20px;
  }
</style>
<ajax-call id="ajax"></ajax-call>
<iron-form id="form">
  <paper-tabs selected={{selected}}>
    <paper-tab>Personal Details</paper-tab>
    <paper-tab>Professional Details</paper-tab>
  </paper-tabs>
  <iron-pages selected={{selected}}>
    <div>
      <form>
        <paper-input class="custom" always-float-label label="Name" id="name" required pattern="[a-zA-Z]*">
        </paper-input>
        <paper-radio-group selected="Male" id="gender">
          <label for="Gender">Gender</label>
          <paper-radio-button name="Male">Male</paper-radio-button>
          <paper-radio-button name="Female">Female</paper-radio-button>
        </paper-radio-group>
        <paper-dropdown-menu id="religion" name="Religion" vertical-offset="60">
          <paper-listbox slot="dropdown-content" class="dropdown-content" selected=0>
            <paper-item>Select Religion</paper-item>
            <paper-item>Hindu</paper-item>
            <paper-item>Jain</paper-item>
            <paper-item>Muslim</paper-item>
            <paper-item>Sikh</paper-item>
            <paper-item>Christian</paper-item>
          </paper-listbox>
        </paper-dropdown-menu>
        <paper-input class="custom" always-float-label id="age" label="Age" required type="number"></paper-input>
        <paper-input class="custom" always-float-label id="mail" label="Email" required
        pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"></paper-input>
        <paper-input class="custom" always-float-label label="Mobile Number" id="mobileNo" required type="number"
        maxlength="10" error-message="Please Enter Mobile No."></paper-input>
        <paper-button raised on-click="_next">Next</paper-button>
      </form>
    </div>
    <div>
      <form>
        <paper-input class="custom" always-float-label label="Education" id="education" required pattern="[a-zA-Z]*">
        </paper-input>
        <paper-input class="custom" always-float-label label="Education Detail" id="educationDetail" required pattern="[a-zA-Z]*">
        </paper-input>
        <paper-input class="custom" always-float-label label="Occupation Detail" id="occupationDetail" required pattern="[a-zA-Z]*">
        </paper-input>
        <paper-input class="custom" always-float-label label="Annual Income" id="annualIncome">
        </paper-input>
        <paper-button raised on-click=_register>Register</paper-button>
      </form>
    </div>
  </iron-pages>
</iron-form>
`;
}
static get properties()
{
  return{
    selected:{
      type:Boolean
    }
  }
}
ready()
{
  super.ready()
  this.addEventListener('Existing-User',event=>{
    let data=event.detail.data;
    let mobileNo=this.$.mobileNo.value;
    if(data.length!=0)
    {
      alert("user already exist")
    }
    else{
      console.log(this.$.gender.selected)
      let name=this.$.name.value;
      let mail=this.$.mail.value;
      let gender=this.$.gender.selected;
      let religion=this.$.religion.value;
      let education=this.$.education.value;
      let educationDetail=this.$.educationDetail.value;
      let occupationDetail=this.$.occupationDetail.value;
      let annualIncome=this.$.annualIncome.value;
      let age=this.$.age.value;
  let ajax=this.$.ajax;
  let postObj={name,mobileNo,mail,religion,education,educationDetail,gender,occupationDetail,annualIncome,age,status:'like',image:1}
      ajax._makeAjax(`http://localhost:3000/users`,"post",postObj,false,'')
      this.dispatchEvent(new CustomEvent('Refresh-Home',{bubbles:true,composed:true}))
    }
  })
}
connectedCallback()
{
  super.connectedCallback();
  this.selected=0;
}
_next()
{
  this.selected=1;
}
_register()
{
  let mobileNo=this.$.mobileNo.value;
  let ajax=this.$.ajax;
  ajax._makeAjax(`http://localhost:3000/users?mobileNo=${mobileNo}`,"get",null,false,'Register')
}
}

window.customElements.define('matrimony-register', MatrimonyRegister);