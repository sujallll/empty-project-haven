import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductImageProps {
  url: string;
  onRemove?: () => void;
  className?: string;
}

export function ProductImage({ url, onRemove, className }: ProductImageProps) {
  return (
    <div className={cn("relative group", className)}>
      <img
        src={url}
        alt="Product"
        className="w-full h-full object-cover rounded-lg"
      />
      {onRemove && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}