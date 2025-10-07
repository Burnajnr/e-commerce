<?php
// Replace with your business email
$to = "yourbusiness@gmail.com";

// Get and sanitize form inputs
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$message = htmlspecialchars($_POST['message']);

// Email subject and headers
$subject = "🛍️ New Message from $name via SA FashionStyle";
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Compose email body
$body = "You have received a new message from your website contact form:\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n\n";
$body .= "Message:\n$message\n";

// Send the email
if (mail($to, $subject, $body, $headers)) {
    echo "<h3 style='color:green;text-align:center;'>Message sent successfully!</h3>";
} else {
    echo "<h3 style='color:red;text-align:center;'>Failed to send message. Try again later.</h3>";
}
?>
