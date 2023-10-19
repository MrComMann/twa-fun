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
        $_PUT = file_get_contents("php://input");
        $_PUT = json_decode($_PUT);
        $_PUT = (array) $_PUT;
        if (isset($_PUT['type'])) {
            $type = $_PUT['type'];
            if ($type = 'status') {
                $id = $_PUT['id'];
                $status = $_PUT['status'];
                try {
                    $stmt = $conn->prepare("UPDATE `d323285_twa`.`TD_tasks` SET `Status` = :statuss WHERE `TD_tasks`.`ID` = :id;");
                    $stmt->bindParam(':id', $id);
                    $stmt->bindParam(':statuss', $status);
                    $stmt->execute();
                    $data = $stmt->fetchAll(PDO::FETCH_OBJ);
                    $stmt = null;
                    $conn = null;
                    echo json_encode(array("status" => "success"));
                } catch (PDOException $e) {
                    echo json_encode(array("status" => "error2"));
                }
            } else if ($type = 'edit') {
                $id = $_PUT['id'];
                $task = $_PUT['task'];
                try {
                    $stmt = $conn->prepare("UPDATE `d323285_twa`.`TD_tasks` SET `Task` = :edit WHERE `TD_tasks`.`ID` = :id;");
                    $stmt->bindParam(':id', $id);
                    $stmt->bindParam(':edit', $task);
                    $stmt->execute();
                    $data = $stmt->fetchAll(PDO::FETCH_OBJ);
                    $stmt = null;
                    $conn = null;
                    echo json_encode(array("status" => "success"));
                } catch (PDOException $e) {
                    echo json_encode(array("status" => "error2"));
                }
            } else {
                echo json_encode(array("status" => "error1"));
            }
        } else {
            echo json_encode(array("status" => "error0"));
        }
    } else if ($method === "DELETE") {
        $_DELETE = "";
        $_DELETE = file_get_contents("php://input");
        $_DELETE = json_decode($_DELETE);
        $_DELETE = (array) $_DELETE;
        if (isset($_DELETE['id'])) {
            $id = $_DELETE['id'];
            try {
                $stmt = $conn->prepare("DELETE FROM `d323285_twa`.`TD_tasks` WHERE `id` = :id;");
                $stmt->bindParam(':id', $id);
                $stmt->execute();
                $data = $stmt->fetchAll(PDO::FETCH_OBJ);
                $stmt = null;
                $conn = null;
                echo json_encode(array("status" => "success"));
            } catch (PDOException $e) {
                echo json_encode(array("status" => "error2"));
            }
        } else {
            echo json_encode(array("status" => "error1", "request" => $_DELETE));
        }
    } else if ($method === "GET") {
        try {
            $stmt = $conn->prepare("SELECT * FROM `TD_tasks` ORDER BY `TD_tasks`.`Time` ASC");
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_OBJ);
            $stmt = null;
            $conn = null;
            echo json_encode($data);
            exit();
        } catch (PDOException $e) {
            echo json_encode(array("status" => "error"));
        }
    }
} catch (PDOException $e) {
    echo "Nelze se připojit k MySQL: ";
    echo $e->getMessage(); //smazat
}
//exit();
?>