<?php

	if(!empty($_POST['top_bar_username'])) $name = $_POST['top_bar_username'];
    if(!empty($_POST['top_bar_phone'])) $phone = $_POST['top_bar_phone'];
    if(!empty($_POST['theme'])) $theme = $_POST['theme'];
    
    $data = array(
    	'name' => $name,
    	'phone' => $phone,
    	'theme' => $theme,
    );

    if($data['name'] != '' && $data['phone'] != '') {
    	// Формируем сообщение, отправляемое на почту
    	$message = "<div>";
    	$message .= "<p><strong>Имя:</strong> ".$data['name']."</p>";
    	$message .= "<p><strong>Телефон:</strong> <a href='tel:".$data['phone']."'>".$data['phone']."</a></p>";
    	$message .= "<p><strong>Тема:</strong> ".$data['theme']."</p>";
    	$message .= "</div>"; 

 		// Задаем получателя письма
		$to = 'ka-seo@ya.ru';
	    
	    // От кого пришло письмо
		$from = "noreply@kaseo.ru";
	    
	    // Задаем тему письма
		$subject = "Заявка на сайт для МКК"; 
	    
		// Формируем заголовок письма (при неправильном формировании может ломаться кодировка и т.д.)
		$headers = "From: $from\r\nReply-To: $to\r\nContent-type: text/html; charset=utf-8\r\n"; 
		
	    if (mail($to, $subject, $message, $headers)) { 
	    	// При помощи функции mail, отправляем сообщение, проверяя отправилось оно или нет
			echo 'success'; // Отправка успешна
		}
		else {
			echo 'error'; // Письмо не отправилось
		}
    }
    else {
    	echo 'Not sent';
    	//print_r($data);
    }
?>