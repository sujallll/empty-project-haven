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
  display_protection?: string | null;
  dimensions?: string | null;
  weight?: string | null;
  build_material?: string | null;
  sim_type?: string | null;
  protection_rating?: string | null;
  wlan?: string | null;
  bluetooth?: string | null;
  nfc?: boolean;
  gps?: string | null;
  usb_type?: string | null;
  radio?: boolean;
  infrared?: boolean;
  network_technology?: string | null;
  network_speed?: string | null;
  loudspeaker_type?: string | null;
  audio_jack?: boolean;
  sensors?: string[];
  available_colors?: string[];
  model_variants?: string[];
  bands_2g?: string[];
  bands_3g?: string[];
  bands_4g?: string[];
  bands_5g?: string[];
  display_features?: Record<string, any> | null;
  camera_details?: Record<string, any> | null;
  sensor_specs?: Record<string, any> | null;
  network_specs?: Record<string, any> | null;
  general_specs?: Record<string, any> | null;
  battery_type?: string | null;
  battery_charging?: Record<string, any> | null;
}

export type ProductFormData = MobileProduct | LaptopProduct;

// Type guard functions
export function isMobileProduct(product: ProductFormData): product is MobileProduct {
  return 'camera' in product;
}

export function isLaptopProduct(product: ProductFormData): product is LaptopProduct {
  return 'graphics' in product;
}

// Helper function to convert Json to Record<string, any>
export function convertJsonToRecord(json: Json | null): Record<string, any> | null {
  if (!json) return null;
  if (typeof json === 'string') {
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  }
  return json as Record<string, any>;
}

// Helper function to convert database response to proper product type
export function convertDatabaseProduct(data: any): MobileProduct | LaptopProduct {
  const baseProduct = {
    ...data,
    design_specs: convertJsonToRecord(data.design_specs),
    display_details: convertJsonToRecord(data.display_details),
    performance_specs: convertJsonToRecord(data.performance_specs),
    multimedia_specs: convertJsonToRecord(data.multimedia_specs),
  };

  if ('camera' in data) {
    return {
      ...baseProduct,
      display_features: convertJsonToRecord(data.display_features),
      camera_details: convertJsonToRecord(data.camera_details),
      sensor_specs: convertJsonToRecord(data.sensor_specs),
      network_specs: convertJsonToRecord(data.network_specs),
      general_specs: convertJsonToRecord(data.general_specs),
      battery_charging: convertJsonToRecord(data.battery_charging),
    } as MobileProduct;
  } else {
    return {
      ...baseProduct,
      connectivity_specs: convertJsonToRecord(data.connectivity_specs),
    } as LaptopProduct;
  }
}