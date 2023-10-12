<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="index.js"></script>
</head>
<body>
    <h1>Úkolníček</h1>
    <table id="list"></table>
    <br>
    <form id="newTodo" style="border: 1px black solid;padding: 8px;">
        <h3>Nový úkol</h3>
        <p>Úkol: <input type="text" id="text"></p>
        <p>Do: <input type="date" id="date"></p>
        <button type="submit">Vytvořit</button>
    </form>
</body>
</html>