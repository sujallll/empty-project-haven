import type { LaptopProduct, MobileProduct } from "@/types/product";

export function processProduct<T extends LaptopProduct | MobileProduct>(product: T): T {
  const processed = { ...product };
  
  // Convert JSON string fields to objects if they're strings
  Object.keys(processed).forEach(key => {
    const value = processed[key as keyof T];
    if (typeof value === 'string' && (
      key.endsWith('_specs') || 
      key.endsWith('_details') || 
      key.endsWith('_features')
    )) {
      try {
        (processed as any)[key] = JSON.parse(value);
      } catch {
        // If parsing fails, keep the original value
        console.warn(`Failed to parse JSON for field: ${key}`);
      }
    }
  });

  return processed;
}

export function isMobileProduct(product: any): product is MobileProduct {
  return 'camera' in product;
}

export function isLaptopProduct(product: any): product is LaptopProduct {
  return 'graphics' in product;
}
