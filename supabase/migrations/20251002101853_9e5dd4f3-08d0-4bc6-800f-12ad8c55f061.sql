-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create master data table for dropdown options
CREATE TABLE public.master_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  value TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(category, value)
);

-- Enable RLS
ALTER TABLE public.master_data ENABLE ROW LEVEL SECURITY;

-- Master data policies - readable by all authenticated users
CREATE POLICY "Master data is viewable by authenticated users"
  ON public.master_data FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert master data"
  ON public.master_data FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update master data"
  ON public.master_data FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete master data"
  ON public.master_data FOR DELETE
  TO authenticated
  USING (true);

-- Insert initial master data
INSERT INTO public.master_data (category, value, display_order) VALUES
  -- Transaction Types
  ('transaction_type', 'For Lease', 1),
  ('transaction_type', 'For Sale', 2),
  -- Property Types
  ('property_type', 'Apartment', 1),
  ('property_type', 'Villa', 2),
  ('property_type', 'Penthouse', 3),
  ('property_type', 'Condo', 4),
  ('property_type', 'ShopHouse', 5),
  -- Availability Status
  ('availability_status', 'On Sale', 1),
  ('availability_status', 'Coming Soon', 2),
  ('availability_status', 'Sold', 3),
  -- Furnishing
  ('furnishing', 'Fully Furnished', 1),
  ('furnishing', 'Semi Furnished', 2),
  ('furnishing', 'None', 3),
  -- Orientation
  ('orientation', 'North', 1),
  ('orientation', 'South', 2),
  ('orientation', 'East', 3),
  ('orientation', 'West', 4),
  ('orientation', 'North-East', 5),
  ('orientation', 'North-West', 6),
  ('orientation', 'South-East', 7),
  ('orientation', 'South-West', 8),
  -- View
  ('view', 'River View', 1),
  ('view', 'City View', 2),
  ('view', 'Garden View', 3),
  ('view', 'Pool View', 4),
  -- Pet Policy
  ('pet_policy', 'Allowed', 1),
  ('pet_policy', 'Not Allowed', 2),
  ('pet_policy', 'With Restrictions', 3),
  -- Owner Type
  ('owner_type', 'Individual', 1),
  ('owner_type', 'Company', 2),
  ('owner_type', 'Developer', 3),
  -- Land Use Type
  ('land_use_type', 'Residential', 1),
  ('land_use_type', 'Commercial', 2),
  ('land_use_type', 'Mixed Use', 3),
  -- Projects
  ('project', 'Ecopark', 1),
  -- Zones
  ('zone', 'Aqua Bay', 1),
  -- Amenities
  ('amenity', 'Pool', 1),
  ('amenity', 'Gym', 2),
  ('amenity', 'Playground', 3),
  ('amenity', 'Security', 4),
  ('amenity', 'Parking', 5),
  -- Nearby Amenities
  ('nearby_amenity', 'School', 1),
  ('nearby_amenity', 'Hospital', 2),
  ('nearby_amenity', 'Shopping Mall', 3),
  ('nearby_amenity', 'Public Transport', 4),
  -- Utilities
  ('utility', 'Water', 1),
  ('utility', 'Internet', 2),
  ('utility', 'Electricity', 3),
  ('utility', 'Gas', 4),
  -- Project Facilities
  ('project_facility', 'Clubhouse', 1),
  ('project_facility', 'Park', 2),
  ('project_facility', 'Shuttle Bus', 3),
  -- Gallery Categories
  ('gallery_category', 'Interior', 1),
  ('gallery_category', 'Exterior', 2);

-- Create properties table
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id TEXT UNIQUE NOT NULL,
  old_ref_no TEXT,
  project TEXT,
  zone TEXT,
  property_title TEXT NOT NULL,
  transaction_type TEXT,
  property_type TEXT,
  address TEXT,
  date_listed DATE DEFAULT CURRENT_DATE,
  availability_status TEXT,
  size_sqm NUMERIC,
  bedrooms INTEGER,
  bathrooms INTEGER,
  floors INTEGER,
  floor_number INTEGER,
  furnishing TEXT,
  year_built INTEGER,
  orientation TEXT,
  view TEXT,
  parking_availability TEXT,
  pet_policy TEXT,
  amenities TEXT[],
  nearby_amenities TEXT[],
  price_vnd NUMERIC,
  price_per_sqm NUMERIC,
  contract_terms TEXT,
  deposit_terms TEXT,
  maintenance_fee NUMERIC,
  available_from DATE,
  description TEXT,
  is_featured BOOLEAN DEFAULT false,
  property_images TEXT[],
  floor_plan_url TEXT,
  property_video_url TEXT,
  landlord_name TEXT,
  landlord_phone TEXT,
  landlord_email TEXT,
  owner_type TEXT,
  landlord_notes TEXT,
  property_documents TEXT[],
  bank_info TEXT,
  consultant_name TEXT,
  consultant_phone TEXT,
  consultant_email TEXT,
  internal_notes TEXT,
  auto_expiry_date DATE,
  land_use_type TEXT,
  utilities_included TEXT[],
  incentives TEXT,
  multi_language_support TEXT,
  currency_toggle TEXT DEFAULT 'VND',
  developer_name TEXT,
  project_completion_year INTEGER,
  project_facilities TEXT[],
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Properties policies
CREATE POLICY "Properties are viewable by authenticated users"
  ON public.properties FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert properties"
  ON public.properties FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update their properties"
  ON public.properties FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

CREATE POLICY "Authenticated users can delete their properties"
  ON public.properties FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create function to generate property ID
CREATE OR REPLACE FUNCTION generate_property_id(p_type TEXT)
RETURNS TEXT AS $$
DECLARE
  prefix TEXT;
  next_num INTEGER;
  new_id TEXT;
BEGIN
  -- Determine prefix based on property type
  prefix := CASE 
    WHEN p_type = 'Villa' THEN 'EV'
    WHEN p_type = 'Apartment' THEN 'EA'
    WHEN p_type = 'Condo' THEN 'EC'
    WHEN p_type = 'ShopHouse' THEN 'ES'
    ELSE 'EP'
  END;
  
  -- Get next number for this property type
  SELECT COALESCE(MAX(CAST(SUBSTRING(property_id FROM '[0-9]+$') AS INTEGER)), 0) + 1
  INTO next_num
  FROM public.properties
  WHERE property_id LIKE prefix || '%';
  
  -- Format the ID with leading zeros
  new_id := prefix || LPAD(next_num::TEXT, 4, '0');
  
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to auto-calculate price per sqm
CREATE OR REPLACE FUNCTION calculate_price_per_sqm()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.price_vnd IS NOT NULL AND NEW.size_sqm IS NOT NULL AND NEW.size_sqm > 0 THEN
    NEW.price_per_sqm := NEW.price_vnd / NEW.size_sqm;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for price per sqm calculation
CREATE TRIGGER trg_calculate_price_per_sqm
  BEFORE INSERT OR UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION calculate_price_per_sqm();

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_update_master_data_updated_at
  BEFORE UPDATE ON public.master_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();