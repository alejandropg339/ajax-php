<?php
include('database.php');

//if (!empty($_POST)) {
//    $name = $_POST['name'];
//    $description = $_POST['description'];
//    echo $name . " " . $description;
//} else {
//    echo "No existe esa mamada de name";
//}

if(empty($_POST['id'])){
    if(isset($_POST['name'])){
        $name = $_POST['name'];
        $description = $_POST['description'];
        $id = $_POST['id'];
        $query = "INSERT into task(name, description) VALUES ('$name', '$description')";
        $result = mysqli_query($conection, $query);
        if(!$result){
            die('Query failed');
        }
        echo 'Task Addes Succesfully'."Este es el id: ".$id;
    }
}else{
    if(isset($_POST['name']) && isset($_POST['description'])){
        $name = $_POST['name'];
        $description = $_POST['description'];
        $id = $_POST['id'];

        $query = "UPDATE task SET name='$name', description='$description' where id='$id'";
        $result = mysqli_query($conection, $query);
        if(!$result){
            die('Query failed');
        }
        echo 'Task Updated Succesfully'."Este es el id: ".$id;
    }
}

