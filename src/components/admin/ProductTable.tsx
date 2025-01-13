import { MobileProduct, LaptopProduct } from "@/types/product";

export interface ProductTableProps {
  products: (MobileProduct | LaptopProduct)[];
  onView?: (product: MobileProduct | LaptopProduct) => void;
  onEdit?: (product: MobileProduct | LaptopProduct) => void;
  onAddReview?: (product: MobileProduct | LaptopProduct) => void;
  onDelete: (id: string) => Promise<void>;
}

export function ProductTable({ products, onView, onEdit, onAddReview, onDelete }: ProductTableProps) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Product Name
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Brand
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Price
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {products.map((product) => (
          <tr key={product.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{product.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{product.brand}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">₹{product.price}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onClick={() => onView?.(product)} className="text-indigo-600 hover:text-indigo-900">
                View
              </button>
              <button onClick={() => onEdit?.(product)} className="text-indigo-600 hover:text-indigo-900 ml-4">
                Edit
              </button>
              <button onClick={() => onAddReview?.(product)} className="text-indigo-600 hover:text-indigo-900 ml-4">
                Add Review
              </button>
              <button onClick={() => onDelete(product.id)} className="text-red-600 hover:text-red-900 ml-4">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
