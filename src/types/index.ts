export interface Artist {
  id: string;
  name: string;
  bio: string;
  profile_image: string;
  email: string;
  instagram: string;
  website: string;
  created_at: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  cover_image: string;
  created_at: string;
}

export interface Artwork {
  id: string;
  title: string;
  slug: string;
  description: string;
  story: string;
  price: number;
  currency: string;
  medium: string;
  height: number;
  width: number;
  depth: number | null;
  year_created: number;
  status: "available" | "sold" | "reserved";
  featured: boolean;
  collection_id: string | null;
  created_at: string;
  images: ArtworkImage[];
  tags: Tag[];
  collection?: Collection;
}

export interface ArtworkImage {
  id: string;
  artwork_id: string;
  image_url: string;
  display_order: number;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  amount: number;
  currency: string;
  payment_status: "pending" | "completed" | "failed" | "refunded";
  stripe_session_id: string | null;
  artwork_ids: string[];
  created_at: string;
}

export interface CommissionRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  budget: string;
  preferred_style: string;
  artwork_size: string;
  description: string;
  reference_image: string | null;
  status: "pending" | "reviewing" | "accepted" | "declined" | "completed";
  created_at: string;
}

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}
