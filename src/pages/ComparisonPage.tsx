import { Layout } from "@/components/Layout";
import CompareSearchBar from "@/components/product/CompareSearchBar";
import { CompareSection } from "@/components/product/CompareSection";
import { useState } from "react";
import type { LaptopProduct, MobileProduct } from "@/types/product";

export default function ComparisonPage() {
  const [selectedProducts, setSelectedProducts] = useState<(LaptopProduct | MobileProduct)[]>([]);

  const handleProductSelect = (product: LaptopProduct | MobileProduct) => {
    if (selectedProducts.length < 3) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemoveProduct = (index: number) => {
    const newProducts = [...selectedProducts];
    newProducts.splice(index, 1);
    setSelectedProducts(newProducts);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Compare Products</h1>
        <CompareSearchBar onSelect={handleProductSelect} />
        {selectedProducts.length > 0 && (
          <CompareSection 
            products={selectedProducts}
            onRemove={handleRemoveProduct}
          />
        )}
      </div>
    </Layout>
  );
}