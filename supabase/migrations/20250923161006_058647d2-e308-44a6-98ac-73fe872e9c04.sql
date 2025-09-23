-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  price_per_ml DECIMAL(10,2), -- For perfumes
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('regular', 'print', 'perfume')),
  badge TEXT,
  image_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Create policy for admin write access (we'll handle admin auth in frontend)
CREATE POLICY "Products can be managed by admin" 
ON public.products 
FOR ALL
USING (true)
WITH CHECK (true);

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true);

-- Create storage policies for product images
CREATE POLICY "Product images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Anyone can upload product images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Anyone can update product images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'product-images');

CREATE POLICY "Anyone can delete product images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'product-images');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial products data
INSERT INTO public.products (name, price, price_per_ml, description, category, badge, image_urls) VALUES
('Черное худи Premium', 3500.00, NULL, 'Стильное черное худи из премиального хлопка. Идеально для повседневной носки и создания модных образов.', 'regular', 'Хит продаж', ARRAY['/src/assets/hoodie-black.jpg']),
('Классические джинсы', 2800.00, NULL, 'Универсальные джинсы прямого кроя из качественного денима. Подходят для любого стиля.', 'regular', NULL, ARRAY['/src/assets/hoodie-black.jpg']),
('Бомбер куртка', 4200.00, NULL, 'Модная куртка-бомбер с контрастными вставками. Отличное дополнение к спортивному образу.', 'regular', 'Новинка', ARRAY['/src/assets/hoodie-black.jpg']),
('Футболка с геометрическим принтом', 2100.00, NULL, 'Яркая футболка с авторским геометрическим принтом. Высококачественная печать на премиальном материале.', 'print', 'Авторский дизайн', ARRAY['/src/assets/tshirt-print.jpg']),
('Худи с принтом граффити', 3800.00, NULL, 'Уникальное худи с ярким принтом в стиле граффити. Каждый принт наносится вручную.', 'print', 'Лимитированная серия', ARRAY['/src/assets/tshirt-print.jpg']),
('Свитшот абстрактный принт', 3200.00, NULL, 'Стильный свитшот с абстрактным художественным принтом. Идеален для творческих личностей.', 'print', NULL, ARRAY['/src/assets/tshirt-print.jpg']),
('Luxury Gold', 0.00, 85.00, 'Роскошный аромат с нотами золотистого янтаря, ванили и драгоценных пород дерева. Идеален для особых случаев.', 'perfume', 'Премиум', ARRAY['/src/assets/perfume-luxury.jpg']),
('Ocean Breeze', 0.00, 68.00, 'Свежий морской аромат с нотами цитрусов, морской соли и белых цветов. Освежает и бодрит.', 'perfume', 'Бестселлер', ARRAY['/src/assets/perfume-luxury.jpg']),
('Midnight Rose', 0.00, 92.00, 'Таинственный вечерний аромат с глубокими нотами темной розы, пачули и черной смородины.', 'perfume', NULL, ARRAY['/src/assets/perfume-luxury.jpg']);