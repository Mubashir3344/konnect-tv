-- StreamFlux Database Schema for MySQL
-- Database: u774404044_streamflux

-- Create media_items table
CREATE TABLE IF NOT EXISTS media_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    thumbnail VARCHAR(500),
    thumbnail_data LONGTEXT,
    category ENUM('movies', 'series', 'football', 'sports') NOT NULL,
    description TEXT,
    year INT,
    rating DECIMAL(3,1),
    duration VARCHAR(50),
    season INT,
    episode INT,
    league VARCHAR(100),
    match_date VARCHAR(50),
    team1 VARCHAR(100),
    team2 VARCHAR(100),
    channel_name VARCHAR(100),
    is_live BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO media_items (title, thumbnail, category, description, year, rating, duration) VALUES
('The Dark Knight', 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400', 'movies', 'When the menace known as the Joker wreaks havoc on Gotham', 2008, 9.0, '2h 32min'),
('Inception', 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400', 'movies', 'A thief who steals corporate secrets through dream-sharing technology', 2010, 8.8, '2h 28min'),
('Interstellar', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400', 'movies', 'A team of explorers travel through a wormhole in space', 2014, 8.6, '2h 49min');

INSERT INTO media_items (title, thumbnail, category, description, season, episode, year, rating) VALUES
('Breaking Bad', 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400', 'series', 'A high school chemistry teacher turned methamphetamine manufacturer', 5, 62, 2008, 9.5),
('Game of Thrones', 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400', 'series', 'Nine noble families fight for control of the lands of Westeros', 8, 73, 2011, 9.3),
('Stranger Things', 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400', 'series', 'When a young boy disappears, a small town uncovers a mystery', 4, 34, 2016, 8.7);

INSERT INTO media_items (title, thumbnail, category, league, match_date, team1, team2, is_live) VALUES
('Premier League Match', 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400', 'football', 'Premier League', '2024-01-15', 'Manchester United', 'Liverpool', TRUE),
('La Liga Match', 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400', 'football', 'La Liga', '2024-01-16', 'Real Madrid', 'Barcelona', FALSE),
('Champions League', 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400', 'football', 'Champions League', '2024-01-17', 'Bayern Munich', 'PSG', TRUE);

INSERT INTO media_items (title, thumbnail, category, channel_name, is_live) VALUES
('ESPN Live', 'https://images.unsplash.com/photo-1461896836934- voices?w=400', 'sports', 'ESPN', TRUE),
('Sky Sports', 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400', 'sports', 'Sky Sports', TRUE),
('beIN Sports', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400', 'sports', 'beIN Sports', FALSE);

-- Create index for faster queries
CREATE INDEX idx_category ON media_items(category);
CREATE INDEX idx_is_live ON media_items(is_live);
