<?php
// Получаем данные из полей ввода
$email = $_POST['email'];
$to = 'vadimsemenovvs5@gmail.com';
$header = 'Productivity сайт'
// Собираем все данные в письмо
$message = "Имя пользователя: $name \nЭлектронная почта: $email \nОтзыв: $comment";
// Отправляем письмо
$send = mail($to, $header, $message, "Content-type:text/plain; charset = UTF-8\r\nFrom:$email");
?>