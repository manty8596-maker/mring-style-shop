import { CategorySection } from "@/components/CategorySection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/hooks/useProducts";
import { Sparkles, Shirt, Palette, Heart } from "lucide-react";
import { useRef } from "react";

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
      <section className="relative py-20 overflow-hidden">
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-hero bg-clip-text text-transparent">
              Стиль без границ
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Создаем уникальную одежду с авторскими принтами и предлагаем эксклюзивные ароматы для вашего образа
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="gradient" size="xl" className="animate-glow" onClick={scrollToCatalog}>
                <Sparkles className="h-5 w-5" />
                Смотреть каталог
              </Button>
            
            </div>
          </div>
        </div>
      </section>

      {/* Regular Clothing Section */}
      <div ref={catalogRef} />

      <CategorySection
        title="Базовая коллекция"
        description="Классическая одежда премиального качества для создания идеального гардероба"
        products={getProductsByCategory('regular')}
        className="bg-muted/30"
      />

      {/* Print Clothing Section */}
      <CategorySection
        title="Принты и дизайн"
        description="Уникальные авторские принты, которые выделят вас из толпы. Каждый принт создается с любовью к деталям"
        products={getProductsByCategory('print')}
      />

      {/* Perfumes Section */}
      <CategorySection
        title="Ароматы"
        description="Эксклюзивные парфюмерные композиции для завершения вашего неповторимого образа"
        products={getProductsByCategory('perfume')}
        className="bg-muted/30"
      />

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
                <div className="flex items-center gap-2">
                  <Shirt className="h-4 w-4" />
                  <span>Базовая одежда</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <span>Принты и дизайн</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Ароматы</span>
                </div>
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
