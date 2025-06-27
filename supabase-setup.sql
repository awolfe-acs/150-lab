-- Create the pins table
CREATE TABLE IF NOT EXISTS public.pins (
    id BIGSERIAL PRIMARY KEY,
    user_fingerprint TEXT NOT NULL,
    lat DECIMAL(10, 6) NOT NULL,
    lng DECIMAL(10, 6) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_fingerprint)
);

-- Enable Row Level Security
ALTER TABLE public.pins ENABLE ROW LEVEL SECURITY;

-- Create policies for the pins table
-- Allow anyone to read all pins
CREATE POLICY "Anyone can view pins" ON public.pins
    FOR SELECT USING (true);

-- Allow anyone to insert pins (but only one per user_fingerprint due to unique constraint)
CREATE POLICY "Anyone can insert pins" ON public.pins
    FOR INSERT WITH CHECK (true);

-- Allow users to delete their own pins
CREATE POLICY "Users can delete their own pins" ON public.pins
    FOR DELETE USING (true);

-- Grant permissions to anon and authenticated users
GRANT ALL ON public.pins TO anon;
GRANT ALL ON public.pins TO authenticated;
GRANT USAGE ON SEQUENCE public.pins_id_seq TO anon;
GRANT USAGE ON SEQUENCE public.pins_id_seq TO authenticated;

-- Create an index for better performance on user_fingerprint lookups
CREATE INDEX IF NOT EXISTS idx_pins_user_fingerprint ON public.pins(user_fingerprint);
CREATE INDEX IF NOT EXISTS idx_pins_created_at ON public.pins(created_at); 