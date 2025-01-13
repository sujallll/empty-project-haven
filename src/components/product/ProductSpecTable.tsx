import { Separator } from "@/components/ui/separator";

interface SpecificationItemProps {
  label: string;
  value: string | number | boolean | string[] | null | undefined;
}

function SpecificationItem({ label, value }: SpecificationItemProps) {
  if (value === null || value === undefined) return null;
  
  // Handle boolean values
  if (typeof value === 'boolean') {
    value = value ? 'Yes' : 'No';
  }

  // Handle array values
  if (Array.isArray(value)) {
    value = value.join(', ');
  }

  return (
    <div className="flex justify-between py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

interface SpecificationGroup {
  title: string;
  specs: { label: string; value: string | number | boolean | string[] | null | undefined }[];
}

interface ProductSpecTableProps {
  specifications: SpecificationGroup[];
}

export function ProductSpecTable({ specifications }: ProductSpecTableProps) {
  return (
    <div className="w-full rounded-md border p-4">
      <div className="space-y-6">
        {specifications.map((group, index) => (
          <div key={index}>
            <h3 className="font-semibold mb-2">{group.title}</h3>
            <div className="space-y-2">
              {group.specs.map((spec, specIndex) => (
                <SpecificationItem key={specIndex} {...spec} />
              ))}
            </div>
            {index < specifications.length - 1 && <Separator className="my-4" />}
          </div>
        ))}
      </div>
    </div>
  );
}