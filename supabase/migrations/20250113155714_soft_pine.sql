-- Create function to create ratings table if it doesn't exist
CREATE OR REPLACE FUNCTION create_ratings_table()
RETURNS void AS $$
BEGIN
  -- Create ratings table if it doesn't exist
  CREATE TABLE IF NOT EXISTS ratings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    blog_id uuid NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    rating numeric NOT NULL CHECK (rating >= 1 AND rating <= 5),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );

  -- Enable RLS
  ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

  -- Create policies
  DO $$ 
  BEGIN
    CREATE POLICY "Allow public read access for ratings"
      ON ratings FOR SELECT
      TO public
      USING (true);

    CREATE POLICY "Allow authenticated users to create ratings"
      ON ratings FOR INSERT
      TO authenticated
      WITH CHECK (true);
  EXCEPTION 
    WHEN duplicate_object THEN NULL;
  END $$;

  -- Create index
  CREATE INDEX IF NOT EXISTS idx_ratings_blog_id ON ratings(blog_id);
END;
$$ LANGUAGE plpgsql;