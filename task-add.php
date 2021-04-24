<?php
include('database.php');

//if (!empty($_POST)) {
//    $name = $_POST['name'];
//    $description = $_POST['description'];
//    echo $name . " " . $description;
//} else {
//    echo "No existe esa mamada de name";
//}

if(isset($_POST['name'])){
    $name = $_POST['name'];
    $description = $_POST['description'];
    $query = "INSERT into task(name, description) VALUES ('$name', '$description')";
    $result = mysqli_query($conection, $query);
    if(!$result){
        die('Query failed');
    }
    echo 'Task Addes Succesfully';
}