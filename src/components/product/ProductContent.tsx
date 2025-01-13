import { useState } from "react";
import { ProductSpecifications } from "@/components/admin/ProductSpecifications";
import { CompareSection } from "./CompareSection";
import { ProductReview } from "./ProductReview";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { MobileProduct, LaptopProduct } from "@/types/product";

interface ProductContentProps {
  product: MobileProduct | LaptopProduct;
  type: 'mobile' | 'laptop';
  activeSection: string;
}

function isMobileProduct(product: MobileProduct | LaptopProduct): product is MobileProduct {
  return 'camera' in product;
}

export function ProductContent({ product, type, activeSection }: ProductContentProps) {
  const [currentTab, setCurrentTab] = useState(activeSection);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          {isMobileProduct(product) && product.announced && (
            <span>Announced: {product.announced}</span>
          )}
          <span>Brand: {product.brand}</span>
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="compare">Compare</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <ProductSpecifications product={product} />
        </TabsContent>

        <TabsContent value="compare">
          <CompareSection currentProduct={product} type={type} />
        </TabsContent>

        <TabsContent value="reviews">
          <ProductReview productId={product.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}