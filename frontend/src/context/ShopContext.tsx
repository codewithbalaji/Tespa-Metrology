import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios"

// Define the shape of our context
interface ShopContextType {
    products: any[];
    currency: string;
    delivery_fee: number;
    search: string;
    setSearch: (search: string) => void;
    showSearch: boolean;
    setShowSearch: (show: boolean) => void;
    cartItems: Record<string, number>;
    addToCart: (itemId: string, quantity?: number) => Promise<void>;
    setCartItem: (cartItems: Record<string, number>) => void;
    setCartItems: (cartItems: Record<string, number>) => void;
    getCartCount: () => number;
    updateQuantity: (itemId: string, quantity: number) => Promise<void>;
    getCartAmount: () => number;
    navigate: ReturnType<typeof useNavigate>;
    backendUrl: string;
    setToken: (token: string) => void;
    token: string;
    getCartItems: () => any[];
    isIndianUser: boolean;
}

// Create context with default values
export const ShopContext = createContext<ShopContextType>({} as ShopContextType);

// Define props type for the provider
interface ShopContextProviderProps {
    children: React.ReactNode;
}

const ShopContextProvider = (props: ShopContextProviderProps) => {
    
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL as string;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch]= useState(false);
    const [cartItems, setCartItem] = useState<Record<string, number>>({});
    const [products, setProducts] = useState<any[]>([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const [isIndianUser, setIsIndianUser] = useState(false)

    const addToCart = async (itemId: string, quantity = 1) => {
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId] += quantity;
        }
        else{
            cartData[itemId] = quantity;
        }
        
        setCartItem(cartData);
        toast.success('Item Added to Cart')

        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/add', {
                    itemId, 
                    quantity
                }, {
                    headers: {token}
                });
            } catch (error) {
                console.log(error)
                toast.error((error as Error).message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        Object.values(cartItems).forEach(quantity => {
            if (quantity > 0) {
                totalCount += quantity;
            }
        });
        return totalCount;
    }

    const updateQuantity = async (itemId: string, quantity: number) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItem(cartData)

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', {
                    itemId, 
                    quantity
                }, {
                    headers: {token}
                });
            } catch (error) {
                console.log(error)
                toast.error((error as Error).message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const itemId in cartItems){
            let itemInfo = products.find((product)=>product._id === itemId);
            if (itemInfo && cartItems[itemId] > 0) {
                totalAmount += itemInfo.price * cartItems[itemId];
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error((error as Error).message)
        }
    }

    const getUserCart = async (token: string) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers:{token}})

            if (response.data.success) {
                const normalizedCart: Record<string, number> = {};
                Object.entries(response.data.cartData).forEach(([key, value]) => {
                    normalizedCart[key] = typeof value === 'number' ? value : 
                                        (typeof value === 'object' ? Object.values(value)[0] || 0 : 0);
                });
                setCartItem(normalizedCart);
            }
        } catch (error) {
            console.log(error)
            toast.error((error as Error).message)
        }
    }

    const getCartItems = () => {
        const items = [];
        for(const itemId in cartItems) {
            const product = products.find(p => p._id === itemId);
            if (product && cartItems[itemId] > 0) {
                items.push({
                    _id: itemId,
                    name: product.name,
                    price: product.price,
                    image: product.image[0],
                    quantity: cartItems[itemId]
                });
            }
        }
        return items;
    }

    const setCartItems = setCartItem

    useEffect(()=>{
        getProductsData()
    }, [])

    useEffect(()=>{
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token') || '');
            getUserCart(localStorage.getItem('token') || '');
        }
    }, [])

    useEffect(() => {
        // Detect user country using ipapi.co
        fetch('https://ipapi.co/json/')
          .then(res => res.json())
          .then(data => {
            if (data && data.country_code === 'IN') {
              setIsIndianUser(true)
            } else {
              setIsIndianUser(false)
            }
          })
          .catch(() => setIsIndianUser(false))
    }, [])

    const value: ShopContextType = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItem, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token, getCartItems,
        isIndianUser
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;

