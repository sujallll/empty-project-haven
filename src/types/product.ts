import type { Json } from "@/integrations/supabase/types";

type JsonRecord = Record<string, any>;

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
  design_specs: JsonRecord | null;
  display_details: JsonRecord | null;
  performance_specs: JsonRecord | null;
  multimedia_specs: JsonRecord | null;
}

export interface LaptopProduct extends BaseProduct {
  graphics: string | null;
  ports: string | null;
  connectivity_specs: JsonRecord | null;
}

export interface MobileProduct extends BaseProduct {
  camera: string;
  announced: string | null;
  status: string | null;
  cpu_details: string | null;
  gpu_details: string | null;
  chipset: string | null;
  card_slot: boolean | null;
  memory_type: string | null;
  display_type: string | null;
  display_size: string | null;
  display_resolution: string | null;
  display_protection: string | null;
  display_features: JsonRecord | null;
  main_camera_specs: JsonRecord | null;
  main_camera_features: JsonRecord | null;
  main_camera_video: JsonRecord | null;
  selfie_camera_specs: JsonRecord | null;
  selfie_camera_features: JsonRecord | null;
  selfie_camera_video: JsonRecord | null;
  dimensions: string | null;
  weight: string | null;
  build_material: string | null;
  sim_type: string | null;
  protection_rating: string | null;
  battery_type: string | null;
  battery_charging: JsonRecord | null;
  charging_specs: string | null;
  wlan: string | null;
  bluetooth: string | null;
  nfc: boolean | null;
  gps: string | null;
  usb_type: string | null;
  radio: boolean | null;
  infrared: boolean | null;
  network_technology: string | null;
  bands_2g: string[] | null;
  bands_3g: string[] | null;
  bands_4g: string[] | null;
  bands_5g: string[] | null;
  network_speed: string | null;
  loudspeaker_type: string | null;
  audio_jack: boolean | null;
  sensors: string[] | null;
  available_colors: string[] | null;
  model_variants: string[] | null;
  resolution: string | null;
  screen_size: string | null;
  camera_details: JsonRecord | null;
  sensor_specs: JsonRecord | null;
  network_specs: JsonRecord | null;
  general_specs: JsonRecord | null;
}

export type ProductFormData = {
  id?: string;
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
  multimedia_specs?: JsonRecord;
  design_specs?: JsonRecord;
  display_details?: JsonRecord;
  performance_specs?: JsonRecord;
} & (
  | {
      camera: string;
      chipset?: string;
      charging_specs?: string;
      resolution?: string;
      screen_size?: string;
      announced?: string;
      status?: string;
      memory_type?: string;
      display_type?: string;
      display_protection?: string;
      dimensions?: string;
      weight?: string;
      build_material?: string;
      sim_type?: string;
      wlan?: string;
      bluetooth?: string;
      gps?: string;
      usb_type?: string;
      network_technology?: string;
      network_speed?: string;
      sensors?: string[];
      available_colors?: string[];
      model_variants?: string[];
      card_slot?: boolean;
      nfc?: boolean;
      radio?: boolean;
      infrared?: boolean;
      audio_jack?: boolean;
      camera_details?: JsonRecord;
      sensor_specs?: JsonRecord;
      network_specs?: JsonRecord;
      general_specs?: JsonRecord;
      display_features?: JsonRecord;
      main_camera_specs?: JsonRecord;
      main_camera_features?: JsonRecord;
      main_camera_video?: JsonRecord;
      selfie_camera_specs?: JsonRecord;
      selfie_camera_features?: JsonRecord;
      selfie_camera_video?: JsonRecord;
      battery_type?: string;
      battery_charging?: JsonRecord;
      bands_2g?: string[];
      bands_3g?: string[];
      bands_4g?: string[];
      bands_5g?: string[];
      loudspeaker_type?: string;
    }
  | {
      graphics?: string;
      ports?: string;
      connectivity_specs?: JsonRecord;
    }
);

export function isMobileProduct(product: any): product is MobileProduct {
  return 'camera' in product;
}

export function isLaptopProduct(product: any): product is LaptopProduct {
  return 'graphics' in product;
}