<?php

include('database.php');

$query = "SELECT * FROM task";

$result = mysqli_query($conection, $query);

if(!$result){
    die('Failed to execute this query');
}

/*else{
    json_encode($fila = mysqli_fetch_assoc($result));
}*/
$json  = array();

while($row = mysqli_fetch_array($result)){
    $json[] = array(
        'name' => $row['name'],
        'desription' => $row['description'],
        'id' => $row['id']
    );
}

$josnstring = json_encode($json);
echo json_encode($josnstring);
