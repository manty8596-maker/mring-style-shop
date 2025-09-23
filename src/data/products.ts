import { Product } from "@/hooks/useProducts";
import hoodieImage from "@/assets/hoodie-black.jpg";
import tshirtImage from "@/assets/tshirt-print.jpg";
import perfumeImage from "@/assets/perfume-luxury.jpg";

export const regularClothing: Product[] = [
  {
    id: "hoodie-black",
    name: "Черное худи Premium",
    price: 3500,
    description: "Стильное черное худи из премиального хлопка. Идеально для повседневной носки и создания модных образов.",
    image_urls: [hoodieImage],
    category: "regular",
    badge: "Хит продаж"
  },
  {
    id: "jeans-classic",
    name: "Классические джинсы",
    price: 2800,
    description: "Универсальные джинсы прямого кроя из качественного денима. Подходят для любого стиля.",
    image_urls: [hoodieImage], // Временно используем то же изображение
    category: "regular"
  },
  {
    id: "jacket-bomber",
    name: "Бомбер куртка",
    price: 4200,
    description: "Модная куртка-бомбер с контрастными вставками. Отличное дополнение к спортивному образу.",
    image_urls: [hoodieImage],
    category: "regular",
    badge: "Новинка"
  }
];

export const printClothing: Product[] = [
  {
    id: "tshirt-geometric",
    name: "Футболка с геометрическим принтом",
    price: 2100,
    description: "Яркая футболка с авторским геометрическим принтом. Высококачественная печать на премиальном материале.",
    image_urls: [tshirtImage],
    category: "print",
    badge: "Авторский дизайн"
  },
  {
    id: "hoodie-graffiti",
    name: "Худи с принтом граффити",
    price: 3800,
    description: "Уникальное худи с ярким принтом в стиле граффити. Каждый принт наносится вручную.",
    image_urls: [tshirtImage],
    category: "print",
    badge: "Лимитированная серия"
  },
  {
    id: "sweatshirt-abstract",
    name: "Свитшот абстрактный принт",
    price: 3200,
    description: "Стильный свитшот с абстрактным художественным принтом. Идеален для творческих личностей.",
    image_urls: [tshirtImage],
    category: "print"
  }
];

export const perfumes: Product[] = [
  {
    id: "perfume-luxury-gold",
    name: "Luxury Gold",
    price_per_ml: 85,
    price: 0, // Будет рассчитываться динамически
    description: "Роскошный аромат с нотами золотистого янтаря, ванили и драгоценных пород дерева. Идеален для особых случаев.",
    image_urls: [perfumeImage],
    category: "perfume",
    badge: "Премиум"
  },
  {
    id: "perfume-ocean-breeze",
    name: "Ocean Breeze",
    price_per_ml: 68,
    price: 0,
    description: "Свежий морской аромат с нотами цитрусов, морской соли и белых цветов. Освежает и бодрит.",
    image_urls: [perfumeImage],
    category: "perfume",
    badge: "Бестселлер"
  },
  {
    id: "perfume-midnight-rose",
    name: "Midnight Rose",
    price_per_ml: 92,
    price: 0,
    description: "Таинственный вечерний аромат с глубокими нотами темной розы, пачули и черной смородины.",
    image_urls: [perfumeImage],
    category: "perfume"
  }
];