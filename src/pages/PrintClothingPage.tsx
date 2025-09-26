import { CategorySection } from "@/components/CategorySection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/hooks/useProducts";
import { ArrowLeft, Palette } from "lucide-react";
import { Link } from "react-router-dom";

const PrintClothingPage = () => {
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
    <div className="min-h-screen">
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
                <Palette className="h-10 w-10 text-primary" />
              </div>
            </div>
            <Badge className="gradient-accent text-white mb-4 text-sm px-4 py-2">
              🎨 Авторские принты
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
              Принты и дизайн
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Уникальные авторские принты, которые выделят вас из толпы. Каждый принт создается с любовью к деталям и вниманием к трендам.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <CategorySection
        title="Принты и дизайн"
        description="Уникальные авторские принты, которые выделят вас из толпы. Каждый принт создается с любовью к деталям"
        products={getProductsByCategory('print')}
        className="py-16"
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
                <Link to="/regular" className="flex items-center gap-2 hover:text-background transition-colors">
                  <span>Базовая одежда</span>
                </Link>
                <Link to="/print" className="flex items-center gap-2 hover:text-background transition-colors">
                  <Palette className="h-4 w-4" />
                  <span>Принты и дизайн</span>
                </Link>
                <Link to="/perfume" className="flex items-center gap-2 hover:text-background transition-colors">
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

export default PrintClothingPage;
