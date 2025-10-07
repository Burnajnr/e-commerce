<?php
header('Content-Type: application/json');

// Make uploads directory if not exists
$uploadDir = 'uploads/';
if(!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

if(isset($_FILES['receipt'])){
    $file = $_FILES['receipt'];
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid('receipt_') . '.' . $ext;
    $filepath = $uploadDir . $filename;

    if(move_uploaded_file($file['tmp_name'], $filepath)){
        // Build public URL (adjust your domain)
        $protocol = (!empty($_SERVER['HTTPS'])) ? "https" : "http";
        $host = $_SERVER['HTTP_HOST'];
        $url = $protocol . "://$host/$uploadDir$filename";

        echo json_encode(['success'=>true, 'url'=>$url]);
    } else {
        echo json_encode(['success'=>false, 'message'=>'Failed to save file.']);
    }
} else {
    echo json_encode(['success'=>false, 'message'=>'No file uploaded.']);
}
?>
