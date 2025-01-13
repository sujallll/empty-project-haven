import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MobileProduct, LaptopProduct } from "@/types/product";

interface CompareSearchBarProps {
  type: 'mobile' | 'laptop';
  onProductSelect: (product: MobileProduct | LaptopProduct) => void;
  currentProductId: string;
}

const CompareSearchBar = ({ 
  type,
  onProductSelect,
  currentProductId 
}: CompareSearchBarProps) => {
  const { data: products = [] } = useQuery({
    queryKey: ['products', type],
    queryFn: async () => {
      const tableName = type === 'laptop' ? 'laptops' : 'mobile_products';
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .neq('id', currentProductId)
        .limit(10);

      if (error) throw error;
      return data.map(processProduct);
    },
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Add Products to Compare</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <img
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-32 object-contain mb-2"
            />
            <h4 className="font-medium text-sm">{product.name}</h4>
            <p className="text-sm text-muted-foreground mb-2">₹{product.price.toLocaleString()}</p>
            <button
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded"
              onClick={() => onProductSelect(product)}
            >
              Add to Compare
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompareSearchBar;
