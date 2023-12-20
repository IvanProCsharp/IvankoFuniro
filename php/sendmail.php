<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('en', 'phpmailer/language/');
    $mail->isHTML(true);

    $mail->isSMTP(); //Send using SMTP
    $mail->Host = 'smtp.gmail.com'; //Set the SMTP server to send through
    $mail->SMTPAuth = true; //Enable SMTP authentication
    $mail->Username = '00111100qwe@gmail.com'; //SMTP username (email)
    $mail->Password = 'uwif rihz buzj rbul'; //SMTP password (email password)
    $mail->Port = '587';
    $mail->SMTPSecure = 'TLS';

    //From SMTP username (email) 
    $mail->setFrom('00111100qwe@gmail.com', 'Formfrom1');
    //To
    $mail->addAddress('00111100qwe2@gmail.com');
    //Subject
    $mail->Subject = 'HELLO, IM IVAN';

    //Body
    $body = '<h1>HELLO, ITS ME</h1>';

    if(trim(!empty($_POST['email']))) {
        $body .= "<p>E-mail: <strong>".$_POST['email']."</strong></p>";
    }
    //Add File
    if(trim(!empty($_FILES['image']['tmp_name']))) {
        $fileTmpName = $_FILES['image']['tmp_name'];
        $fileName = $_FILES['image']['name'];
        $mail->addAttachment($fileTmpName, $fileName);
    }

    $mail->Body = $body;

    //Sending
    $mail->send();
    $mail->smtpClose();
?>

