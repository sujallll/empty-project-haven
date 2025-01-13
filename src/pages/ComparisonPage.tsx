import { Layout } from "@/components/Layout";
import { CompareSection } from "@/components/product/CompareSection";
import { CompareSearchBar } from "@/components/product/CompareSearchBar";
import { useLocation } from "react-router-dom";
import type { LaptopProduct, MobileProduct } from "@/types/product";

export default function ComparisonPage() {
  const location = useLocation();
  const { state } = location;
  const products = state?.products as (LaptopProduct | MobileProduct)[];
  const type = state?.type as 'mobile' | 'laptop';

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Compare Products</h1>
        <CompareSearchBar 
          type={type} 
          onProductSelect={() => {}} 
          currentProductId={products?.[0]?.id || ''}
        />
        <CompareSection currentProduct={products[0]} type={type} />
      </div>
    </Layout>
  );
}