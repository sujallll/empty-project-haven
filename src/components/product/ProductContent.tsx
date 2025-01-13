import { ProductImage } from "./ProductImage";
import { MobileProduct, LaptopProduct, isMobileProduct, isLaptopProduct } from "@/types/product";

interface ProductContentProps {
  product: MobileProduct | LaptopProduct;
  type: 'mobile' | 'laptop';
  activeSection?: string;
}

export function ProductContent({ product, type, activeSection }: ProductContentProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ProductImage
        src={product.image_url}
        alt={product.name}
        className="w-full max-w-md mx-auto"
      />
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <ul className="space-y-2">
          <li>Brand: {product.brand}</li>
          <li>Price: ₹{product.price.toLocaleString()}</li>
          <li>Display: {product.display_specs}</li>
          <li>Processor: {product.processor}</li>
          <li>RAM: {product.ram}</li>
          <li>Storage: {product.storage}</li>
          <li>Battery: {product.battery}</li>
          {isMobileProduct(product) && (
            <>
              <li>Camera: {product.camera}</li>
              {product.chipset && <li>Chipset: {product.chipset}</li>}
            </>
          )}
          {isLaptopProduct(product) && (
            <>
              {product.graphics && <li>Graphics: {product.graphics}</li>}
              {product.ports && <li>Ports: {product.ports}</li>}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}