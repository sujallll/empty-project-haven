import { ProductImage } from "./ProductImage";
import { MobileProduct, LaptopProduct } from "@/types/product";

interface ProductContentProps {
  product: MobileProduct | LaptopProduct;
  type: 'mobile' | 'laptop';
}

export function ProductContent({ product, type }: ProductContentProps) {
  return (
    <div className="flex flex-col">
      <ProductImage src={product.image_url || ''} alt={product.name} className="w-full h-64" />
      <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
      <p className="text-gray-600">{product.brand}</p>
      <p className="text-lg font-bold">₹{product.price.toLocaleString()}</p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Specifications</h3>
        <ul className="list-disc list-inside">
          <li>Processor: {product.processor}</li>
          <li>RAM: {product.ram}</li>
          <li>Storage: {product.storage}</li>
          <li>Battery: {product.battery}</li>
          {type === 'mobile' && (
            <>
              <li>Camera: {product.camera}</li>
              <li>Chipset: {product.chipset}</li>
            </>
          )}
          {type === 'laptop' && (
            <>
              <li>Graphics: {product.graphics}</li>
              <li>Ports: {product.ports}</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
