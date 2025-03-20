<?php

require 'connect.php';

// $check_email = "SELECT * FROM register WHERE email = '" . $_POST['email'] . "'";
// $result = $con->query($check_email);
// if($result->num_rows>0){
//     echo "email exists";
// }
// else{
    $insert_query = $con->prepare("INSERT INTO register (u_name, email, password) VALUES (?,?,?)");
    $insert_query->bindParam(1, $_POST['name']);
    $insert_query->bindParam(2, $_POST['email']);
    $insert_query->bindParam(3, $_POST['pass']);
// }

if($insert_query->execute()){
    echo "User registered successfully";
}