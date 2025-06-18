import { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface Product {
  _id: string;
  model: string;
  category: string;
  price: number;
  image: string[];
  stock: number;
}

interface EditingField {
  id: string;
  field: 'price' | 'stock';
  value: string;
}

interface ListProps {
  token: string;
}

const List = ({ token }: ListProps) => {

    const [list, setList] = useState<Product[]>([])
    const [editing, setEditing] = useState<EditingField | null>(null)
    const navigate = useNavigate()

    const fetchList = async () =>{
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.products) {
                setList(response.data.products)   
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error((error as Error).message)
        }
    }

    const removeProduct = async (id: string) => {
        try {
            const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers:{token}})
            if (response.data.success) {
                toast.success(response.data.message)
                await fetchList();
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error((error as Error).message)
        }
    }

    const updateField = async (id: string, field: 'price' | 'stock', value: string) => {
        try {
            if (!value || isNaN(Number(value)) || Number(value) < 0) {
                toast.error(`Please enter a valid ${field}`);
                return;
            }

            const response = await axios.post(
                backendUrl + '/api/product/update-field',
                { id, field, value: Number(value) },
                { headers: { token } }
            );
            
            if (response.data.success) {
                toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully`);
                await fetchList();
                setEditing(null);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error((error as Error).message);
        }
    };

    const EditableField = ({ item, field }: { item: Product, field: 'price' | 'stock' }) => {
        const isEditing = editing?.id === item._id && editing?.field === field;
        const value = item[field];

        return isEditing ? (
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    className="w-24 px-2 py-1 border rounded"
                    value={editing.value}
                    onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                    min="0"
                    step={field === 'price' ? '0.01' : '1'}
                />
                <button
                    onClick={() => updateField(item._id, field, editing.value)}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    ✓
                </button>
                <button
                    onClick={() => setEditing(null)}
                    className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    ✕
                </button>
            </div>
        ) : (
            <span
                onClick={() => setEditing({ id: item._id, field, value: value.toString() })}
                className="cursor-pointer hover:text-blue-500"
            >
                {field === 'price' ? `${currency}${value.toLocaleString()}` : value}
            </span>
        );
    };

    useEffect(()=>{
        fetchList()
    }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">All Products List</h2>
      <div className="rounded-md border">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center p-4 bg-muted">
          <div className="font-medium">Image</div>
          <div className="font-medium">Model</div>
          <div className="font-medium">Category</div>
          <div className="font-medium text-center">Price</div>
          <div className="font-medium text-center">Stock</div>
          <div className="font-medium text-center">Action</div>
        </div>

        {/* Table Body */}
        <div className="divide-y">
          {list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-center">
                <img
                  className="h-12 w-12 rounded-md object-cover"
                  src={item.image[0]}
                  alt={item.model}
                />
              </div>
              <div className="font-medium">{item.model}</div>
              <div className="text-muted-foreground">{item.category}</div>
              <div className="hidden md:flex justify-center items-center">
                <EditableField item={item} field="price" />
              </div>
              <div className="hidden md:flex justify-center items-center">
                <EditableField item={item} field="stock" />
              </div>
              <div className="flex justify-end md:justify-center gap-2">
                <button
                  onClick={() => navigate(`/edit/${item._id}`)}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeProduct(item._id)}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-destructive hover:bg-destructive/90 text-white cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {list.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              No products found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default List
