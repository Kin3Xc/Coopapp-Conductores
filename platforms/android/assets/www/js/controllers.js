angular.module('coopapp.controllers', ['ionic', 'ngCordova','LocalStorageModule','ngMap'])
.controller('LoginCtrl',function($scope, $location, $http, localStorageService){

	//Defino el modelo a utilizar, en este caso un sensillo login
	//con los datos de usuario y clave
	$scope.login = {
		usuario: '',
		password: ''
	};

	//Funcion para ingresar, se ejecuta al hacer clic sobre el boton Ingresar

	$scope.ingresar = function(){
		//Aquí validaria los datos que ingresa el usuario
		if ($scope.login.usuario != "" && $scope.login.password != "") {
			console.log($scope.login);

			$http({
				method: 'POST',
				url: "https://ikarotech.com/cooptranslibre2/api/loginConductor",
				params: $scope.login
			})
			.success(function(data){
				console.log(data[0].con_id);
				if (data != null) {
					localStorageService.set('con_id', data[0].con_id);
					$location.url("/home");
				}else{
					alert('Error en el inicio de sesión')
				}
			})
			.error(function(err){
				alert('Error: ' + err);
			});

		}
	};
})


.controller('HomeCtrl',function($scope,$location,$ionicHistory){

	$scope.verMapa = function(){
		$location.url("/mapa");
	};
	$scope.verlistAlumno = function(){
		$location.url("/listaalumnos");
	};
	$scope.verNotification = function(){
		$location.url('/notification');
	};
	$scope.verEstadoRuta = function(){
		$location.url('/estadoRuta');
	};
})



//Controlador para octener la pocision actual del usuario
.controller('MapaCtrl',[ '$scope', '$cordovaGeolocation', function($scope, $ionicLoading, $cordovaGeolocation){
	$scope.positions = [{
		lat: 43.07493,
		lng: -89.381388
	}];

	$scope.$on('mapInitialized', function(event, map) {
		$scope.map = map;
	});

	$scope.centerOnMe= function(){
		$scope.positions = [];


		$ionicLoading.show({
			template: 'Loading...'
		});


		navigator.geolocation.watchPosition(function(position) {
			console.log('getCurrentPosition');
			var lat  = position.coords.latitude
			var long = position.coords.longitude

			var pos = new google.maps.LatLng(lat, long);
			$scope.positions.push({lat: lat: long});
			console.log(pos);
			$scope.map.setCenter(pos);
			$ionicLoading.hide();
		});

	};

}])


//Controlador para octener la pocision actual del usuario
.controller('listAlumCtrl',  function($scope, $http, $ionicHistory, $timeout, $ionicLoading, localStorageService){
	$scope.alumnos=[];

	// Setup the loader
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	});

	var con_id = localStorageService.get('con_id');
	console.log(con_id);
	// $http.get('https://ikarotech.com/cooptranslibre2/api/cConductorVehiculo/'+ con_id)
	$http({
		method: 'GET',
		url: 'https://ikarotech.com/cooptranslibre2/api/cConductorRuta/'+ con_id
	})
	.success(function(data){
		console.log(data);
		localStorageService.set('veh_id', data[0].veh_id);

		$http({
			method: 'GET',
			url: 'https://ikarotech.com/cooptranslibre2/api/cIdRutaConductor/'+ data[0].veh_id
		})
		.success(function(data1){
			console.log(data1);
			localStorageService.set('idRuta', data1[0].idRuta);

			$http({
				method: 'GET',
				url: 'https://ikarotech.com/cooptranslibre2/api/cRutaConductor/'+ data1[0].idRuta
			})
			.success(function(data2){
				console.log(data2);
				localStorageService.set('idColegio', data2[0].idColegio);

				$http({
					method: 'GET',
					url: 'https://ikarotech.com/cooptranslibre2/api/cAlumnosRuta/'+ data2[0].idColegio+'/'+data1[0].idRuta
				})
				.success(function(data3){
					console.log(data3);
					$scope.alumnos = data3;
					if (data3 == null) {
						alert('No hay datos asociados');
						$ionicLoading.hide();
					}
					$ionicLoading.hide();
				})
				.error(function(err3){
					alertalert('Error al consultar los datos ' + err3);
					$ionicLoading.hide();
				})

			})
			.error(function(err2){
				alertalert('Error al consultar los datos ' + err2);
				$ionicLoading.hide();
			})

		})
		.error(function(err1){
			alert('Error al consultar los datos ' + err1);
			$ionicLoading.hide();
		})

		// $ionicLoading.hide();
	})
	.error(function(err){
		alert('Error al consultar los datos ' + err);
		$ionicLoading.hide();
	})

})

.controller('notificationCtrl', function($scope,  $ionicPopup){

	// Triggered on a button click, or some other target
	$scope.send_notify = function() {
		$scope.data = {}

		// An elaborate, custom popup
		var myPopup = $ionicPopup.show({
			template: '<input type="text" ng-model="data.msg">',
			title: 'Envío de notificación',
			subTitle: 'Puede ingresar un mensaje opcional',
			scope: $scope,
			buttons: [
				{ text: 'Cancelar' },
				{
					text: '<b>Envíar</b>',
					type: 'button-positive',
					onTap: function(e) {
						if (!$scope.data.msg) {
							e.preventDefault();
						} else {
							return $scope.data.msg;
						}
					}
				}
			]
		});
		myPopup.then(function(res) {
			console.log('Mensaje', res);
			myPopup.close();
		});
	};

})


.controller('estadoRutaCtrl', function($scope, $ionicPopup , $location){
	$scope.verResumenRuta = function(){
		$location.url('/resumenRuta');
	};

	// A confirm dialog
	$scope.showConfirm = function() {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Envíar estado',
			template: 'Realmente desea envíar este estado?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				console.log('Dijo si');
			} else {
				console.log('Dijo no');
			}
		});
	};

	// Triggered on a button click, or some other target
	$scope.estado_adicional = function() {
		$scope.data = {}

		// An elaborate, custom popup
		var myPopup = $ionicPopup.show({
			template: '<input type="password" ng-model="data.estado">',
			title: 'Nuevo estado',
			subTitle: 'Por favor ingrese la desripción de su estado',
			scope: $scope,
			buttons: [
				{ text: 'Cancelar' },
				{
					text: '<b>Envíar</b>',
					type: 'button-positive',
					onTap: function(e) {
						if (!$scope.data.estado) {
							//don't allow the user to close unless he enters wifi password
							e.preventDefault();
						} else {
							return $scope.data.estado;
						}
					}
				}
			]
		});

		myPopup.then(function(res) {
			console.log('Mensaje', res);
			myPopup.close();
		});
	};
})


.controller('perfilAlumnoCtrl', function($scope, $stateParams, $http){

	var id = $stateParams.id;
	$scope.alu_id = id;
	$http({
		method: 'GET',
		url: 'https://ikarotech.com/cooptranslibre2/apiapp/cAlumno/'+ id
	})
	.success(function(data){
		console.log(data);
		$scope.perfil = data;
		if (data == null) {
			alert('No hay datos asociados');
			$ionicLoading.hide();
		}
		$ionicLoading.hide();
	})
	.error(function(err3){
		alertalert('Error al consultar los datos ' + err3);
		$ionicLoading.hide();
	})

});
