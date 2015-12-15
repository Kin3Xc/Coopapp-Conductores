<?php 

//Conductor
$app->get('/cConductor',function(){

global $db;

$q = <<<OE
        SELECT c.con_id, c.con_nombre, c.con_direccion, c.con_telfijo,
            c.con_telcelular, e.eps_nombre, c.con_nlicencia, c.con_catlicencia,
        a.arp_nombre
                FROM Conductor as c
        INNER JOIN Eps as e on e.eps_id = c.eps_id
        INNER JOIN Arp as a on a.arp_id = c.arp_id
        
OE;

$datos = $db->get_results($q);

echo json_encode($datos);

});



 $app->get('/cConductor/:id',function ($con_id) {
        
        global $db;
        $q     = "SELECT * FROM Conductor WHERE con_id = '$con_id'";
        $datos = $db->get_results($q);
        echo json_encode($datos);
       
    });

//Insert Conductor

//Conductor
$app->post('/iConductor',function (){

        global $db;
    
        $con_id         =$_REQUEST['con_id'];
        $con_nombre     =$_REQUEST['con_nombre'];
        $con_direccion  =$_REQUEST['con_direccion'];
        $con_telfijo    =$_REQUEST['con_telfijo'];
        $con_telcelular =$_REQUEST['con_telcelular'];
        $eps_id         =$_REQUEST['eps_id'];
        $con_nlicencia  =$_REQUEST['con_nlicencia'];
        $con_catlicencia=$_REQUEST['con_catlicencia'];
        $arp_id         =$_REQUEST['arp_id'];
                  
        //insertar Conductor
        $q      =   "INSERT INTO `Conductor` (
            `con_id`,
            `con_nombre`,
            `con_direccion`,
            `con_telfijo`,
            `con_telcelular`,
            `eps_id`,
            `con_nlicencia`,
            `con_catlicencia`,
            `arp_id`
            ) 
            VALUES ('$con_id',
             '$con_nombre',
             '$con_direccion',
             '$con_telfijo',
             '$con_telcelular',
             '$eps_id',
             '$con_nlicencia',
             '$con_catlicencia',
             '$arp_id'
             );";
        
        echo $q;
        $datos   =   $db->query($q);

        //$db->debug();
 
        $mensaje = array('mensaje'=>'Inserto ok');

         echo json_encode($mensaje);

        });


//Eliminar

// DELETE route
$app->delete('/eConductor',function () {
        

        global $db;

        $q =    "DELETE FROM `Conductor`
                 WHERE con_id='$con_id'";


        $Mensaje = array('mensaje' => 'Insert ok' );
        echo json_encode($mensaje);

});


//  login conductor 
$app->post('/loginConductor',function (){
    $user  =$_REQUEST['usuario'];
    $pass  =$_REQUEST['password'];

    // echo $user . $pass;

    global $db;
        $q     = "SELECT * FROM Conductor WHERE con_id = '$user' AND con_nlicencia = '$pass'";
        $datos = $db->get_results($q);
        // if ($datos < 1) {
        //     $datos = array('mensaje' =>  'Login incorrecto');
        // }
        echo json_encode($datos);
});

//Consultas los chat
$app->get('/chat/:idConductor/:idAcudiente',function ($idConductor , $idAcudiente) {
    global $db;        
        $q  = "SELECT * FROM `chat_app` AS chat WHERE chat.id_padre = $idAcudiente AND chat.id_conductor = $idConductor";
        $datos = $db->get_results($q);
        echo json_encode($datos); 
});

//Insertar chat

$app->post('/chat',function (){

        global $db;
 //Chat Campos

        $id               =       $_REQUEST['id'];        
        $id_conductor     =       $_REQUEST['id_conductor'];
        $id_padre         =       $_REQUEST['id_padre'];
        $id_estudiante    =       $_REQUEST['id_estudiante'];
        $is_creator       =       $_REQUEST['is_creator'];
        $texto_chat       =       $_REQUEST['texto_chat'];
        
        //insertar chat
        $q      =   "INSERT INTO `chat_app`(
            `id`, 
            `id_conductor`, 
            `id_padre`, 
            `id_estudiante`, 
            `is_creator`, 
            `texto_chat`)
            VALUES (
             '$id',
             '$id_conductor',
             '$id_padre',
             '$id_estudiante',
             '$is_creator',
             '$texto_chat',
             );";

        $datos   =   $db->query($q);
        //$db->debug();
        $mensaje = array('mensaje'=>'ok');

         echo json_encode($mensaje);
        });

 ?>