<?php

require_once('./vendor/autoload.php');


header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$f3 = Base::instance();

//google auth
$f3->set('CLIENT_ID', '815639073197-4nm8nn59b9amkgtlsd3eanf65gue20ll.apps.googleusercontent.com');


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
            echo json_encode(['msg' => "wtf"]);
            $f3->error(500, "Invalid user token");
            return;
        }
        $email = $payload['email'];
        echo json_encode(["email" => $email]);

/*
        $db = $f3->get('DB');
        $users = $db->exec('SELECT user_id AS id, name AS name FROM users '
            . 'WHERE email=?', $email);
        if (count($users) != 1) {
            // User is not registered on server
            // Refuse
            echo json_encode(['error' => "User $email not found on server"]);
        } else
            echo json_encode($users[0]);
*/
    });

$f3->run();
?>
