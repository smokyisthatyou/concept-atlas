<?php

/*
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
*/
require_once('./vendor/autoload.php');

$f3 = \Base::instance();

$f3->set('CLIENT_ID', '815639073197-4nm8nn59b9amkgtlsd3eanf65gue20ll.apps.googleusercontent.com');

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
        echo json_encode(['mail' => $email]);

    });

?>
