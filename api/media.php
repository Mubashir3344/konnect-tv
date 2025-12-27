<?php
require_once __DIR__ . '/config.php';

$pdo = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];

// Get ID from query string if present
$id = isset($_GET['id']) ? intval($_GET['id']) : null;
$category = isset($_GET['category']) ? $_GET['category'] : null;

switch ($method) {
    case 'GET':
        if ($id) {
            // Get single media item
            $stmt = $pdo->prepare("SELECT * FROM media_items WHERE id = ?");
            $stmt->execute([$id]);
            $item = $stmt->fetch();
            
            if ($item) {
                sendResponse($item);
            } else {
                sendError('Media item not found', 404);
            }
        } else {
            // Get all media items (optionally filtered by category)
            if ($category && in_array($category, ['movies', 'series', 'football', 'sports'])) {
                $stmt = $pdo->prepare("SELECT * FROM media_items WHERE category = ? ORDER BY created_at DESC");
                $stmt->execute([$category]);
            } else {
                $stmt = $pdo->query("SELECT * FROM media_items ORDER BY created_at DESC");
            }
            $items = $stmt->fetchAll();
            sendResponse($items);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!$data || !isset($data['title']) || !isset($data['category'])) {
            sendError('Title and category are required');
        }
        
        $stmt = $pdo->prepare("
            INSERT INTO media_items (
                title, thumbnail, category, description, year, rating, duration,
                season, episode, league, match_date, team1, team2, channel_name, is_live
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $data['title'],
            $data['thumbnail'] ?? null,
            $data['category'],
            $data['description'] ?? null,
            $data['year'] ?? null,
            $data['rating'] ?? null,
            $data['duration'] ?? null,
            $data['season'] ?? null,
            $data['episode'] ?? null,
            $data['league'] ?? null,
            $data['match_date'] ?? null,
            $data['team1'] ?? null,
            $data['team2'] ?? null,
            $data['channel_name'] ?? null,
            $data['is_live'] ?? false
        ]);
        
        $newId = $pdo->lastInsertId();
        $stmt = $pdo->prepare("SELECT * FROM media_items WHERE id = ?");
        $stmt->execute([$newId]);
        $newItem = $stmt->fetch();
        
        sendResponse($newItem, 201);
        break;

    case 'PUT':
        if (!$id) {
            sendError('Media ID is required');
        }
        
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!$data) {
            sendError('No data provided');
        }
        
        // Build dynamic update query
        $fields = [];
        $values = [];
        
        $allowedFields = [
            'title', 'thumbnail', 'category', 'description', 'year', 'rating',
            'duration', 'season', 'episode', 'league', 'match_date', 'team1',
            'team2', 'channel_name', 'is_live'
        ];
        
        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $fields[] = "$field = ?";
                $values[] = $data[$field];
            }
        }
        
        if (empty($fields)) {
            sendError('No valid fields to update');
        }
        
        $values[] = $id;
        $sql = "UPDATE media_items SET " . implode(', ', $fields) . " WHERE id = ?";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);
        
        // Return updated item
        $stmt = $pdo->prepare("SELECT * FROM media_items WHERE id = ?");
        $stmt->execute([$id]);
        $updatedItem = $stmt->fetch();
        
        if ($updatedItem) {
            sendResponse($updatedItem);
        } else {
            sendError('Media item not found', 404);
        }
        break;

    case 'DELETE':
        if (!$id) {
            sendError('Media ID is required');
        }
        
        // First check if item exists and get thumbnail path
        $stmt = $pdo->prepare("SELECT thumbnail FROM media_items WHERE id = ?");
        $stmt->execute([$id]);
        $item = $stmt->fetch();
        
        if (!$item) {
            sendError('Media item not found', 404);
        }
        
        // Delete the item
        $stmt = $pdo->prepare("DELETE FROM media_items WHERE id = ?");
        $stmt->execute([$id]);
        
        // If thumbnail is a local file, delete it
        if ($item['thumbnail'] && strpos($item['thumbnail'], 'uploads/') !== false) {
            $filePath = __DIR__ . '/' . $item['thumbnail'];
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        }
        
        sendResponse(['success' => true, 'message' => 'Media item deleted']);
        break;

    default:
        sendError('Method not allowed', 405);
}
?>
