import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, X, Eye } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  price_per_ml?: number;
  description: string;
  category: string;
  badge?: string;
  image_urls: string[];
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    price_per_ml: "",
    description: "",
    category: "regular",
    badge: "",
    image_urls: [] as string[],
    imageFiles: [] as File[]
  });

  const handleLogin = () => {
    if (password === "1324") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
      toast.success("Вход выполнен успешно");
    } else {
      toast.error("Неверный пароль");
    }
  };

  useEffect(() => {
    const savedAuth = localStorage.getItem("admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
    
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error("Ошибка загрузки товаров");
      console.error(error);
    } else {
      setProducts(data || []);
    }
  };

  const uploadImages = async (files: File[]) => {
    const uploadedUrls: string[] = [];
    
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);
      
      if (error) {
        toast.error(`Ошибка загрузки изображения: ${file.name}`);
        console.error(error);
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);
        uploadedUrls.push(publicUrl);
      }
    }
    
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      toast.error("Название товара обязательно");
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error("Описание товара обязательно");
      return;
    }
    
    // Validate price based on category
    if (formData.category === 'perfume') {
      if (!formData.price_per_ml || isNaN(parseFloat(formData.price_per_ml))) {
        toast.error("Цена за мл обязательна для парфюмерии");
        return;
      }
    } else {
      if (!formData.price || isNaN(parseFloat(formData.price))) {
        toast.error("Цена товара обязательна");
        return;
      }
    }
    
    let imageUrls = [...formData.image_urls];
    
    if (formData.imageFiles.length > 0) {
      const uploadedUrls = await uploadImages(formData.imageFiles);
      imageUrls = [...imageUrls, ...uploadedUrls];
    }
    
    const productData = {
      name: formData.name.trim(),
      price: formData.category === 'perfume' ? 0 : parseFloat(formData.price),
      price_per_ml: formData.category === 'perfume' ? parseFloat(formData.price_per_ml) : null,
      description: formData.description.trim(),
      category: formData.category,
      badge: formData.badge?.trim() || null,
      image_urls: imageUrls
    };

    if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProduct.id);
      
      if (error) {
        toast.error("Ошибка обновления товара");
        console.error(error);
      } else {
        toast.success("Товар обновлен");
        resetForm();
        fetchProducts();
      }
    } else {
      const { error } = await supabase
        .from('products')
        .insert(productData);
      
      if (error) {
        toast.error("Ошибка добавления товара");
        console.error(error);
      } else {
        toast.success("Товар добавлен");
        resetForm();
        fetchProducts();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Удалить товар?")) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) {
        toast.error("Ошибка удаления товара");
        console.error(error);
      } else {
        toast.success("Товар удален");
        fetchProducts();
      }
    }
  };

  const startEditing = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      price_per_ml: product.price_per_ml?.toString() || "",
      description: product.description,
      category: product.category,
      badge: product.badge || "",
      image_urls: product.image_urls,
      imageFiles: []
    });
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      price_per_ml: "",
      description: "",
      category: "regular",
      badge: "",
      image_urls: [],
      imageFiles: []
    });
  };

  const removeImageUrl = (index: number) => {
    setFormData(prev => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        imageFiles: [...prev.imageFiles, ...Array.from(e.target.files!)]
      }));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Админ-панель
            </CardTitle>
            <CardDescription>Введите пароль для доступа</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Войти
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Управление товарами
          </h1>
          <Button 
            variant="outline" 
            onClick={() => {
              setIsAuthenticated(false);
              localStorage.removeItem("admin_auth");
            }}
          >
            Выйти
          </Button>
        </div>

        <Tabs defaultValue="add" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add">
              {editingProduct ? "Редактировать товар" : "Добавить товар"}
            </TabsTrigger>
            <TabsTrigger value="list">Список товаров</TabsTrigger>
          </TabsList>

          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingProduct ? "Редактирование товара" : "Добавление нового товара"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Название</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Категория</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regular">Обычная одежда</SelectItem>
                          <SelectItem value="print">Одежда с принтами</SelectItem>
                          <SelectItem value="perfume">Духи</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="price">Цена (₽)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        disabled={formData.category === 'perfume'}
                        required={formData.category !== 'perfume'}
                      />
                    </div>

                    {formData.category === 'perfume' && (
                      <div>
                        <Label htmlFor="price_per_ml">Цена за мл (₽)</Label>
                        <Input
                          id="price_per_ml"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.price_per_ml}
                          onChange={(e) => setFormData(prev => ({ ...prev, price_per_ml: e.target.value }))}
                          required
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="badge">Бейдж (необязательно)</Label>
                      <Input
                        id="badge"
                        value={formData.badge}
                        onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      required
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Изображения</Label>
                    <div className="space-y-4">
                      {formData.image_urls.map((url, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input value={url} readOnly />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(url, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeImageUrl(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <div>
                        <Label htmlFor="images">Загрузить изображения</Label>
                        <Input
                          id="images"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>

                      <div>
                        <Label htmlFor="imageUrl">Или добавить URL изображения</Label>
                        <div className="flex gap-2">
                          <Input
                            id="imageUrl"
                            placeholder="https://example.com/image.jpg"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                const input = e.target as HTMLInputElement;
                                if (input.value) {
                                  setFormData(prev => ({
                                    ...prev,
                                    image_urls: [...prev.image_urls, input.value]
                                  }));
                                  input.value = '';
                                }
                              }
                            }}
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              const input = document.getElementById('imageUrl') as HTMLInputElement;
                              if (input.value) {
                                setFormData(prev => ({
                                  ...prev,
                                  image_urls: [...prev.image_urls, input.value]
                                }));
                                input.value = '';
                              }
                            }}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      {editingProduct ? "Обновить товар" : "Добавить товар"}
                    </Button>
                    {editingProduct && (
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Отмена
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>Список товаров ({products.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <p className="text-sm">
                          {product.category === 'perfume' 
                            ? `${product.price_per_ml}₽/мл` 
                            : `${product.price}₽`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditing(product)}
                        >
                          Редактировать
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          Удалить
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}