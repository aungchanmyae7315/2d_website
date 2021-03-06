// Configuration for your app

module.exports = function (ctx) {
  return {
    // app boot (/src/boot)
    boot: [
      'i18n',
      'axios',
      //'apollo'
    ],
    css: [
      'app.style.css'
    ],
    extras: [
      //ctx.theme.mat ? 'roboto-font' : null,
      'material-icons', // optional, you are not bound to it
      'ionicons-v4',
      'mdi-v3',
      'fontawesome-v5'
    ],
    supportIE: true,
    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically
      proxy: {
        '/dev': {
          //target: 'http://localhost:8080/',
          //target: 'http://local.goingout.com/api/v1/',
          //target: 'http://eslite.sites.com.mm/api/v1/',
          //target: 'http://goingout.sites.com.mm/api/v1/',
          secure: false,
          changeOrigin: true,
        },
      },
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QStepper',
        'QStep',
        'QStepperNavigation',
        'QOptionGroup',
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItemLabel',
        'QItem',
        'QItemSection',
        'QResizeObserver',
        'QSelect',
        'QFab',
        'QFabAction',
        'QTooltip',
        'QField',
        'QInput',
        'QCard',
        'QSeparator',
        'QCardActions',
        'QDialog',
        'QTabs',
        'QTab',
        'QTabPanels',
        'QRouteTab',
        'QFooter',
        'QCarousel',
        'QCarouselSlide',
        'QCarouselControl',
        'QDate',
        'QTime',
        'QItemSection',
        'QItemLabel',
        'QPopupProxy',
        'QScrollArea',
        'QBadge',
        'QPullToRefresh',
        'QImg',
        'QFab',
        'QFabAction',
        'QPageSticky',
        'QForm',
        'QUploader',
        'QInfiniteScroll',
        'QSpinnerDots',
        'QCheckbox',
        'QAvatar',
        'QCardSection'
      ],
      directives: [
        //'Ripple',
        'GoBack',
        'ClosePopup',
        'Scroll'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Loading'
      ],
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      lang: 'en-us' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        skipWaiting: true
      },
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        "gcm_sender_id": "482941778795",
        "gcm_sender_id_comment": "Do not change the GCM Sender ID",
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
