import type { Json } from "@/integrations/supabase/types";

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
  design_specs: Record<string, any> | null;
  display_details: Record<string, any> | null;
  performance_specs: Record<string, any> | null;
  multimedia_specs: Record<string, any> | null;
}

export interface LaptopProduct extends BaseProduct {
  graphics: string | null;
  ports: string | null;
  connectivity_specs: Record<string, any> | null;
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
  display_features: Record<string, any> | null;
  main_camera_specs: Record<string, any> | null;
  main_camera_features: Record<string, any> | null;
  main_camera_video: Record<string, any> | null;
  selfie_camera_specs: Record<string, any> | null;
  selfie_camera_features: Record<string, any> | null;
  selfie_camera_video: Record<string, any> | null;
  dimensions: string | null;
  weight: string | null;
  build_material: string | null;
  sim_type: string | null;
  protection_rating: string | null;
  battery_type: string | null;
  battery_charging: Record<string, any> | null;
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
  camera_details: Record<string, any> | null;
  sensor_specs: Record<string, any> | null;
  network_specs: Record<string, any> | null;
  general_specs: Record<string, any> | null;
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
  multimedia_specs?: Record<string, any>;
  design_specs?: Record<string, any>;
  display_details?: Record<string, any>;
  performance_specs?: Record<string, any>;
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
      camera_details?: Record<string, any>;
      sensor_specs?: Record<string, any>;
      network_specs?: Record<string, any>;
      general_specs?: Record<string, any>;
    }
  | {
      graphics?: string;
      ports?: string;
      connectivity_specs?: Record<string, any>;
    }
);