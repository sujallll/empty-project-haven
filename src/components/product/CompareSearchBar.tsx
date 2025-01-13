import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { MobileProduct, LaptopProduct } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

interface CompareSearchBarProps {
  type: 'mobile' | 'laptop';
  onProductSelect: (product: MobileProduct | LaptopProduct) => void;
  currentProductId: string;
}

export function CompareSearchBar({ type, onProductSelect, currentProductId }: CompareSearchBarProps) {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', type],
    queryFn: async () => {
      const tableName = type === 'laptop' ? 'laptops' : 'mobile_products';
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .neq('id', currentProductId)
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Compare Products</h3>
      <ScrollArea className="h-40">
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-4 border rounded">
              <span>{product.name}</span>
              <Button onClick={() => onProductSelect(product)}>Select</Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
