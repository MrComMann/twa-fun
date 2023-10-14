<?php
$method = $_SERVER['REQUEST_METHOD'];
header("Content-Type: application/json");
//else if použito místo switche, protože je to rychlejší (údajně)
if ($method === "POST") {
    $data;
    if (isset($_POST['task']) && isset($_POST['date'])) {
        $text = $_POST['task'];
        $date = $_POST['date'];
        $data = array("method" => "POST", "text" => $text, "date" => $date);
    } else {
        $data = array("method" => "POST", "status" => "error");
    }

    echo json_encode($data);
} else if ($method === "PUT") {
    echo json_encode(array("method" => "PUT"));
} else if ($method === "DELETE") {
    echo json_encode(array("method" => "DELETE"));
} else if ($method === "GET") {
    echo json_encode(array("method" => "GET"));
}

exit();
?>