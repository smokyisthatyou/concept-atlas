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


//test route
$f3->route('GET /',
    function ($f3) {
        echo "hello";
    });

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

$f3->route('GET /atlas',
    function ($f3) {
        $db = $f3->get('DB');

        $allAtlas = $db->exec('SELECT name, description, owner FROM atlas ');
        echo json_encode($allAtlas);
    });

$f3->run();
?>
