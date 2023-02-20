<?php
$_POST = json_decode(file_get_contents("php://input"), true);    // все что приходит от клиента декодируется из JSON
echo var_dump($_POST);
