import { LaptopProduct, MobileProduct } from "@/types/product";

const ProductContent = ({ product }: { product: LaptopProduct | MobileProduct }) => {
  const isMobile = 'camera' in product;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground">
            {isMobile && product.announced && (
              <span className="text-sm">
                Announced: {new Date(product.announced).toLocaleDateString()}
              </span>
            )}
          </p>
        </div>
        <div className="text-2xl font-bold">
          ₹{product.price.toLocaleString()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold">Brand</h3>
          <p>{product.brand}</p>
        </div>
        <div>
          <h3 className="font-semibold">Model</h3>
          <p>{product.model_name || 'N/A'}</p>
        </div>
        <div>
          <h3 className="font-semibold">Color</h3>
          <p>{product.color || 'N/A'}</p>
        </div>
        <div>
          <h3 className="font-semibold">Operating System</h3>
          <p>{product.os || 'N/A'}</p>
        </div>
        <div>
          <h3 className="font-semibold">Display Specifications</h3>
          <p>{product.display_specs}</p>
        </div>
        <div>
          <h3 className="font-semibold">Processor</h3>
          <p>{product.processor}</p>
        </div>
        <div>
          <h3 className="font-semibold">RAM</h3>
          <p>{product.ram}</p>
        </div>
        <div>
          <h3 className="font-semibold">Storage</h3>
          <p>{product.storage}</p>
        </div>
        <div>
          <h3 className="font-semibold">Battery</h3>
          <p>{product.battery}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductContent;
