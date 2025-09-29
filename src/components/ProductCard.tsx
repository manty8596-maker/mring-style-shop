import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Product } from "@/hooks/useProducts";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.image_urls.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.image_urls.length - 1 : prev - 1
    );
  };

  const handleOrder = () => {
    navigate("/order", { 
      state: { 
        product: {
          ...product,
          currentImage: product.image_urls[currentImageIndex]
        }
      } 
    });
  };

  return (
    <Card className="group hover-lift animate-fade-in shadow-card">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image_urls[currentImageIndex]}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {product.image_urls.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {product.image_urls.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          {product.badge && (
            <Badge className="absolute top-2 right-2 gradient-accent text-white z-10 text-xs px-2 py-1 max-w-[80px] truncate">
              {product.badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors pr-20">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">
            {product.category === "perfume" ? (
              <span className="text-lg">
                {product.price_per_ml}₽ <span className="text-sm text-muted-foreground">за мл</span>
              </span>
            ) : (
              `${product.price}₽`
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          variant={product.category === "perfume" ? "premium" : "order"}
          size="lg"
          className="w-full"
          onClick={handleOrder}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.category === "perfume" ? "Выбрать объем" : "Заказать"}
        </Button>
      </CardFooter>
    </Card>
  );
};