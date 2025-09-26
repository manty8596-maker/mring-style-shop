import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ShoppingBag, Phone, Mail, MapPin, MessageSquare, Plus, Minus, Shield } from "lucide-react";
import { Product } from "@/hooks/useProducts";
import { EmailVerification } from "@/components/EmailVerification";

export default function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const product: Product = location.state?.product;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    comments: ""
  });

  const [mlAmount, setMlAmount] = useState(50);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    if (!product) {
      navigate("/");
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMlChange = (increment: boolean) => {
    setMlAmount(prev => {
      const newAmount = increment ? prev + 10 : prev - 10;
      return Math.max(10, Math.min(250, newAmount));
    });
  };

  const calculatePerfumePrice = () => {
    return product.price_per_ml ? product.price_per_ml * mlAmount : 0;
  };

  const finalPrice = product.category === "perfume" ? calculatePerfumePrice() : product.price;

  const handleEmailVerification = () => {
    if (!formData.email) {
      toast({
        title: "❌ Ошибка",
        description: "Пожалуйста, введите email адрес",
        variant: "destructive",
      });
      return;
    }
    setShowEmailVerification(true);
  };

  const handleEmailVerified = () => {
    setIsEmailVerified(true);
    setShowEmailVerification(false);
    toast({
      title: "✅ Email подтвержден",
      description: "Теперь вы можете оформить заказ",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isEmailVerified) {
      handleEmailVerification();
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        productName: product.category === "perfume" 
          ? `${product.name} (${mlAmount} мл)` 
          : product.name,
        productPrice: `${finalPrice}₽`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        orderDetails: formData.comments || "Нет дополнительных комментариев"
      };

      const apiUrl = import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL}/api/submit-order`
        : 'https://mringbec.vercel.app/api/submit-order';
        
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "🎉 Заказ оформлен!",
          description: "Подтверждение отправлено на вашу почту. Мы свяжемся с вами в ближайшее время.",
        });
        navigate("/");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "❌ Ошибка",
        description: "Не удалось оформить заказ. Попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 relative gradient-bg-magic">
      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-white/20 rounded-full floating"></div>
        <div className="absolute top-40 right-20 w-4 h-4 bg-white/30 rounded-full floating-reverse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-white/25 rounded-full floating" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-white/20 rounded-full floating-reverse" style={{animationDelay: '3s'}}></div>
      </div>
      
      {showEmailVerification && (
        <EmailVerification
          email={formData.email}
          onVerified={handleEmailVerified}
          onCancel={() => setShowEmailVerification(false)}
        />
      )}
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 animate-fade-in"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к каталогу
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Информация о товаре */}
          <Card className="animate-slide-up shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 gradient-primary bg-clip-text text-transparent">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Ваш заказ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <img
                  src={product.image_urls[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg shadow-card"
                />
              </div>
              
              <div>
                <h3 className="font-semibold text-xl text-foreground">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mt-2">
                  {product.description}
                </p>
              </div>

              {product.category === "perfume" && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <Label className="text-sm font-medium">Выберите объем (мл)</Label>
                  <div className="flex items-center justify-center gap-4 mt-3">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => handleMlChange(false)}
                      disabled={mlAmount <= 10}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-2xl font-bold min-w-[80px] text-center">
                      {mlAmount} мл
                    </span>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => handleMlChange(true)}
                      disabled={mlAmount >= 250}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-center text-muted-foreground mt-2">
                    {product.price_per_ml}₽ за мл
                  </p>
                </div>
              )}

              <Separator />
              
              <div className="flex justify-between items-center text-xl">
                <span className="font-medium">Итого:</span>
                <span className="font-bold gradient-primary bg-clip-text text-transparent">
                  {finalPrice}₽
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Форма заказа */}
          <Card className="animate-slide-up shadow-elegant" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="gradient-primary bg-clip-text text-transparent">
                Оформление заказа
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <span>Ваше имя</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Введите ваше имя"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Телефон
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Адрес доставки
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Город, улица, дом, квартира"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Комментарии к заказу
                  </Label>
                  <Textarea
                    id="comments"
                    value={formData.comments}
                    onChange={(e) => handleInputChange("comments", e.target.value)}
                    placeholder="Дополнительные пожелания (необязательно)"
                  />
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  size="xl"
                  className="w-full mt-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Оформляем заказ..."
                  ) : !isEmailVerified ? (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Подтвердить email и заказать за {finalPrice}₽
                    </>
                  ) : (
                    `Оформить заказ за ${finalPrice}₽`
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}