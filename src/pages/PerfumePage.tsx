import { CategorySection } from "@/components/CategorySection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/hooks/useProducts";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const PerfumePage = () => {
  const { products, loading, error, getProductsByCategory } = useProducts();

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
    <div className="min-h-screen gradient-bg-magic">
      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-4 h-4 bg-white/20 rounded-full floating"></div>
        <div className="absolute top-20 right-20 w-6 h-6 bg-white/30 rounded-full floating-reverse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-white/25 rounded-full floating" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-10 right-10 w-5 h-5 bg-white/20 rounded-full floating-reverse" style={{animationDelay: '3s'}}></div>
      </div>
      
      {/* Header */}
      <section className="relative py-16 overflow-hidden bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                На главную
              </Button>
            </Link>
          </div>
          
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-primary/10 ring-2 ring-primary/20 flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-primary" />
              </div>
            </div>
            <Badge className="gradient-accent text-white mb-4 text-sm px-4 py-2">
              🌟 Эксклюзивные ароматы
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-primary bg-clip-text text-transparent neon-glow bounce-in">
              Ароматы
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto slide-in-left">
              Эксклюзивные парфюмерные композиции для завершения вашего неповторимого образа. Каждый аромат создается индивидуально.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <div className="relative">
        {/* Morphing background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 morphing" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 morphing" style={{animationDelay: '2s'}}></div>
        </div>
        <CategorySection
          title="Ароматы"
          description="Эксклюзивные парфюмерные композиции для завершения вашего неповторимого образа"
          products={getProductsByCategory('perfume')}
          className="py-16 relative z-10"
        />
      </div>

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
                  <span>Базовая одежда</span>
                </Link>
                <Link to="/print" className="flex items-center gap-2 hover:text-background transition-colors">
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

export default PerfumePage;
