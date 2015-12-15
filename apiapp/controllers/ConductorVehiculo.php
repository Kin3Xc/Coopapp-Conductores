<?php  
//Conductor Vehiculo
$app->get('/cConductorVehiculo',function () {

    global $db;

    //SELECCIONAR Conductor Vehiculo
    $q = <<<OE
            
   SELECT v.veh_placa , c.con_nombre 
            FROM ConductorVehiculo as cv
            INNER JOIN Vehiculo as v on v.veh_id = cv.veh_id
            INNER JOIN Conductor as c on c.con_id = cv.con_id
OE;
    $datos = $db->get_results($q);

    echo json_encode($datos);
       
});
//Consultar Por Id
$app->get('/cConductorVehiculo/:id',function ($cve_id) {

    global $db;

    //SELECCIONAR Conductor Vehiculo
    $q = "SELECT * FROM ConductorVehiculo WHERE cve_id='$cve_id'";

    $datos = $db->get_results($q);

    echo json_encode($datos);
       
});

// NUEVO
//Consultar Por id de conductor
$app->get('/cConductorRuta/:id',function ($con_id) {

    global $db;

    $q = "SELECT * FROM ConductorVehiculo WHERE con_id='$con_id'";

    $datos = $db->get_results($q);

    echo json_encode($datos);  
});

// NUEVO
//Consultar el ID de la ruta del conductor por id de vehiculo
$app->get('/cIdRutaConductor/:id',function ($veh_id) {

    global $db;

    $q = "SELECT * FROM vehiculosRuta WHERE idVehiculo='$veh_id'";

    $datos = $db->get_results($q);

    echo json_encode($datos);  
});

// NUEVO
//Consultar la ruta del conductor por id de vehiculo
$app->get('/cRutaConductor/:id',function ($rut_id) {

    global $db;

    $q = "SELECT * FROM Ruta WHERE rut_id='$rut_id'";

    $datos = $db->get_results($q);

    echo json_encode($datos);  
});

// NUEVO
//Consultar los estudiantes de una ruta
$app->get('/cRutaConductorAlumnos/:id',function ($rut_id) {

    global $db;

    $q = "SELECT * FROM Ruta WHERE rut_id='$rut_id'";

    $datos = $db->get_results($q);

    echo json_encode($datos);  
});


//NUEVO
//Consultar los mensajes del chat
$app->get('/cRutaConductorChat/:con_id/:id_padre/:id_ruta',function ($con_id, $id_padre, $id_ruta) {

    global $db;

    $q = "SELECT * FROM chat_app WHERE id_conductor='$con_id' AND id_padre='$id_padre' AND id_ruta='$id_ruta' ORDER BY id ASC";

    $datos = $db->get_results($q);

    echo json_encode($datos);  
});



// NUEVO
// permite guardar un mensaje de chat en la db
$app->post('/iRutaConductorChat',function () {

    global $db;

    $con_id  = $_REQUEST['con_id'];
    $id_padre = $_REQUEST['id_padre'];
    $id_estudiante = $_REQUEST['id_estudiante'];
    $is_creator = $_REQUEST['is_creator'];
    $id_ruta = $_REQUEST['id_ruta'];
    $msj     = $_REQUEST['msj'];

    $q = "INSERT INTO chat_app (
            id_conductor, 
            id_padre, 
            id_estudiante, 
            is_creator, 
            id_ruta,
            texto_chat
        ) VALUES (
            '$con_id',
            '$id_padre',
            '$id_estudiante',
            '$is_creator',
            '$id_ruta',
            '$msj'
        );";

    $datos   =   $db->query($q);

        //$db->debug();
 
    $mensaje = array('mensaje'=> 'Mensaje guardado');

    echo json_encode($mensaje);
});




//Insert Conductor Vehiculo

//Conductor Vehiculo
$app->post('/iConductorVehiculo',function (){

        global $db;
    
        $veh_id         =$_REQUEST['veh_id'];
        $con_id         =$_REQUEST['con_id'];          
        //insertar ConductorVehiculo
        $q      =   "INSERT INTO `ConductorVehiculo` (
            `veh_id`,
            `con_id`
            ) 
            VALUES (                
                '$veh_id',
                '$con_id'
             );";
        
        $datos   =   $db->query($q);

        //$db->debug();
 
        $mensaje = array('mensaje'=>'Inserto ok');

         echo json_encode($mensaje);

        });
//Eliminar

// DELETE route
$app->delete('/eConductorVehiculo',function () {
        

        global $db;

        $q =    "DELETE FROM `ConductorVehiculo`
                 WHERE cve_id='$cve_id'";


        $Mensaje = array('mensaje' => 'Insert ok' );
        echo json_encode($mensaje);

});
?>