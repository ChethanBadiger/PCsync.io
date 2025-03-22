<?php
require 'connect.php';

    // $stmt = $con->prepare("SELECT ? FROM register WHERE email = ?");
    // $stmt->bindParam(1, $_POST['pass']);
    // $stmt->bindParam(2, $_POST['email']);

    // if ($stmt->execute()) {
    //     echo "pass";
    // } else {
    //     echo "fail";
    // }
    
   
    $login_query = $con->prepare("SELECT password FROM register WHERE email = ?");
    $login_query->bindParam(1, $_POST['email']);
    $login_query->execute();

    // Fetch the result as an associative array
    $result = $login_query->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // Compare the provided password with the stored one
        // If you store plain text passwords (not recommended), use:
        if ($_POST['pass'] == $result['password']) {
            echo "true"; // Login successful
        } else {
            echo "false"; // Incorrect password
        }
    } else {
        echo "emailNotFound"; // Email not found
    }


?>