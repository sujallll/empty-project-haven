import { Json } from "@/integrations/supabase/types";

export interface BaseProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  image_url: string | null;
  display_specs: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
  os: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
  gallery_images: string[] | null;
  model_name: string | null;
  design_specs?: Record<string, any> | null;
  display_details?: Record<string, any> | null;
  performance_specs?: Record<string, any> | null;
  multimedia_specs?: Record<string, any> | null;
}

export interface LaptopProduct extends BaseProduct {
  graphics: string | null;
  ports: string | null;
  connectivity_specs?: Record<string, any> | null;
}

export interface MobileProduct extends BaseProduct {
  camera: string;
  chipset?: string | null;
  charging_specs?: string | null;
  resolution?: string | null;
  screen_size?: string | null;
  announced?: string | null;
  status?: string | null;
  cpu_details?: string | null;
  gpu_details?: string | null;
  card_slot?: boolean;
  memory_type?: string | null;
  display_type?: string | null;
  display_size?: string | null;
  display_resolution?: string | null;
  display_protection?: string | null;
  display_features?: Record<string, any> | null;
  main_camera_specs?: Record<string, any> | null;
  main_camera_features?: Record<string, any> | null;
  main_camera_video?: Record<string, any> | null;
  selfie_camera_specs?: Record<string, any> | null;
  selfie_camera_features?: Record<string, any> | null;
  selfie_camera_video?: Record<string, any> | null;
  dimensions?: string | null;
  weight?: string | null;
  build_material?: string | null;
  sim_type?: string | null;
  protection_rating?: string | null;
  battery_type?: string | null;
  battery_charging?: Record<string, any> | null;
  wlan?: string | null;
  bluetooth?: string | null;
  nfc?: boolean;
  gps?: string | null;
  usb_type?: string | null;
  radio?: boolean;
  infrared?: boolean;
  network_technology?: string | null;
  bands_2g?: string[];
  bands_3g?: string[];
  bands_4g?: string[];
  bands_5g?: string[];
  network_speed?: string | null;
  loudspeaker_type?: string | null;
  audio_jack?: boolean;
  sensors?: string[];
  available_colors?: string[];
  model_variants?: string[];
  camera_details?: Record<string, any> | null;
  sensor_specs?: Record<string, any> | null;
  network_specs?: Record<string, any> | null;
  general_specs?: Record<string, any> | null;
}

export type ProductFormData = MobileProduct | LaptopProduct;

export type ProductType = 'mobile' | 'laptop';

// Type guard functions
export function isMobileProduct(product: ProductFormData): product is MobileProduct {
  return 'camera' in product;
}

export function isLaptopProduct(product: ProductFormData): product is LaptopProduct {
  return 'graphics' in product;
}