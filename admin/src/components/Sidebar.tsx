import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'
import { 
  LayoutDashboard, 
  PlusCircle, 
  ListOrdered,
  Package,
  Mail,
  Briefcase,
  FileText,
  Star,
  Newspaper
} from 'lucide-react'

const Sidebar = () => {
  return (
    <div className="pb-12 min-h-screen w-[max(20%,250px)] border-r">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Link
              to="/"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/add"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
              )}
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Product</span>
            </Link>
            <Link
              to="/list"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
              )}
            >
              <Package className="h-4 w-4" />
              <span>Products</span>
            </Link>
            <Link
              to="/orders"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
              )}
            >
              <ListOrdered className="h-4 w-4" />
              <span>Orders</span>
            </Link>
            <Link
              to="/enquiries"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
              )}
            >
              <Mail className="h-4 w-4" />
              <span>Enquiries</span>
            </Link>
            <Link
              to="/careers"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
              )}
            >
              <Briefcase className="h-4 w-4" />
              <span>Careers</span>
            </Link>
            <Link
              to="/applications"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
              )}
            >
              <FileText className="h-4 w-4" />
              <span>Applications</span>
            </Link>
            <Link
              to="/testimonial"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
              )}
            >
              <Star className="h-4 w-4" />
              <span>Testimonials</span>
            </Link>
            <Link
              to="/news"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
              )}
            >
              <Newspaper className="h-4 w-4" />
              <span>News</span>
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
