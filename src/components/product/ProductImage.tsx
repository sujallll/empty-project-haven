import { cn } from "@/lib/utils";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProductImage({ src, alt, className }: ProductImageProps) {
  return (
    <div className={cn("relative aspect-square", className)}>
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className="object-contain w-full h-full"
        loading="lazy"
      />
    </div>
  );
}