import { CategorySection } from "@/components/CategorySection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/hooks/useProducts";
import { Sparkles, Shirt, Palette, Heart, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const { products, loading, error, getProductsByCategory } = useProducts();
  // Hooks must be called unconditionally and before any early returns
  const catalogRef = useRef<HTMLDivElement | null>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка товаров...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden gradient-bg-hero">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-4 h-4 bg-white/20 rounded-full floating"></div>
          <div className="absolute top-20 right-20 w-6 h-6 bg-white/30 rounded-full floating-reverse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-20 w-3 h-3 bg-white/25 rounded-full floating" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-10 right-10 w-5 h-5 bg-white/20 rounded-full floating-reverse" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/40 rounded-full floating" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-white/15 rounded-full floating-reverse" style={{animationDelay: '5s'}}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="h-24 w-24 md:h-28 md:w-28 rounded-full bg-black/80 ring-2 ring-white/40 shadow-glow flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="MR.ING" className="h-full w-full object-cover" />
              </div>
            </div>
            <Badge className="gradient-accent text-white mb-4 text-sm px-4 py-2">
              ✨ MR.ING - Индивидуальная одежда с принтами
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-hero bg-clip-text text-transparent neon-glow bounce-in">
              Стиль без границ
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 slide-in-left">
              Создаем уникальную одежду с авторскими принтами и предлагаем эксклюзивные ароматы для вашего образа
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="gradient" size="xl" className="animate-glow pulse-glow shimmer slide-in-right" onClick={scrollToCatalog}>
                <Sparkles className="h-5 w-5 rotate-scale" />
                Смотреть каталог
              </Button>
            
            </div>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <div ref={catalogRef} />
      
      <section className="py-16 gradient-bg-aurora relative overflow-hidden">
        {/* Morphing background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 morphing" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 morphing" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/8 morphing" style={{animationDelay: '4s'}}></div>
        </div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
              Наши категории
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Выберите категорию, которая подходит вашему стилю
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Regular Clothing Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-background/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bounce-in glass">
              <div className="p-8 text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shirt className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Базовая коллекция</h3>
                <p className="text-muted-foreground mb-6">
                  Классическая одежда премиального качества для создания идеального гардероба
                </p>
                <Link to="/regular">
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Смотреть товары
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Print Clothing Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-background/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bounce-in glass" style={{animationDelay: '0.2s'}}>
              <div className="p-8 text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Palette className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Принты и дизайн</h3>
                <p className="text-muted-foreground mb-6">
                  Уникальные авторские принты, которые выделят вас из толпы
                </p>
                <Link to="/print">
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Смотреть товары
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Perfumes Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-background/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bounce-in glass" style={{animationDelay: '0.4s'}}>
              <div className="p-8 text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Ароматы</h3>
                <p className="text-muted-foreground mb-6">
                  Эксклюзивные парфюмерные композиции для завершения вашего образа
                </p>
                <Link to="/perfume">
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Смотреть товары
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold mb-4 gradient-accent bg-clip-text text-transparent">
                MR.ING
              </h3>
              <p className="text-background/80">
                Индивидуальная одежда с уникальными принтами
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <div className="space-y-2 text-background/80">
                <Link to="/regular" className="flex items-center gap-2 hover:text-background transition-colors">
                  <Shirt className="h-4 w-4" />
                  <span>Базовая одежда</span>
                </Link>
                <Link to="/print" className="flex items-center gap-2 hover:text-background transition-colors">
                  <Palette className="h-4 w-4" />
                  <span>Принты и дизайн</span>
                </Link>
                <Link to="/perfume" className="flex items-center gap-2 hover:text-background transition-colors">
                  <Sparkles className="h-4 w-4" />
                  <span>Ароматы</span>
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-background/80">
                <p>📞 +7 (928) 920 91 04</p>
                <p>📧 hamzateagle@gmail.com</p>
                <p>📱 @mringshop</p>
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2025 MR.ING. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
