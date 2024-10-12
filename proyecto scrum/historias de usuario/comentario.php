<?php
// Mostrar errores (solo para desarrollo)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Destinatario
    $destinatario = "foxicosas626@gmail.com"; 
    $asunto = "Nuevo comentario en tu página web";
    
    // Recogemos el comentario enviado desde el formulario
    $comentario = trim($_POST['comentario']);

    // Validamos que el comentario no esté vacío
    if (!empty($comentario)) {
        // Construimos el mensaje
        $mensaje = "Has recibido un nuevo comentario en tu página web:\n\n" . $comentario;
        
        // Cabeceras del correo (opcionalmente puedes personalizar el 'From')
        $headers = "From: no-reply@tupagina.com" . "\r\n" .
                   "Reply-To: no-reply@tupagina.com" . "\r\n" .
                   "X-Mailer: PHP/" . phpversion();

        // Intentamos enviar el correo
        if (mail($destinatario, $asunto, $mensaje, $headers)) {
            echo "Comentario enviado correctamente. ¡Gracias por tu aporte!";
        } else {
            echo "Hubo un error al enviar el comentario. Inténtalo más tarde.";
        }
    } else {
        echo "El comentario no puede estar vacío.";
    }
} else {
    echo "Método de solicitud no válido.";
}
?>
