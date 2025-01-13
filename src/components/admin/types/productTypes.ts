import type { Json } from "@/integrations/supabase/types";

export interface BaseProductData {
  name: string;
  brand: string;
  model_name?: string;
  price: number;
  display_specs: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
  os?: string;
  color?: string;
  image_url?: string;
  gallery_images?: string[];
  design_specs?: Record<string, any>;
  display_details?: Record<string, any>;
  performance_specs?: Record<string, any>;
  multimedia_specs?: Record<string, any>;
}

export interface MobileProductData extends BaseProductData {
  camera: string;
  chipset?: string;
  charging_specs?: string;
  resolution?: string;
  screen_size?: string;
  camera_details?: Record<string, any>;
  sensor_specs?: Record<string, any>;
  network_specs?: Record<string, any>;
  general_specs?: Record<string, any>;
  sensors?: string[];
  available_colors?: string[];
  model_variants?: string[];
}

export interface LaptopProductData extends BaseProductData {
  graphics?: string;
  ports?: string;
  connectivity_specs?: Record<string, any>;
}

export type ProductFormData = MobileProductData | LaptopProductData;