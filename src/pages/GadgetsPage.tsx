import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { categories } from "@/types/blog";
import { CategoryPageLayout } from "@/components/CategoryPageLayout";
import { MobileProductList } from "@/components/product/MobileProductList";
import { LaptopProductGrid } from "@/components/product/LaptopProductGrid";
import { BlogSidebar } from "@/components/BlogSidebar";
import type { MobileProduct, LaptopProduct } from "@/types/product";

const ITEMS_PER_PAGE = 8;

export default function GadgetsPage() {
  const [subcategory, setSubcategory] = useState<"MOBILE" | "LAPTOPS">("MOBILE");

  // Query for category-specific featured articles
  const { data: featuredArticles } = useInfiniteQuery({
    queryKey: ['gadgets-featured-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('category', 'GADGETS')
        .eq('featured_in_category', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    initialPageParam: 0,
    getNextPageParam: () => null, // No pagination for featured articles
  });

  // Query for all gadgets articles
  const { data: articles } = useInfiniteQuery({
    queryKey: ['gadgets-articles', subcategory],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('category', 'GADGETS')
        .eq('subcategory', subcategory)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    initialPageParam: 0,
    getNextPageParam: () => null, // No pagination for articles
  });

  // Infinite query for mobile products
  const {
    data: mobileData,
    fetchNextPage: fetchNextMobile,
    hasNextPage: hasNextMobile,
    isFetchingNextPage: isFetchingNextMobile
  } = useInfiniteQuery({
    queryKey: ['infinite-mobiles'],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      
      const { data, error, count } = await supabase
        .from('mobile_products')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (error) throw error;
      
      // Convert Json fields to Record<string, any>
      const processedData = data?.map(item => ({
        ...item,
        display_features: convertJsonToRecord(item.display_features),
        battery_charging: convertJsonToRecord(item.battery_charging),
        main_camera_specs: convertJsonToRecord(item.main_camera_specs),
        main_camera_features: convertJsonToRecord(item.main_camera_features),
        main_camera_video: convertJsonToRecord(item.main_camera_video),
        selfie_camera_specs: convertJsonToRecord(item.selfie_camera_specs),
        selfie_camera_features: convertJsonToRecord(item.selfie_camera_features),
        selfie_camera_video: convertJsonToRecord(item.selfie_camera_video),
        camera_details: convertJsonToRecord(item.camera_details),
        sensor_specs: convertJsonToRecord(item.sensor_specs),
        network_specs: convertJsonToRecord(item.network_specs),
        general_specs: convertJsonToRecord(item.general_specs),
        design_specs: convertJsonToRecord(item.design_specs),
        display_details: convertJsonToRecord(item.display_details),
        performance_specs: convertJsonToRecord(item.performance_specs),
        multimedia_specs: convertJsonToRecord(item.multimedia_specs),
      })) as MobileProduct[];
      
      return {
        data: processedData || [],
        nextPage: data && data.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
        totalCount: count
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0
  });

  // Infinite query for laptops
  const {
    data: laptopData,
    fetchNextPage: fetchNextLaptop,
    hasNextPage: hasNextLaptop,
    isFetchingNextPage: isFetchingNextLaptop
  } = useInfiniteQuery({
    queryKey: ['infinite-laptops'],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      
      const { data, error, count } = await supabase
        .from('laptops')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (error) throw error;
      
      // Convert Json fields to Record<string, any>
      const processedData = data?.map(item => ({
        ...item,
        connectivity_specs: convertJsonToRecord(item.connectivity_specs),
        design_specs: convertJsonToRecord(item.design_specs),
        display_details: convertJsonToRecord(item.display_details),
        performance_specs: convertJsonToRecord(item.performance_specs),
        multimedia_specs: convertJsonToRecord(item.multimedia_specs),
      })) as LaptopProduct[];
      
      return {
        data: processedData || [],
        nextPage: data && data.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
        totalCount: count
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0
  });

  const ProductGrids = () => (
    <div className="lg:col-span-8">
      {subcategory === "MOBILE" && (
        <MobileProductList 
          products={mobileData?.pages.flatMap(page => page.data) || []}
          onLoadMore={fetchNextMobile}
          hasMore={hasNextMobile}
          isLoading={isFetchingNextMobile}
        />
      )}
      {subcategory === "LAPTOPS" && (
        <LaptopProductGrid 
          products={laptopData?.pages.flatMap(page => page.data) || []}
          onLoadMore={fetchNextLaptop}
          hasMore={hasNextLaptop}
          isLoading={isFetchingNextLaptop}
        />
      )}
    </div>
  );

  return (
    <CategoryPageLayout
      title="Gadgets"
      category="GADGETS"
      articles={articles?.pages.flatMap(page => page) || []}
      featuredArticles={featuredArticles?.pages.flatMap(page => page) || []}
      subcategories={categories.GADGETS}
      selectedSubcategory={subcategory}
      onSubcategoryChange={(sub) => setSubcategory(sub as typeof subcategory)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <ProductGrids />
        <div className="lg:col-span-4">
          <BlogSidebar />
        </div>
      </div>
    </CategoryPageLayout>
  );
}

function convertJsonToRecord(json: Json | null): Record<string, any> | null {
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
