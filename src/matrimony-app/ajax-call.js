import {html,PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

        class AjaxCall extends PolymerElement {
            static get properties() {
                return {
                    prop1: {
                        type: String,
                        value: 'ajax-call'
                    },
                    action: {
                        type: String
                    }
                };
            }
            static get template()
            {
                return html `
                <style>
                :host {
                    display: block;
                }
            </style>
            <iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" on-error="_handleError"
                content-type="application/json"></iron-ajax>
                `
            }
/**
 *@param {String} url url of specific location
 *@param {String} method method type:get/put/post/delete
 *@param {Object{}|Null} postObj needs object as value for put/post and null for get/delete
 *@param {Boolean} sync true for synchronization and false for asynchronization
 **/
            _makeAjax(url, method, postObj,sync,action) {
                this.action=action;
                const ajax = this.$.ajax;
                ajax.sync = sync;
                ajax.method = method;
                ajax.url = url;
                ajax.body = postObj ? JSON.stringify(postObj) : undefined;
                ajax.generateRequest();
            }
       /**
       * Fired everytime when ajax call is made.It handles response of the ajax 
       * */
            _handleResponse(event) {
                let data=event.detail.response;
                console.log(event.detail.response);
                
            //All the response has been handled through switch case by dispatching event details to the parent
                switch (this.action) {
                    case 'Home':
                        // let gender=sessionStorage.getItem('gender')
                        // if(gender=='Male')
                        // {
                        //   gender='Female'
                        // }
                        // else
                        // {
                        //   gender='Male'
                        // }
                        this.dispatchEvent(new CustomEvent('Home-Data', { detail: { data }, bubbles: true, composed: true }))
                        // setTimeout(()=>{this._makeAjax(`http://localhost:3000/users?gender=${gender}`, "get", null, false,'Home')},1000)
                        break;
                    case 'Login':
                        this.dispatchEvent(new CustomEvent('User-Data', { detail: { data }, bubbles: true, composed: true }))
                        break;
                    case 'Register':
                        this.dispatchEvent(new CustomEvent('Existing-User', { detail: { data }, bubbles: true, composed: true }))
                        break;
                    case 'ShortListed':
                        this.dispatchEvent(new CustomEvent('ShortListed-User', { detail: { data }, bubbles: true, composed: true }))
                        // setTimeout(()=>{this._makeAjax(`http://localhost:3000/shortListed?likedBy=${sessionStorage.getItem('mobileNo')}`, "get", null, false,'ShortListed')},1000)
                        break;
                    case 'Already-Shortlisted':
                        this.dispatchEvent(new CustomEvent('Already-Shortlisted', { detail: { data }, bubbles: true, composed: true }))
                        break;
                    default: console.log("in default")
                        break;
                }
            }
            //_handleError is fired in case of any error occured in making ajax call
            _handleError(event) {
                console.log("in error", event);
            }
        }

        window.customElements.define('ajax-call', AjaxCall);