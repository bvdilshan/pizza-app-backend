import { useEffect, useState, useMemo } from 'react';
import API from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Menu = () => {
    const { addToCart } = useCart();
    const [pizzas, setPizzas] = useState([]);
    const [category, setCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    const categories = [
        { name: 'All', icon: 'fas fa-border-all' },
        { name: 'Veg', icon: 'fas fa-seedling' },
        { name: 'Meat', icon: 'fas fa-meat' },
        { name: 'Chicken', icon: 'fas fa-drumstick-bite' },
        { name: 'Seafood', icon: 'fas fa-fish' },
    ];

    /* Fetch Pizzas from API */
    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                setLoading(true);
                const { data } = await API.get('/menu'); 
                
                if (data.status === 'success') {
                    setPizzas(data.data);
                } else if (Array.isArray(data)) {
                    setPizzas(data);
                }
            } catch (err) {
                toast.error('Could not load the menu. Please try again.');
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPizzas();
    }, []);

    /* Add to Cart with Notification */
    const handleAddToCart = (pizza) => {
        addToCart(pizza);
        toast.success(`${pizza.name} added to basket`, {
            icon: '🍕',
            style: { borderRadius: '10px', background: '#333', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
        });
    };

    /* Memoized Filter Logic */
    const filteredPizzas = useMemo(() => {
        if (!pizzas) return [];
        if (category === 'All') return pizzas;
        return pizzas.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }, [category, pizzas]);

    /* Loading State UI */
    if (loading) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-black text-xs uppercase tracking-[0.2em] text-gray-400">Loading Menu</p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-dark-base leading-none">
                        Fresh <span className="text-primary">Selection</span>
                    </h1>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-3">Handcrafted pizzas for every craving</p>
                </div>
                
                {/* Mobile Responsive Filter Buttons */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setCategory(cat.name)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
                                category === cat.name 
                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105' 
                                : 'bg-white border-gray-100 text-gray-400 hover:border-primary/30 hover:text-primary'
                            }`}
                        >
                            <i className={`${cat.icon} text-sm`}></i> {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Pizza Grid Layout */}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {filteredPizzas.length > 0 ? (
                    filteredPizzas.map(pizza => (
                        <div key={pizza._id} className="group bg-white rounded-[2.5rem] p-4 shadow-xl shadow-gray-200/40 border border-gray-50 flex flex-col transition-all duration-500 hover:-translate-y-2">
                            
                            {/* Pizza Image Container */}
                            <div className="relative h-56 rounded-[2rem] overflow-hidden mb-5">
                                <img 
                                    src={pizza.image || '/pizzas/default-pizza.jpg'} 
                                    alt={pizza.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                                    <span className="text-[10px] font-black text-primary uppercase">{pizza.category}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-2 flex-grow">
                                <h3 className="font-black text-xl text-dark-base uppercase tracking-tighter leading-tight mb-2 group-hover:text-primary transition-colors italic">
                                    {pizza.name}
                                </h3>
                                <p className="text-gray-400 text-[11px] font-medium leading-relaxed line-clamp-2 h-8">
                                    {pizza.description}
                                </p>
                            </div>
                            
                            {/* Price & Action */}
                            <div className="flex justify-between items-center bg-gray-50 p-2 rounded-[1.5rem] mt-6 border border-gray-100 group-hover:bg-primary/5 transition-colors">
                                <div className="pl-3">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter leading-none">Price</p>
                                    <span className="font-black text-lg text-dark-base italic tracking-tighter">Rs. {pizza.price}</span>
                                </div>
                                <button 
                                    onClick={() => handleAddToCart(pizza)}
                                    className="bg-dark-base hover:bg-primary text-white w-12 h-12 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center active:scale-90"
                                >
                                    <i className="fas fa-plus text-sm"></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-24 text-center">
                        <i className="fas fa-search text-4xl text-gray-100 mb-4"></i>
                        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No items found in this section</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;