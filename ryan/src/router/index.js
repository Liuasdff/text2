import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import opalstack from '@/components/opalstack'
import notices from '@/components/notices'
import users from '@/components/users'
import New from '@/components/users-new'
import changePassword from '@/components/users-changePassword'
import applications from '@/components/applications'
import appnew from '@/components/app-new'
import appupdate from '@/components/app-update.vue'
import domains from '@/components/domains'
import domnew from '@/components/domnew'
import rounew from '@/components/rounew'
import rouupdate from '@/components/rouupdate.vue'
import routes from '@/components/routes'
import certificates from '@/components/certificates'
import certifnew from '@/components/certif-new'
import dns from '@/components/dns'
import dnsnew from '@/components/dns-new'
import dnsupdate from '@/components/dns-update.vue'
import mariadbs from '@/components/mariadbs'
import marinew from '@/components/mari-new'
import mariadm from '@/components/mari-adm'
import mariupdate from '@/components/mari-update'
import mariausers from '@/components/mariausers'
import mariausersnew from '@/components/mariauser-new'
import mariausersupdate from '@/components/mariauser-update'
import psqldbs from '@/components/psqldbs'
import psqldbsnew from '@/components/psqldbs-new'
import psqldbsupdate from '@/components/psqldbs-update'
import psqlusers from '@/components/psqlusers'
import psqlusersnew from '@/components/psqlusers-new'
import psqlusersupdate from '@/components/psqlusers-update'
import mailusers from '@/components/mailusers'
import maiupdate from '@/components/mailusers-update'
import mainew from '@/components/mailusers-new'
import mail from '@/components/mail'
import mailupdate from '@/components/mail-update'
import mailnew from '@/components/mail-new'
import tokens from '@/components/tokens'
import tokensnew from '@/components/tokens-new'
import usage from '@/components/usage'
import contacts from '@/components/contacts'
import cards from '@/components/cards'
import subscriptions from '@/components/subscriptions'
import upgrade from '@/components/upgrade'
import invoices from '@/components/invoices'

import enlogin from '@/components/en-login'
import enhome from '@/components/en-home'
import enopalstack from '@/components/en-opalstack'
import ennotices from '@/components/en-notices'
import enusers from '@/components/en-users'
import enNew from '@/components/en-users-new'
import enchangePassword from '@/components/en-users-changePassword'
import enapplications from '@/components/en-applications'
import enappnew from '@/components/en-app-new'
import enappupdate from '@/components/en-app-update.vue'
import endomains from '@/components/en-domains'
import endomnew from '@/components/en-domnew'
import enrounew from '@/components/en-rounew'
import enrouupdate from '@/components/en-rouupdate.vue'
import enroutes from '@/components/en-routes'
import encertificates from '@/components/en-certificates'
import encertifnew from '@/components/en-certif-new'
import endns from '@/components/en-dns'
import endnsnew from '@/components/en-dns-new'
import endnsupdate from '@/components/en-dns-update.vue'
import enmariadbs from '@/components/en-mariadbs'
import enmarinew from '@/components/en-mari-new'
import enmariadm from '@/components/en-mari-adm'
import enmariupdate from '@/components/en-mari-update'
import enmariausers from '@/components/en-mariausers'
import enmariausersnew from '@/components/en-mariauser-new'
import enmariausersupdate from '@/components/en-mariauser-update'
import enpsqldbs from '@/components/en-psqldbs'
import enpsqldbsnew from '@/components/en-psqldbs-new'
import enpsqldbsupdate from '@/components/en-psqldbs-update'
import enpsqlusers from '@/components/en-psqlusers'
import enpsqlusersnew from '@/components/en-psqlusers-new'
import enpsqlusersupdate from '@/components/en-psqlusers-update'
import enmailusers from '@/components/en-mailusers'
import enmaiupdate from '@/components/en-mailusers-update'
import enmainew from '@/components/en-mailusers-new'
import enmail from '@/components/en-mail'
import enmailupdate from '@/components/en-mail-update'
import enmailnew from '@/components/en-mail-new'
import entokens from '@/components/en-tokens'
import entokensnew from '@/components/en-tokens-new'
import enusage from '@/components/en-usage'
import encontacts from '@/components/en-contacts'
import encards from '@/components/en-cards'
import ensubscriptions from '@/components/en-subscriptions'
import enupgrade from '@/components/en-upgrade'
import eninvoices from '@/components/en-invoices'



Vue.use(Router)
var BASE_URL = "http://www.dananxi.cn:8888/"
var lanjie = {
  lanjie: true,
}
var router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [{
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'home',
      component: home,
      redirect: "/", // 默认显示的子路由
      meta: lanjie,
      children: [{
          path: '/',
          name: 'opalstack',
          component: opalstack,
          meta: lanjie,
        },
        {
          path: 'notices',
          name: 'notices',
          component: notices,
          meta: lanjie,
        },
        {
          path: 'users',
          name: 'users',
          component: users,
          meta: lanjie,
        },
        {
          path: 'users-new',
          name: 'New',
          component: New,
          meta: lanjie,
        },
        {
          path: 'applications',
          name: 'applications',
          component: applications,
          meta: lanjie,
        },
        {
          path: 'applications-new',
          name: 'appnew',
          component: appnew,
          meta: lanjie,
        },
        {
          path: 'applications-update',
          name: 'appupdate',
          component: appupdate,
          meta: lanjie,
        },
        {
          path: 'domains',
          name: 'domains',
          component: domains,
          meta: lanjie,
        },
        {
          path: 'domains-new',
          name: 'domnew',
          component: domnew,
          meta: lanjie,
        },
        {
          path: 'routes',
          name: 'routes',
          component: routes,
          meta: lanjie,
        },
        {
          path: 'routes-new',
          name: 'rounew',
          component: rounew,
          meta: lanjie,
        },
        {
          path: 'routes-update',
          name: 'rouupdate',
          component: rouupdate,
          meta: lanjie,
        },
        {
          path: 'certificates',
          name: 'certificates',
          component: certificates,
          meta: lanjie,
        },
        {
          path: 'certificates-new',
          name: 'certifnew',
          component: certifnew,
          meta: lanjie,
        },
        {
          path: 'dns',
          name: 'dns',
          component: dns,
          meta: lanjie,
        },
        {
          path: 'dns-new',
          name: 'dnsnew',
          component: dnsnew,
          meta: lanjie,
        },
        {
          path: 'dns-update',
          name: 'dnsupdate',
          component: dnsupdate,
          meta: lanjie,
        },
        {
          path: 'mariadbs',
          name: 'mariadbs',
          component: mariadbs,
          meta: lanjie,
        },
        {
          path: 'mariadbs-new',
          name: 'marinew',
          component: marinew,
          meta: lanjie,
        },
        {
          path: 'mariadbs-update',
          name: 'mariupdate',
          component: mariupdate,
          meta: lanjie,
        },
        {
          path: 'mariadbs-adm',
          name: 'mariadm',
          component: mariadm,
          meta: lanjie,
        },
        {
          path: 'mariausers',
          name: 'mariausers',
          component: mariausers,
          meta: lanjie,
        },
        {
          path: 'mariauser-new',
          name: 'mariausersnew',
          component: mariausersnew,
          meta: lanjie,
        },
        {
          path: 'mariauser-update',
          name: 'mariausersupdate',
          component: mariausersupdate,
          meta: lanjie,
        },
        {
          path: 'psqldbs',
          name: 'psqldbs',
          component: psqldbs,
          meta: lanjie,
        },
        {
          path: 'psqldbs-new',
          name: 'psqldbsnew',
          component: psqldbsnew,
          meta: lanjie,
        },
        {
          path: 'psqldbs-update',
          name: 'psqldbsupdate',
          component: psqldbsupdate,
          meta: lanjie,
        },
        {
          path: 'psqlusers',
          name: 'psqlusers',
          component: psqlusers,
          meta: lanjie,
        },
        {
          path: 'psqlusers-new',
          name: 'psqlusersnew',
          component: psqlusersnew,
          meta: lanjie,
        },
        {
          path: 'psqlusers-update',
          name: 'psqlusersupdate',
          component: psqlusersupdate,
          meta: lanjie,
        },
        {
          path: 'mailusers',
          name: 'mailusers',
          component: mailusers,
          meta: lanjie,
        },
        {
          path: 'mailusers-update',
          name: 'maiupdate',
          component: maiupdate,
          meta: lanjie,
        },
        {
          path: 'mailusers-new',
          name: 'mainew',
          component: mainew,
          meta: lanjie,
        },
        {
          path: 'mail',
          name: 'mail',
          component: mail,
          meta: lanjie,
        },
        {
          path: 'mail-new',
          name: 'mailnew',
          component: mailnew,
          meta: lanjie,
        },
        {
          path: 'mail-update',
          name: 'mailudate',
          component: mailupdate,
          meta: lanjie,
        },
        {
          path: 'tokens',
          name: 'tokens',
          component: tokens,
          meta: lanjie,
        },
        {
          path: 'tokens-new',
          name: 'tokensnew',
          component: tokensnew,
          meta: lanjie,
        },
        {
          path: 'usage',
          name: 'usage',
          component: usage,
          meta: lanjie,
        },
        {
          path: 'contacts',
          name: 'contacts',
          component: contacts,
          meta: lanjie,
        },
        {
          path: 'cards',
          name: 'cards',
          component: cards,
          meta: lanjie,
        },
        {
          path: 'subscriptions',
          name: 'subscriptions',
          component: subscriptions,
          meta: lanjie,
        },
        {
          path: 'upgrade',
          name: 'upgrade',
          component: upgrade,
          meta: lanjie,
        },
        {
          path: 'invoices',
          name: 'invoices',
          component: invoices,
          meta: lanjie,
        },

      ],
    },


    {
      path: '/en/login',
      name: 'login-en',
      component: enlogin
    },
    {
      path: '/en',
      name: 'home-en',
      component: enhome,
      redirect: "/en", // 默认显示的子路由
      meta: lanjie,
      children: [{
          path: '/en',
          name: 'opalstack-en',
          component: enopalstack,
          meta: lanjie,
        },
        {
          path: 'notices',
          name: 'notices-en',
          component: ennotices,
          meta: lanjie,
        },
        {
          path: 'users',
          name: 'users-en',
          component: enusers,
          meta: lanjie,
        },
        {
          path: 'users-new',
          name: 'New-en',
          component: enNew,
          meta: lanjie,
        },
        {
          path: 'applications',
          name: 'applications-en',
          component: enapplications,
          meta: lanjie,
        },
        {
          path: 'applications-new',
          name: 'appnew-en',
          component: enappnew,
          meta: lanjie,
        },
        {
          path: 'applications-update',
          name: 'appupdate-en',
          component: enappupdate,
          meta: lanjie,
        },
        {
          path: 'domains',
          name: 'domains-en',
          component: endomains,
          meta: lanjie,
        },
        {
          path: 'domains-new',
          name: 'domnew-en',
          component: endomnew,
          meta: lanjie,
        },
        {
          path: 'routes',
          name: 'routes-en',
          component: enroutes,
          meta: lanjie,
        },
        {
          path: 'routes-new',
          name: 'rounew-en',
          component: enrounew,
          meta: lanjie,
        },
        {
          path: 'routes-update',
          name: 'rouupdate-en',
          component: enrouupdate,
          meta: lanjie,
        },
        {
          path: 'certificates',
          name: 'certificates-en',
          component: encertificates,
          meta: lanjie,
        },
        {
          path: 'certificates-new',
          name: 'certifnew-en',
          component: encertifnew,
          meta: lanjie,
        },
        {
          path: 'dns',
          name: 'dns-en',
          component: endns,
          meta: lanjie,
        },
        {
          path: 'dns-new',
          name: 'dnsnew-en',
          component: endnsnew,
          meta: lanjie,
        },
        {
          path: 'dns-update',
          name: 'dnsupdate-en',
          component: endnsupdate,
          meta: lanjie,
        },
        {
          path: 'mariadbs',
          name: 'mariadbs-en',
          component: enmariadbs,
          meta: lanjie,
        },
        {
          path: 'mariadbs-new',
          name: 'marinew-en',
          component: enmarinew,
          meta: lanjie,
        },
        {
          path: 'mariadbs-update',
          name: 'mariupdate-en',
          component: enmariupdate,
          meta: lanjie,
        },
        {
          path: 'mariadbs-adm',
          name: 'mariadm-en',
          component: enmariadm,
          meta: lanjie,
        },
        {
          path: 'mariausers',
          name: 'mariausers-en',
          component: enmariausers,
          meta: lanjie,
        },
        {
          path: 'mariauser-new',
          name: 'mariausersnew-en',
          component: enmariausersnew,
          meta: lanjie,
        },
        {
          path: 'mariauser-update',
          name: 'mariausersupdate-en',
          component: enmariausersupdate,
          meta: lanjie,
        },
        {
          path: 'psqldbs',
          name: 'psqldbs-en',
          component: enpsqldbs,
          meta: lanjie,
        },
        {
          path: 'psqldbs-new',
          name: 'psqldbsnew-en',
          component: enpsqldbsnew,
          meta: lanjie,
        },
        {
          path: 'psqldbs-update',
          name: 'psqldbsupdate-en',
          component: enpsqldbsupdate,
          meta: lanjie,
        },
        {
          path: 'psqlusers',
          name: 'psqlusers-en',
          component: enpsqlusers,
          meta: lanjie,
        },
        {
          path: 'psqlusers-new',
          name: 'psqlusersnew-en',
          component: enpsqlusersnew,
          meta: lanjie,
        },
        {
          path: 'psqlusers-update',
          name: 'psqlusersupdate-en',
          component: enpsqlusersupdate,
          meta: lanjie,
        },
        {
          path: 'mailusers',
          name: 'mailusers-en',
          component: enmailusers,
          meta: lanjie,
        },
        {
          path: 'mailusers-update',
          name: 'maiupdate-en',
          component: enmaiupdate,
          meta: lanjie,
        },
        {
          path: 'mailusers-new',
          name: 'mainew-en',
          component: enmainew,
          meta: lanjie,
        },
        {
          path: 'mail',
          name: 'mail-en',
          component: enmail,
          meta: lanjie,
        },
        {
          path: 'mail-new',
          name: 'mailnew-en',
          component: enmailnew,
          meta: lanjie,
        },
        {
          path: 'mail-update',
          name: 'mailudate-en',
          component: enmailupdate,
          meta: lanjie,
        },
        {
          path: 'tokens',
          name: 'tokens-en',
          component: entokens,
          meta: lanjie,
        },
        {
          path: 'tokens-new',
          name: 'tokensnew-en',
          component: entokensnew,
          meta: lanjie,
        },
        {
          path: 'usage',
          name: 'usage-en',
          component: enusage,
          meta: lanjie,
        },
        {
          path: 'contacts',
          name: 'contacts-en',
          component: encontacts,
          meta: lanjie,
        },
        {
          path: 'cards',
          name: 'cards-en',
          component: encards,
          meta: lanjie,
        },
        {
          path: 'subscriptions',
          name: 'subscriptions-en',
          component: ensubscriptions,
          meta: lanjie,
        },
        {
          path: 'upgrade',
          name: 'upgrade-en',
          component: enupgrade,
          meta: lanjie,
        },
        {
          path: 'invoices',
          name: 'invoices-en',
          component: eninvoices,
          meta: lanjie,
        },

      ],
    },



    // {
    // 	path: '/chart',
    // 	name: "chart",
    // 	component: Chart,
    // 	children: [{
    // 		path: 'line', //以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，
    // 		name: "line",
    // 		component: Chartline,
    // 	}, ],
    // },
  ]
})

function setinterval(fn){
    var data = {}
    data.username = localStorage.getItem('username')
    data.password = localStorage.getItem('password')
    $.ajax({
      url: URL + "/login/",
      type: "POST",
      data: JSON.stringify(data),
      processData: false,
      contentType: "application/json",
      success: function(data) {
        window.token = {"Authorization":"Token "+data.token}
        if(fn){
          fn()
        }
      }
    })
}

var interval = ''
router.beforeEach((to, from, next) => {
  if (to.meta.lanjie) {
    if (localStorage.getItem('token')) {
      setinterval(next)
      if(interval ==''){
        interval = setInterval(function(){
           setinterval()
        },600000)
      }
      // next()
      // localStorage.removeItem('token')
    } else {

      next({
        path: '/login',
        query: {
          redirect: to.fullpath
        },
      })
    }
  } else {
    next()
  }
})


export default router
