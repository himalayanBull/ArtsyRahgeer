-- Seed Data for Artist Portfolio
-- Run this after schema.sql

-- Insert Artist
INSERT INTO artists (name, bio, profile_image, email, instagram, website) VALUES (
  'Elena Vasquez',
  'A contemporary canvas painter exploring the intersection of nature, emotion, and human connection through oil and acrylic mediums.',
  '/images/artist-portrait.jpg',
  'hello@atelier-art.com',
  '@elenavasquezart',
  'https://atelier-art.com'
);

-- Insert Collections
INSERT INTO collections (name, slug, description, cover_image) VALUES
  ('Nature''s Symphony', 'natures-symphony', 'A celebration of the natural world — from sweeping landscapes to intimate botanical studies.', '/images/collections/nature.jpg'),
  ('Abstract Emotions', 'abstract-emotions', 'Pure feeling translated into color and form. These pieces speak the language of the subconscious.', '/images/collections/abstract.jpg'),
  ('Himalayan Light', 'himalayan-light', 'Inspired by a transformative journey through the Himalayas — capturing the sacred light of high altitude.', '/images/collections/himalayan.jpg'),
  ('Portraits of Silence', 'portraits-of-silence', 'Quiet moments captured in paint. Figures lost in thought, solitude as strength.', '/images/collections/portraits.jpg');

-- Insert Tags
INSERT INTO artwork_tags (name) VALUES
  ('landscape'),
  ('abstract'),
  ('nature'),
  ('mountain'),
  ('portrait'),
  ('floral'),
  ('water'),
  ('sky'),
  ('contemporary'),
  ('large-scale'),
  ('textured'),
  ('minimalist');

-- Insert Artworks
INSERT INTO artworks (title, slug, description, story, price, currency, medium, height, width, year_created, status, featured, collection_id) VALUES
  ('Golden Hour Meadow', 'golden-hour-meadow', 'A vast meadow bathed in the warm light of sunset, where wildflowers dance in an evening breeze.', 'I painted this on location over three evenings, racing against the fading light each day. The golden hour lasts only minutes, but its memory stays forever.', 4500, 'USD', 'Oil on Canvas', 90, 120, 2024, 'available', true, (SELECT id FROM collections WHERE slug = 'natures-symphony')),
  ('Depths Unseen', 'depths-unseen', 'An abstract exploration of what lies beneath the surface — layers of consciousness revealed through color.', 'This piece emerged during a period of deep introspection. Each layer represents a truth I was uncovering about myself.', 6200, 'USD', 'Acrylic on Canvas', 150, 120, 2024, 'available', true, (SELECT id FROM collections WHERE slug = 'abstract-emotions')),
  ('Summit Prayer', 'summit-prayer', 'The first light striking a Himalayan peak, sacred and untouched.', 'Standing at 4,000 meters, watching dawn break over the peaks, I understood why ancient peoples worshipped mountains.', 8500, 'USD', 'Oil on Canvas', 100, 150, 2023, 'sold', true, (SELECT id FROM collections WHERE slug = 'himalayan-light')),
  ('The Reader', 'the-reader', 'A woman absorbed in a book by a rain-streaked window, lost in another world.', 'My grandmother used to read every afternoon by the window. This is my tribute to those quiet, sacred hours.', 3800, 'USD', 'Oil on Canvas', 80, 60, 2024, 'available', true, (SELECT id FROM collections WHERE slug = 'portraits-of-silence')),
  ('Monsoon Rising', 'monsoon-rising', 'Dark clouds gathering over a valley, the tension before the first raindrop falls.', 'There is a moment of absolute stillness before a storm. Everything holds its breath. This is that moment.', 5200, 'USD', 'Oil on Canvas', 100, 130, 2023, 'available', true, (SELECT id FROM collections WHERE slug = 'natures-symphony')),
  ('Cerulean Dreams', 'cerulean-dreams', 'A meditation on blue — from the deepest ocean to the lightest sky.', 'Blue is the color of infinity. This piece is my attempt to capture what it feels like to stare into endless space.', 4800, 'USD', 'Mixed Media on Canvas', 120, 120, 2024, 'available', true, (SELECT id FROM collections WHERE slug = 'abstract-emotions')),
  ('Valley of Echoes', 'valley-of-echoes', 'A misty Himalayan valley where sound seems to linger and multiply.', 'In the valleys between peaks, even silence has a sound. I wanted to paint that acoustic quality of space.', 7200, 'USD', 'Oil on Canvas', 90, 140, 2023, 'reserved', false, (SELECT id FROM collections WHERE slug = 'himalayan-light')),
  ('Still Life with Time', 'still-life-with-time', 'A contemplative arrangement of objects that speak of passing moments.', 'Each object in this painting belonged to someone who taught me something important about life.', 3200, 'USD', 'Oil on Canvas', 60, 80, 2024, 'available', false, NULL),
  ('Autumn Requiem', 'autumn-requiem', 'The final blaze of color before winter, a forest saying goodbye.', 'Every autumn I visit the same forest. Each year the farewell feels more poignant, more beautiful.', 5800, 'USD', 'Oil on Canvas', 100, 140, 2022, 'sold', false, (SELECT id FROM collections WHERE slug = 'natures-symphony')),
  ('Inner Landscape', 'inner-landscape', 'Where the mind meets the horizon. An abstract landscape of thought.', 'What does thinking look like? If consciousness had a landscape, this is what I imagine it might be.', 4200, 'USD', 'Acrylic on Canvas', 100, 100, 2024, 'available', false, (SELECT id FROM collections WHERE slug = 'abstract-emotions'));

-- Insert artwork images (using placeholder paths — replace with actual Supabase Storage URLs)
INSERT INTO artwork_images (artwork_id, image_url, display_order)
SELECT id, '/images/artworks/' || slug || '.jpg', 0 FROM artworks;

-- Map tags to artworks
INSERT INTO artwork_tag_mapping (artwork_id, tag_id)
SELECT a.id, t.id FROM artworks a, artwork_tags t
WHERE a.slug = 'golden-hour-meadow' AND t.name IN ('landscape', 'nature', 'large-scale');

INSERT INTO artwork_tag_mapping (artwork_id, tag_id)
SELECT a.id, t.id FROM artworks a, artwork_tags t
WHERE a.slug = 'depths-unseen' AND t.name IN ('abstract', 'contemporary', 'textured');

INSERT INTO artwork_tag_mapping (artwork_id, tag_id)
SELECT a.id, t.id FROM artworks a, artwork_tags t
WHERE a.slug = 'summit-prayer' AND t.name IN ('mountain', 'landscape', 'large-scale');

INSERT INTO artwork_tag_mapping (artwork_id, tag_id)
SELECT a.id, t.id FROM artworks a, artwork_tags t
WHERE a.slug = 'the-reader' AND t.name IN ('portrait', 'contemporary', 'minimalist');

INSERT INTO artwork_tag_mapping (artwork_id, tag_id)
SELECT a.id, t.id FROM artworks a, artwork_tags t
WHERE a.slug = 'monsoon-rising' AND t.name IN ('landscape', 'nature', 'sky');

INSERT INTO artwork_tag_mapping (artwork_id, tag_id)
SELECT a.id, t.id FROM artworks a, artwork_tags t
WHERE a.slug = 'cerulean-dreams' AND t.name IN ('abstract', 'water', 'sky', 'large-scale');

INSERT INTO artwork_tag_mapping (artwork_id, tag_id)
SELECT a.id, t.id FROM artworks a, artwork_tags t
WHERE a.slug = 'valley-of-echoes' AND t.name IN ('mountain', 'landscape', 'nature');

INSERT INTO artwork_tag_mapping (artwork_id, tag_id)
SELECT a.id, t.id FROM artworks a, artwork_tags t
WHERE a.slug = 'autumn-requiem' AND t.name IN ('landscape', 'nature', 'large-scale');

INSERT INTO artwork_tag_mapping (artwork_id, tag_id)
SELECT a.id, t.id FROM artworks a, artwork_tags t
WHERE a.slug = 'inner-landscape' AND t.name IN ('abstract', 'contemporary', 'minimalist');
