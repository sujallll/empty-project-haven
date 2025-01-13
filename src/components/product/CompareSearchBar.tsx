import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { LaptopProduct, MobileProduct } from "@/types/product";

interface CompareSearchBarProps {
  onProductSelect: (product: LaptopProduct | MobileProduct) => void;
  type: 'mobile' | 'laptop';
}

export function CompareSearchBar({ onProductSelect, type }: CompareSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const { data: products = [] } = useQuery({
    queryKey: ['search-products', type, searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];

      const tableName = type === 'laptop' ? 'laptops' : 'mobile_products';
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .ilike('name', `%${searchQuery}%`)
        .limit(5);

      if (error) throw error;
      return data as (LaptopProduct | MobileProduct)[];
    },
    enabled: searchQuery.length > 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handleProductSelect = (product: LaptopProduct | MobileProduct) => {
    onProductSelect(product);
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Search products to compare..."
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full"
      />

      {showResults && searchQuery && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50">
          <CardContent className="p-2">
            {products.length > 0 ? (
              <div className="space-y-2">
                {products.map((product) => (
                  <Button
                    key={product.id}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleProductSelect(product)}
                  >
                    {product.name}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground p-2">
                No products found
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}