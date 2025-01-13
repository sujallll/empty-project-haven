import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { MobileProduct, LaptopProduct } from "@/types/product";

interface ComparisonTableProps {
  selectedProducts: (MobileProduct | LaptopProduct)[];
  currentProduct: MobileProduct | LaptopProduct;
  type: 'mobile' | 'laptop';
  onRemove: (productId: string) => void;
}

export function ComparisonTable({ selectedProducts, currentProduct, type, onRemove }: ComparisonTableProps) {
  const baseSpecs = [
    { title: "Basic Information", specs: [
      { title: "Price", key: "price", format: (value: number) => `₹${value.toLocaleString()}` },
      { title: "Brand", key: "brand" },
      { title: "Model", key: "model_name" },
      { title: "Color", key: "color" },
      { title: "OS", key: "os" },
    ]},
    { title: "Display", specs: [
      { title: "Display Specs", key: "display_specs" },
      { title: "Display Type", key: "display_type" },
      { title: "Display Size", key: "display_size" },
      { title: "Resolution", key: "resolution" },
      { title: "Display Protection", key: "display_protection" },
    ]},
    { title: "Performance", specs: [
      { title: "Processor", key: "processor" },
      { title: "RAM", key: "ram" },
      { title: "Storage", key: "storage" },
    ]},
    { title: "Battery & Power", specs: [
      { title: "Battery", key: "battery" },
      { title: "Battery Type", key: "battery_type" },
      { title: "Charging Specs", key: "charging_specs" },
    ]},
  ];

  const mobileSpecs = [
    ...baseSpecs,
    { title: "Camera", specs: [
      { title: "Main Camera", key: "camera" },
      { title: "Chipset", key: "chipset" },
    ]},
    { title: "Design", specs: [
      { title: "Dimensions", key: "dimensions" },
      { title: "Weight", key: "weight" },
      { title: "Build Material", key: "build_material" },
      { title: "SIM Type", key: "sim_type" },
      { title: "Protection Rating", key: "protection_rating" },
    ]},
    { title: "Connectivity", specs: [
      { title: "Network Technology", key: "network_technology" },
      { title: "Network Speed", key: "network_speed" },
      { title: "WLAN", key: "wlan" },
      { title: "Bluetooth", key: "bluetooth" },
      { title: "NFC", key: "nfc", format: (value: boolean) => value ? "Yes" : "No" },
      { title: "GPS", key: "gps" },
      { title: "USB Type", key: "usb_type" },
      { title: "Radio", key: "radio", format: (value: boolean) => value ? "Yes" : "No" },
      { title: "Audio Jack", key: "audio_jack", format: (value: boolean) => value ? "Yes" : "No" },
    ]},
  ];

  const laptopSpecs = [
    ...baseSpecs,
    { title: "Graphics & Ports", specs: [
      { title: "Graphics", key: "graphics" },
      { title: "Ports", key: "ports" },
    ]},
  ];

  const specs = type === 'laptop' ? laptopSpecs : mobileSpecs;
  const displayProducts = selectedProducts.slice(1, 3);

  const formatValue = (spec: { key: string; format?: (value: any) => string }, value: any) => {
    if (spec.format) {
      return spec.format(value);
    }
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    return value?.toString() || 'N/A';
  };

  return (
    <div className="mt-6">
      <div className="mt-8">
        {specs.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <h3 className="font-semibold text-lg mb-4">{group.title}</h3>
            {group.specs.map((spec, specIndex) => (
              <div key={specIndex}>
                <div className="grid grid-cols-4 gap-4 py-3">
                  <div className="font-medium text-gray-700">{spec.title}</div>
                  <div className="text-gray-600">
                    {formatValue(spec, currentProduct[spec.key as keyof typeof currentProduct])}
                  </div>
                  {displayProducts.map((product) => (
                    <div key={`${product.id}-${spec.key}`} className="text-gray-600">
                      {formatValue(spec, product[spec.key as keyof typeof product])}
                    </div>
                  ))}
                </div>
                <Separator />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}