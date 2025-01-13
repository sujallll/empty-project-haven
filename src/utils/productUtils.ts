import type { Json } from "@/integrations/supabase/types";
import type { LaptopProduct, MobileProduct } from "@/types/product";

export const convertJsonFields = (data: Record<string, any>): Record<string, any> => {
  const result = { ...data };
  Object.keys(result).forEach(key => {
    if (
      key.endsWith('_specs') || 
      key.endsWith('_features') || 
      key.endsWith('_details') || 
      key.endsWith('_charging')
    ) {
      if (typeof result[key] === 'string') {
        try {
          result[key] = JSON.parse(result[key]);
        } catch {
          result[key] = {};
        }
      }
    }
  });
  return result;
};

export const processProduct = (data: any): LaptopProduct | MobileProduct => {
  const processed = convertJsonFields(data);
  
  // Convert array fields from string to array if needed
  ['sensors', 'available_colors', 'model_variants', 'bands_2g', 'bands_3g', 'bands_4g', 'bands_5g'].forEach(field => {
    if (typeof processed[field] === 'string') {
      try {
        processed[field] = processed[field].split(',').map((s: string) => s.trim());
      } catch {
        processed[field] = [];
      }
    }
  });

  return processed;
};

export const formatSpecValue = (value: any): string => {
  if (value === null || value === undefined) return 'N/A';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};