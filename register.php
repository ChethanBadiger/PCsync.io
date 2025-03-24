<?php

require 'connect.php';

    $insert_query = $con->prepare("INSERT INTO register (u_name, email, password) VALUES (?,?,?)");
    $insert_query->bindParam(1, $_POST['name']);
    $insert_query->bindParam(2, $_POST['email']);
    $insert_query->bindParam(3, $_POST['pass']);
    $insert_query->execute();
$data = [$_POST['name'], $_POST['email'], $_POST['pass']];

echo json_encode($data);
