import { Layout } from "@/components/Layout";
import { CompareSection } from "@/components/product/CompareSection";
import { CompareSearchBar } from "@/components/product/CompareSearchBar";
import { useLocation } from "react-router-dom";
import type { LaptopProduct, MobileProduct } from "@/types/product";

interface LocationState {
  products: (LaptopProduct | MobileProduct)[];
  type: 'mobile' | 'laptop';
}

export function ComparisonPage() {
  const location = useLocation();
  const state = location.state as LocationState;

  if (!state?.products || !state?.type) {
    return <div>Invalid comparison data</div>;
  }

  return (
    <Layout>
      <div className="container py-8">
        <CompareSection 
          currentProduct={state.products[0]} 
          type={state.type} 
        />
      </div>
    </Layout>
  );
}