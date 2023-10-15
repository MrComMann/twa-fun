<?php
require_once("./db.php");
$method = $_SERVER['REQUEST_METHOD'];
header("Content-Type: application/json");

$dsn = "mysql:host=" . $host . ";dbname=" . $dbname . ";port=3306";
$options = array(
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
);
try {
    $conn = new PDO($dsn, $username, $password, $options);

    if ($method === "POST") {
        $data;

        if (isset($_POST['task']) && isset($_POST['date'])) {
            $text = $_POST['task'];
            $date = $_POST['date'];
            try {
                $stmt = $conn->prepare("INSERT INTO `d323285_twa`.`TD_tasks` (`ID`, `Task`, `Time`, `Status`) VALUES (NULL, :task, :datet, '1');");
                $stmt->bindParam(':task', $text);
                $stmt->bindParam(':datet', $date);
                $stmt->execute();
                $data = $stmt->fetchAll(PDO::FETCH_OBJ);
                $stmt = null;
                $conn = null;
                echo json_encode(array("status" => "success"));
            } catch (PDOException $e) {
                echo json_encode(array("status" => "error"));
            }
        } else {
            $data = array("method" => "POST", "status" => "error");
        }

        echo json_encode($data);
    } else if ($method === "PUT") {
        echo json_encode(array("method" => "PUT"));
    } else if ($method === "DELETE") {
        echo json_encode(array("method" => "DELETE"));
    } else if ($method === "GET") {
        try {
            $stmt = $conn->prepare("SELECT * FROM `TD_tasks`");
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_OBJ);
            $stmt = null;
            $conn = null;
            echo json_encode($data);
        } catch (PDOException $e) {
            echo json_encode(array("status" => "error"));
        }
    }

} catch (PDOException $e) {
    echo "Nelze se připojit k MySQL: ";
    echo $e->getMessage(); //smazat
}
exit();
?>