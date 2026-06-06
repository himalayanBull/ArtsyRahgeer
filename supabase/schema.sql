-- Supabase Database Schema for Artist Portfolio
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Artists table
CREATE TABLE artists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio TEXT,
  profile_image TEXT,
  email TEXT,
  instagram TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Collections table
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cover_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Artworks table
CREATE TABLE artworks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  story TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  medium TEXT,
  height DECIMAL(6,1),
  width DECIMAL(6,1),
  depth DECIMAL(6,1),
  year_created INTEGER,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'sold', 'reserved')),
  featured BOOLEAN DEFAULT FALSE,
  collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Artwork images table
CREATE TABLE artwork_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artwork_id UUID NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0
);

-- Tags table
CREATE TABLE artwork_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL
);

-- Artwork-Tag mapping table
CREATE TABLE artwork_tag_mapping (
  artwork_id UUID NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES artwork_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (artwork_id, tag_id)
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  stripe_session_id TEXT,
  artwork_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Commission requests table
CREATE TABLE commission_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  budget TEXT,
  artwork_size TEXT,
  preferred_style TEXT,
  description TEXT,
  reference_image TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'accepted', 'declined', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_artworks_collection ON artworks(collection_id);
CREATE INDEX idx_artworks_status ON artworks(status);
CREATE INDEX idx_artworks_featured ON artworks(featured);
CREATE INDEX idx_artworks_slug ON artworks(slug);
CREATE INDEX idx_collections_slug ON collections(slug);
CREATE INDEX idx_artwork_images_artwork ON artwork_images(artwork_id);
CREATE INDEX idx_orders_status ON orders(payment_status);
CREATE INDEX idx_commission_status ON commission_requests(status);

-- Row Level Security Policies

-- Enable RLS on all tables
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE artwork_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE artwork_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE artwork_tag_mapping ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE commission_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read access for gallery content
CREATE POLICY "Public read artists" ON artists FOR SELECT USING (true);
CREATE POLICY "Public read collections" ON collections FOR SELECT USING (true);
CREATE POLICY "Public read artworks" ON artworks FOR SELECT USING (true);
CREATE POLICY "Public read artwork_images" ON artwork_images FOR SELECT USING (true);
CREATE POLICY "Public read artwork_tags" ON artwork_tags FOR SELECT USING (true);
CREATE POLICY "Public read artwork_tag_mapping" ON artwork_tag_mapping FOR SELECT USING (true);

-- Public insert for contact and commission forms
CREATE POLICY "Public insert contact" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert commission" ON commission_requests FOR INSERT WITH CHECK (true);

-- Authenticated (admin) full access
CREATE POLICY "Admin all artists" ON artists FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all collections" ON collections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all artworks" ON artworks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all artwork_images" ON artwork_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all artwork_tags" ON artwork_tags FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all artwork_tag_mapping" ON artwork_tag_mapping FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all orders" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all commissions" ON commission_requests FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all contacts" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');

-- Storage bucket for artwork images (create in Supabase Dashboard)
-- Bucket name: artwork-images
-- Public access: enabled
