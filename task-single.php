<?php
include('database.php');

$id = $_POST['id'];
$query = "SELECT * FROM task WHERE id = '$id'";
$result = mysqli_query($conection, $query);

if(!$result){
    die('Query filed');
}

while($row = mysqli_fetch_array($result)){
    $json[]=array(
        'name' => $row['name'],
        'description' => $row['description'],
        'id' => $row['id']
    );
}

$jsonString = json_encode($json[0]);

echo $jsonString;