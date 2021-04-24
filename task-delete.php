<?php

include('database.php');

if(isset($_POST['id'])){
    $id = $_POST['id'];
    $delete = "DELETE FROM task WHERE task.id = '$id'";
    $resultado =mysqli_query($conection,$delete);
    echo "funciono";
}
