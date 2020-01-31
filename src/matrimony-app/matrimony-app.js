import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js'
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/iron-icon/iron-icon';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import { setRootPath } from '@polymer/polymer/lib/utils/settings.js';
/**
 * @customElement
 * @polymer
 */
setRootPath(MyAppGlobals.rootPath);
class MatrimonyApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        app-toolbar {
          background-color: #dcdcdc;
          display:flex;
        }
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: #333;
        }
        
        li {
          float: left;
          border-right:1px solid #bbb;
        }
        
        li:last-child {
          border-right: none;
        }
        
        li a {
          display: block;
          color: white;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
        }
        
        li a:hover:not(.active) {
          background-color: #111;
        }
        
        .active {
          background-color: #4CAF50;
        }
        [hidden] {
          display: none !important;
        }
        .logout {
        }
      </style>
      <app-location route="{{route}}"></app-location>
    <app-route route="{{route}}" data="{{routeData}}" pattern="[[rootPath]]:page" tail="{{subRoute}}"></app-route>
    <app-drawer-layout force-narrow>
      <app-drawer id="drawer" slot="drawer">
        <app-toolbar></app-toolbar>
        <!-- Nav on mobile: side nav menu -->
        <paper-listbox selected="[[page]]" attr-for-selected="name">
          <template is="dom-repeat" items="{{items}}">
          <a href="[[rootPath]]{{item.route}}" class="link">
            <paper-item name$="{{item.route}}">{{item.label}}</paper-item>
            </a>
          </template>
        </paper-listbox>
      </app-drawer>
      <app-header-layout has-scrolling-region>
        <app-header class="main-header" slot="header">
          <app-toolbar>
            <paper-icon-button class="menu-button" icon="menu" drawer-toggle hidden$="{{wideLayout}}">
            </paper-icon-button>
            <p>Matrimony Website</p>
          </app-toolbar>
          <app-toolbar class="tabs-bar" hidden$="{{!wideLayout}}">
            <!-- Nav on desktop: tabs -->
              <template is="dom-repeat" items="{{items}}">
              <ul>
  <li><a href="[[rootPath]]{{item.route}}" class="link" hidden$={{item.login}}>{{item.label}}</a></li>
</ul>
              </template>
              <paper-button class="logout" hidden$={{!login}} on-click="_logOut"><iron-icon src="../../images/logout.png"></iron-icon></paper-button>
          </app-toolbar>
          <iron-pages selected="[[page]]" attr-for-selected="name" role="main" fallback-selection="error404">
            <matrimony-home id="home" name="home" hidden$={{!login}}></matrimony-home>
            <matrimony-register name="register" hidden$={{login}}></matrimony-register>
            <matrimony-login name="login" hidden$={{login}}></matrimony-login>
            <matrimony-shortlisted id="likes" name="shortlisted" hidden$={{!login}}></matrimony-shortlisted>
            <matrimony-requests name="requests" route={{subRoute}} hidden$={{!login}}></matrimony-requests>
            <error-view name="error404"></error-view>
          </iron-pages> 
        </app-header>
      </app-header-layout>
    </app-drawer-layout>
    <iron-media-query query="min-width: 600px" query-matches="{{wideLayout}}"></iron-media-query>
    `;
  }
  _logOut()
  {
    sessionStorage.clear();
    this.items=[{label:'Home',route:'home',login:true},{ label:'Login',route:'login',login:false},
    {label:'Register',route:'register',login:false},{label:'My shortlisted',route:'shortlisted',login:true},
    {label:'Requests',route:'requests',login:true}]
    this.login=false;
    this.set('route.path','/login')
  }
  // _getIcon()
  // {
  //   return this.resolveUrl(`../../images/logout.png`)
  // }
  ready()
  {
    super.ready();
    if(sessionStorage.getItem('login'))
    {
      this.items[0].login=false;
      this.items[1].login=true;
      this.items[2].login=true;
      this.items[3].login=false;
      this.items[4].login=false;
      this.login=true;
    }
    this.addEventListener('Refresh-Likes',()=>
    {
      import('./matrimony-shortlisted.js');
      console.log("success")
      this.$.likes.getData();
    })
    this.addEventListener('LoggedIn-Nav',()=>
    {
      this.items[0].login=false;
      this.notifyPath('items.0.login')
      this.items[1].login=true;
      this.notifyPath('items.1.login')
      this.items[2].login=true;
      this.notifyPath('items.2.login')
      this.items[3].login=false;
      this.notifyPath('items.3.login')
      this.items[4].login=false;
      this.notifyPath('items.4.login')
      this.login=true;
    })
    this.addEventListener('Refresh-Home',()=>
    {
      import('./matrimony-home.js');
      console.log("success")
      this.$.home.getData();
    })
  }
  static get properties() {
    return {
      page: {
        type: String,
        observer:'_pageChanged'
      },
      wideLayout: {
        type: Boolean,
        value: false,
        observer: 'onLayoutChange',
      },
      items: {
        type: Array,
        value: function () {
          return [{label:'Home',route:'home',login:true},{ label:'Login',route:'login',login:false},
          {label:'Register',route:'register',login:false},{label:'My shortlisted',route:'shortlisted',login:true},
          {label:'Requests',route:'requests',login:true}];
        }
      },
      login:{
        type:Boolean,
        value:false
        }
    };
    
  }
  /**
  *_pageChanged is a simple observer which is triggered when page property is changed
  *@param {String} newPage value of changed page 
  **/
  _pageChanged(newPage) {
    console.log(newPage)
    //Depending upon the changed page it lazy-imports the url
    switch (newPage) {
      case 'home': import('./matrimony-home.js')
      break;
    case 'login': import('./matrimony-login.js')
    break;
    case 'shortlisted': import('./matrimony-shortlisted.js')
    break;
    case 'register': import('./matrimony-register.js')
    break;
    case 'requests':import('./matrimony-requests.js')
    break;
    default:  import('./error-view.js')
      break;
    }
  }
  /**A simple observer triggers only any changes happens to the properties defined. 
  * Hence a complex observer is required to trigger any changes happens to app (including page load).
  * Hence complex triggers is required to define to observe changes on first time page load.
  **/
  static get observers() {
    return ['_routerChanged(routeData.page)']
  }
  /**
   *@param {String} page Value of new page
  **/
  _routerChanged(page) {
    console.log(page)
    this.page = page || 'login';
  }
  /**
   *onLayoutChange() is a simple observer which is triggered when wideLayout Property is changed.
   It closes the drawer if the layout is wider than 600px
   *@param {Boolean} wide tells that layout is wide or not? it's a value in true or false
  **/
  onLayoutChange(wide) {
    var drawer = this.$.drawer;

    if (wide && drawer.opened) {
      drawer.opened = false;
    }
  }
}

window.customElements.define('matrimony-app', MatrimonyApp);
