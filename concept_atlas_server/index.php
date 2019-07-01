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

//get all mapworks in the atlas specified
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


    if(empty($child) && $node['published'] == true){
        return array("id"=>$node['id'], "name"=>$node['name'], "author" =>$node['author'], "published"=>$node['published'], "freezed"=>$node['freezed']);
    }

    foreach ($child as $c) {
        array_push($ch, getTree($f3, $c['child']));
    }
    $a = array("id" => $node['id'], "name" => $node['name'], "author" => $node['author'], "children" =>  $ch, "published"=>$node['published'], "freezed"=>$node['freezed']);
    return $a;
}

//haveAChild operation
$f3->route('POST /child',
    function($f3){
        $db = $f3->get('DB');
        $body = json_decode($f3->get('BODY'));
        $perspid = $body->idPersp;
        $userid = $body->user;
        $query = $db->prepare('SELECT * FROM perspective WHERE perspective.id = :id');
        $query->bindparam(':id', $perspid);
        $query->execute();
        $currentPersp = $query->fetch(PDO::FETCH_BOTH);
        $newidpersp=uniqid($userid, true);

        // create new perspective
        $db->exec('INSERT INTO perspective (id, name, author, mapwork, freezed, published)
                    VALUES ( ?,?,?,?,"false","false" )',[$newidpersp, $currentPersp['name'], $userid, $currentPersp['mapwork']]);
        // create new branch
        $db->exec('INSERT INTO tree (father, child)
                    VALUES ( ?,?,?)',[$currentPersp['id'], $newidpersp]);
        $concCurrentPersp  = $db->exec('SELECT * FROM concpersp WHERE concpersp.persp =?',[$perspid]);
        // copy of concepts in the mother
        foreach($concCurrentPersp as $c) {
            $newidconc=uniqid($userid, true);
            $db->exec('INSERT INTO concpersp (id, conc, persp, coord_x, coord_y)
                    VALUES ( ?,?,?,?,? )', [$newidconc, $c['conc'], $newidpersp, $c['coord_x'],$c['coord_y']]);
        }
        $relCurrentPersp = $db->exec('SELECT * FROM relationship WHERE relationship.persp =?',[$perspid]);
        // copy of relationshihps in the mother
        foreach ($relCurrentPersp as $r){
            $newidrel=uniqid($userid, true);
            $db->exec('INSERT INTO relationship (id, conc1, conc2, type, persp, side1, side2, pos1, pos2)
                    VALUES (?,?,?,?,?,?,?,?,?)', [$newidrel, $r['conc1'], $r['conc2'], $r['type'], $newidpersp,$r['side1'],$r['side2'],$r['side1'],$r['side2']]);
        }

    });


//freeze current perspective operation
$f3->route('PUT /freeze',
    function($f3){
        $db = $f3->get('DB');
        $body = json_decode($f3->get('BODY'));
        $perspid = $body->idPersp;
        $userid = $body->user;

        //set to freeze
        $db->exec('UPDATE perspective SET freezed = "true" WHERE perspective.id =?',[$perspid]);

        $query = $db->prepare('SELECT * FROM perspective WHERE perspective.id = :id');
        $query->bindparam(':id', $perspid);
        $query->execute();
        $currentPersp = $query->fetch(PDO::FETCH_BOTH);
        $newidpersp=uniqid($userid, true);

        // create new perspective
        $db->exec('INSERT INTO perspective (id, name, author, mapwork, freezed, published)
                    VALUES ( ?,?,?,?,"false","false" )',[$newidpersp, $currentPersp['name'], $userid, $currentPersp['mapwork']]);
        // create new branch
        $db->exec('INSERT INTO tree (father, child)
                    VALUES ( ?,?)',[$currentPersp['id'], $newidpersp]);
        $concCurrentPersp  = $db->exec('SELECT * FROM concpersp WHERE concpersp.persp =?',[$perspid]);
        // copy of concepts in the mother
        foreach($concCurrentPersp as $c) {
            $newidconc=uniqid($userid, true);
            $db->exec('INSERT INTO concpersp (id, conc, persp, coord_x, coord_y)
                    VALUES ( ?,?,?,?,? )', [$newidconc, $c['conc'], $newidpersp, $c['coord_x'],$c['coord_y']]);
        }
        $relCurrentPersp = $db->exec('SELECT * FROM relationship WHERE relationship.persp =?',[$perspid]);
        // copy of relationshihps in the mother
        foreach ($relCurrentPersp as $r){
            $newidrel=uniqid($userid, true);
            $db->exec('INSERT INTO relationship (id, conc1, conc2, type, persp, side1, side2, pos1, pos2)
                    VALUES (?,?,?,?,?,?,?,?,?)', [$newidrel, $r['conc1'], $r['conc2'], $r['type'], $newidpersp,$r['side1'],$r['side2'],$r['side1'],$r['side2']]);
        }

    });


//publish current perspective operation
$f3->route('PUT /publish',
    function($f3){
        $db = $f3->get('DB');
        $body = json_decode($f3->get('BODY'));
        $perspid = $body->idPersp;


        //if root or more than 1 child only set perspective to public
        $db->exec('UPDATE perspective SET published = "true" WHERE perspective.id=?',[$perspid]);

        // find the mother
        $query = $db->prepare('SELECT father FROM tree WHERE tree.child = :id');
        $query->bindparam(':id', $perspid);
        $query->execute();
        $mother = $query->fetch(PDO::FETCH_BOTH);

        $query = $db->prepare('SELECT * FROM perspective WHERE perspective.id = :id');
        $query->bindparam(':id', $mother['father']);
        $query->execute();
        $datamother = $query->fetch(PDO::FETCH_BOTH);

        //find the grandmother
        $query = $db->prepare('SELECT father FROM tree WHERE tree.child = :id');
        $query->bindparam(':id', $datamother['id']);
        $query->execute();
        $grandmother = $query->fetch(PDO::FETCH_BOTH);

        $child = $db->exec('SELECT * FROM tree WHERE tree.father =?',[$datamother['id']]);

        // if 0 or 1 child, rewrite mother perspective
        if((empty($child) || count($child) == 1) && $datamother['freezed'] == 'false'  ){
            $db->exec('DELETE FROM perspective WHERE perspective.id=?',[$datamother['id']]);
            $db->exec('INSERT INTO tree (father, child) VALUES (?,?) ',[$grandmother['father'],$perspid]);
            }
 });


//create a new mapwork with the current perspective as root
$f3->route('POST /createMapwork',
    function($f3){
        $db = $f3->get('DB');
        $body = json_decode($f3->get('BODY'));
        $perspid = $body->idPersp;
        $userid = $body->user;

    });

$f3->run();
?>
