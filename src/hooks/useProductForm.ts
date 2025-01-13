import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mobileProductSchema, laptopProductSchema } from "@/schemas/productSchemas";
import { useImageUpload } from "./useImageUpload";
import { useAuthCheck } from "./useAuthCheck";
import { useProductData } from "./useProductData";
import { supabase } from "@/integrations/supabase/client";
import type { UseProductFormProps, MobileProductData, LaptopProductData } from "../components/admin/types/productTypes";

export function useProductForm({ initialData, onSuccess, productType: propProductType }: UseProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [productType, setProductType] = useState<'mobile' | 'laptop'>(propProductType || 'mobile');
  const { toast, navigate } = useAuthCheck();
  const { updateProduct, insertProduct } = useProductData();
  const { 
    mainImageFile, 
    galleryImageFiles, 
    handleMainImageChange, 
    handleGalleryImagesChange, 
    handleRemoveGalleryImage,
    uploadImage 
  } = useImageUpload();

  const getDefaultValues = () => {
    const baseDefaults = {
      name: "",
      brand: "",
      model_name: "",
      price: 0,
      display_specs: "",
      processor: "",
      ram: "",
      storage: "",
      battery: "",
      os: "",
      color: "",
      image_url: "",
      gallery_images: [] as string[],
    };

    if (productType === 'mobile') {
      return {
        ...baseDefaults,
        camera: "",
        chipset: "",
        charging_specs: "",
        resolution: "",
        screen_size: "",
        announced: "",
        status: "",
        cpu_details: "",
        gpu_details: "",
        card_slot: false,
        memory_type: "",
        display_type: "",
        display_protection: "",
        dimensions: "",
        weight: "",
        build_material: "",
        sim_type: "",
        protection_rating: "",
        wlan: "",
        bluetooth: "",
        nfc: false,
        gps: "",
        usb_type: "",
        radio: false,
        infrared: false,
        network_technology: "",
        network_speed: "",
        loudspeaker_type: "",
        audio_jack: false,
        sensors: [] as string[],
        available_colors: [] as string[],
        model_variants: [] as string[],
        bands_2g: [] as string[],
        bands_3g: [] as string[],
        bands_4g: [] as string[],
        bands_5g: [] as string[],
      };
    }

    return {
      ...baseDefaults,
      graphics: "",
      ports: "",
    };
  };

  const form = useForm({
    resolver: zodResolver(productType === 'mobile' ? mobileProductSchema : laptopProductSchema),
    defaultValues: initialData || getDefaultValues(),
  });

  // Reset form when product type changes
  useEffect(() => {
    if (!initialData) {
      form.reset(getDefaultValues());
    }
  }, [productType]);

  // Update product type when prop changes
  useEffect(() => {
    if (propProductType) {
      setProductType(propProductType);
    }
  }, [propProductType]);

  const onSubmit = async (data: MobileProductData | LaptopProductData) => {
    try {
      setIsLoading(true);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Please login again to continue.",
        });
        navigate("/admin/login");
        return;
      }

      // Handle image uploads
      if (mainImageFile) {
        const imageUrl = await uploadImage(mainImageFile, 'main');
        data.image_url = imageUrl;
      }

      if (galleryImageFiles.length > 0) {
        const uploadPromises = galleryImageFiles.map(file => 
          uploadImage(file, 'gallery')
        );
        const newGalleryImages = await Promise.all(uploadPromises);
        
        const existingGalleryImages = initialData?.gallery_images || [];
        data.gallery_images = [...existingGalleryImages, ...newGalleryImages];
      }

      // Clean up array fields for mobile products
      if (productType === 'mobile') {
        const mobileData = data as MobileProductData;
        
        // Convert comma-separated strings to arrays if needed
        if (typeof mobileData.sensors === 'string') {
          mobileData.sensors = mobileData.sensors.split(',').map(s => s.trim()).filter(Boolean);
        }
        if (typeof mobileData.available_colors === 'string') {
          mobileData.available_colors = mobileData.available_colors.split(',').map(s => s.trim()).filter(Boolean);
        }
        if (typeof mobileData.model_variants === 'string') {
          mobileData.model_variants = mobileData.model_variants.split(',').map(s => s.trim()).filter(Boolean);
        }
      }

      const table = productType === 'mobile' ? 'mobile_products' : 'laptops';
      
      let result;
      if (initialData?.id) {
        result = await updateProduct(table, initialData.id, data, productType);
        toast({
          title: "Success",
          description: `${productType === 'mobile' ? 'Mobile phone' : 'Laptop'} updated successfully`,
        });
      } else {
        result = await insertProduct(table, data, productType);
        toast({
          title: "Success",
          description: `${productType === 'mobile' ? 'Mobile phone' : 'Laptop'} added successfully`,
        });
      }

      form.reset(getDefaultValues());
      onSuccess?.(result.id);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      if (error.message?.includes('JWT')) {
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Please login again to continue.",
        });
        navigate("/admin/login");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to save product",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    productType,
    handleMainImageChange,
    handleGalleryImagesChange,
    handleRemoveGalleryImage: (index: number) => handleRemoveGalleryImage(index, form),
    onSubmit,
  };
}