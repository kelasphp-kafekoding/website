<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$data_file = __DIR__ . '/showcase.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($data_file)) {
        $json = file_get_contents($data_file);
        $data = json_decode($json, true);
        echo json_encode($data['testimonials'] ?? []);
    } else {
        echo json_encode([]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }
    
    if (file_exists($data_file)) {
        $json = file_get_contents($data_file);
        $data = json_decode($json, true);
    } else {
        $data = ['testimonials' => []];
    }
    
    $new_testimonial = [
        'id' => $input['id'] ?? uniqid(),
        'name' => $input['name'] ?? '',
        'status' => $input['status'] ?? '',
        'message' => $input['message'] ?? '',
        'date' => $input['date'] ?? date('Y-m-d'),
        'color' => $input['color'] ?? '#3b82f6'
    ];
    
    if (!empty($new_testimonial['name']) && !empty($new_testimonial['message'])) {
        array_unshift($data['testimonials'], $new_testimonial);
        
        if (file_put_contents($data_file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
            http_response_code(200);
            echo json_encode(['success' => true, 'message' => 'Testimonial added']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to save']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Name and message required']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
