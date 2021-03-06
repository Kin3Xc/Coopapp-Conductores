// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('coopapp', ['ionic', 'coopapp.controllers', 'ionic.service.core', 'ngCordova', 'ionic.service.push'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// .config([ '$ionicAppProvider', function($ionicAppProvider) {
//   $ionicAppProvider.identify({
//     app_id : 'XXXXXX',
//     api_key : 'XXXXXXXXXXXXXX'
//   });
// } ]);

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicAppProvider) {

    $ionicAppProvider.identify({
      app_id : '572f7af0',
      api_key : 'cb2853f6f87b0bbbf2840c6ecc76b879861e12ae4f8df203'
    });

  $stateProvider

  .state('login',{ //Nombre del estado
    url: '/login', //URL para navegar al estado
    templateUrl: 'templates/login.html', //vista HTML
    controller: 'LoginCtrl' //Controllador
  })
  .state('Home',{ //Nombre del estado
    url: '/home', //URL para navegar al estado
    templateUrl: 'templates/home.html', //vista HTML
    controller: 'HomeCtrl' //Controllador
  })

  .state('mapa', {
    url: '/mapa',
    templateUrl: 'templates/mapa.html',
    controller: 'MapaCtrl'
  })

  .state('notification', {
    url: '/notification',
    templateUrl: 'templates/notifications.html',
    controller: 'notificationCtrl'
  })

  .state('estadoRuta', {
    url: '/estadoRuta',
    templateUrl: 'templates/estadoRuta.html',
    controller: 'estadoRutaCtrl'
  })

  .state('resumenRuta', {
    url: '/resumenRuta',
    templateUrl: 'templates/resumenRuta.html'

  })

  .state('listaAlumnos', {
    url: '/listaalumnos',
    templateUrl: 'templates/listaAlumnos.html',
    controller: 'listAlumCtrl'
  })

   .state('perfilAlumno', {
    url: '/perfilAlumno/:id',
    templateUrl: 'templates/perfil.html',
    controller: 'perfilAlumnoCtrl'

  });

  // Mostrar la vista de login por default
  $ionicConfigProvider.navBar.alignTitle('center');
  $urlRouterProvider.otherwise('/login');
});
