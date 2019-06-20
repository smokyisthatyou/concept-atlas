<?php

use DB\SQL;

require_once('./vendor/autoload.php');


header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$f3 = Base::instance();

//google auth
$f3->set('CLIENT_ID', '815639073197-4nm8nn59b9amkgtlsd3eanf65gue20ll.apps.googleusercontent.com');

// db setup
$dbConn = 'mysql:host=127.0.0.1;port=3306;dbname=conceptatlas';
$dbUser = 'root';
$dbPassword = '';
$f3->set('DB', new \DB\SQL($GLOBALS['dbConn'], $GLOBALS['dbUser'], $GLOBALS['dbPassword']));


//login auth
$f3->route('POST /login',
    function ($f3) {
        $body = json_decode($f3->get('BODY'));
        $token = $body->token;
        $client = new Google_Client(['client_id' => $f3->get('CLIENT_ID')]);
        $payload = $client->verifyIdToken($token); //send the token id to the server for verification
        if (!$payload) {
            $f3->error(500, "Invalid user token");
            return;
        }

        $email = $payload['email'];

        $db = $f3->get('DB');


        $users = $db->exec('SELECT * FROM users '
            . 'WHERE email=?', $email);
        if (count($users) != 1) {
            // User is not registered on server
            // Refuse
            echo json_encode(['email' => ""]);
        } else
            echo json_encode($users[0]);
    });

//get all atlas from the db
$f3->route('GET /atlas',
    function ($f3) {
        $db = $f3->get('DB');

        $allAtlas = $db->exec('SELECT id, name, description, owner FROM atlas ');
        echo json_encode($allAtlas);
    });

$f3->route('GET /mapworks/@atlasid',
    function ($f3) {
        $db = $f3->get('DB');
        $atlasid = $f3->get('PARAMS.atlasid');
        $mapworks = $db->exec('SELECT * FROM mapwork WHERE mapwork.atlas = ?',[$atlasid]);
        echo json_encode($mapworks);
    });

//get a json with the tree structure. wrapper function
$f3->route('GET /perspectivetree/@mapworkid',
    function($f3) {
        $db = $f3->get('DB');
        $mapworkid = $f3->get('PARAMS.mapworkid');

        $root ='SELECT * FROM mapwork WHERE mapwork.id = :mapworkid';
        $query = $db->prepare($root);
        $query->bindparam(':mapworkid', $mapworkid);
        $query->execute();
        $row = $query->fetch(PDO::FETCH_BOTH);

        $result = getTree($f3, $row['root']);
        echo json_encode(array($result));
    });

function getTree($f3,$nodeid){
    $ch = array();
    $db = $f3->get('DB');
    $child ='SELECT * FROM perspective WHERE perspective.id = :id';
    $query = $db->prepare($child);
    $query->bindparam(':id', $nodeid);
    $query->execute();
    $node = $query->fetch(PDO::FETCH_BOTH);
    $child = $db->exec('SELECT * FROM tree WHERE tree.father =?',[$nodeid]);


    if(empty($child)){
        return array("id"=>$node['id'], "name"=>$node['name'], "author" =>$node['author']);
    }

    foreach ($child as $c) {
        array_push($ch, getTree($f3, $c['child']));
    }
    $a = array("id" => $node['id'], "name" => $node['name'], "author" => $node['author'], "children" =>  $ch);
    return $a;
}

$f3->run();
?>
