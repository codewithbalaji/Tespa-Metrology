import { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface Product {
  _id: string;
  name: string;
  model: string;
  company: string;
  category: string;
  price: number;
  image: string[];
  stock: number;
}

interface ListProps {
  token: string;
}

const List = ({ token }: ListProps) => {

    const [list, setList] = useState<Product[]>([])
    const [filteredList, setFilteredList] = useState<Product[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCompany, setSelectedCompany] = useState('All')
    const navigate = useNavigate()

    const companies = ['All', 'Tespa', 'Inprocess Gauging', 'Sylvac', 'SCANOLOGY']

    const fetchList = async () =>{
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.products) {
                setList(response.data.products)
                setFilteredList(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error((error as Error).message)
        }
    }

    const applyFilters = () => {
        let filtered = [...list]

        // Filter by search query (name or model)
        if (searchQuery.trim()) {
            filtered = filtered.filter(product => 
                product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.model?.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Filter by company
        if (selectedCompany !== 'All') {
            filtered = filtered.filter(product => product.company === selectedCompany)
        }

        setFilteredList(filtered)
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

    useEffect(()=>{
        fetchList()
    }, [])

    useEffect(() => {
        applyFilters()
    }, [searchQuery, selectedCompany, list])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">All Products List</h2>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-muted rounded-md">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full md:w-64">
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {companies.map((company) => (
              <option key={company} value={company}>
                {company === 'All' ? 'All Companies' : company}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-md border">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_2fr_2fr_2fr] items-center p-4 bg-muted">
          <div className="font-medium">Image</div>
          <div className="font-medium">Name</div>
          <div className="font-medium">Model</div>
          <div className="font-medium">Company</div>
          <div className="font-medium text-center">Action</div>
        </div>

        {/* Table Body */}
        <div className="divide-y">
          {filteredList.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[1fr_2fr_2fr_2fr_2fr] items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-center">
                <img
                  className="h-12 w-12 rounded-md object-cover"
                  src={item.image[0]}
                  alt={item.name || item.model}
                />
              </div>
              <div className="font-medium">{item.name || '-'}</div>
              <div className="text-muted-foreground">{item.model}</div>
              <div className="hidden md:block">{item.company || '-'}</div>
              <div className="flex justify-end md:justify-center gap-2">
                <button
                  onClick={() => navigate(`/edit/${item._id}`)}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
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

          {filteredList.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              {searchQuery || selectedCompany !== 'All' 
                ? 'No products match your filters' 
                : 'No products found'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default List
