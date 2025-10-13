-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'property-images',
  'property-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- Storage policies for property images
CREATE POLICY "Anyone can view property images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can upload property images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'property-images' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Users can update their own property images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'property-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own property images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'property-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create messages table for direct messaging
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Policies for messages
CREATE POLICY "Users can view their own messages"
ON public.messages
FOR SELECT
USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages"
ON public.messages
FOR INSERT
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their received messages"
ON public.messages
FOR UPDATE
USING (auth.uid() = receiver_id);

-- Add trigger for messages updated_at
CREATE TRIGGER update_messages_updated_at
BEFORE UPDATE ON public.messages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();