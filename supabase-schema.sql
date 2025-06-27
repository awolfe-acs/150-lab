-- Create the pins table
CREATE TABLE IF NOT EXISTS public.pins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_fingerprint TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Add constraints
  CONSTRAINT unique_user_pin UNIQUE (user_fingerprint),
  CONSTRAINT valid_latitude CHECK (lat >= -90 AND lat <= 90),
  CONSTRAINT valid_longitude CHECK (lng >= -180 AND lng <= 180)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.pins ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Allow anyone to read pins (for displaying on globe)
CREATE POLICY "Anyone can view pins" ON public.pins
  FOR SELECT USING (true);

-- Allow anyone to insert pins (for placing new pins)
CREATE POLICY "Anyone can insert pins" ON public.pins
  FOR INSERT WITH CHECK (true);

-- Prevent updates and deletes (pins should be permanent)
CREATE POLICY "No updates allowed" ON public.pins
  FOR UPDATE USING (false);

CREATE POLICY "No deletes allowed" ON public.pins
  FOR DELETE USING (false);

-- Create an index on user_fingerprint for faster lookups
CREATE INDEX IF NOT EXISTS idx_pins_user_fingerprint ON public.pins (user_fingerprint);

-- Create an index on created_at for potential future queries
CREATE INDEX IF NOT EXISTS idx_pins_created_at ON public.pins (created_at);

-- Enable real-time subscriptions for the pins table
ALTER PUBLICATION supabase_realtime ADD TABLE public.pins; 