CREATE TABLE IF NOT EXISTS t_p84078119_moonlight_symphony_3.news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    excerpt VARCHAR(1000),
    created_at TIMESTAMP DEFAULT NOW(),
    published_at TIMESTAMP DEFAULT NOW(),
    is_published BOOLEAN DEFAULT TRUE
);