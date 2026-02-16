/**
 * @file Menu.jsx
 * @description Menu page displaying pizzas with filtering and cart functionality.
 */
import { useEffect, useState, useMemo } from 'react';
import API from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import Filter from './Filter';

const Menu = () => {
    const { addToCart } = useCart();
    const [pizzas, setPizzas] = useState([]);
    const [category, setCategory] = useState("All");
    const [style, setStyle] = useState("All");
    const [customizable, setCustomizable] = useState(false);
    const [loading, setLoading] = useState(true);

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const categories = [
        { name: 'All', icon: 'fas fa-th-large' },
        { name: 'Veg', icon: 'fas fa-leaf' },
        { name: 'Meat', icon: 'fas fa-fire' },
        { name: 'Chicken', icon: 'fas fa-drumstick-bite' },
        { name: 'Seafood', icon: 'fas fa-fish' },
    ];

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                setLoading(true);
                const { data } = await API.get('/menu');
                setPizzas(data.status === 'success' ? data.data : data);
            } catch (err) {
                toast.error('Could not load menu.');
            } finally {
                setLoading(false);
            }
        };
        fetchPizzas();
    }, []);

    const filteredPizzas = useMemo(() => {
        if (!pizzas) return [];
        return pizzas.filter(p => {
            if (category !== 'All' && p.category?.toLowerCase() !== category.toLowerCase()) return false;
            if (style !== 'All' && (!p.styles || !p.styles.includes(style))) return false;
            if (customizable && !p.isCustomizable) return false;
            return true;
        });
    }, [category, style, customizable, pizzas]);

    return (
        <div className="min-h-screen bg-[#fafafa] pt-32 pb-20">
            <div className="max-w-[1440px] mx-auto px-6">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                    <div>
                        <h1 className="text-6xl font-black text-dark-base italic tracking-tighter uppercase leading-none">
                            Our <span className="text-primary">Menu</span>
                        </h1>
                    </div>

                    <button
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="lg:hidden flex items-center gap-3 bg-dark-base text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl"
                    >
                        <i className="fas fa-sliders-h text-primary"></i>
                        Filters
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    <div className="flex-1 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                            {filteredPizzas.map(pizza => (
                                <div key={pizza._id} className="group">
                                    <div className="relative h-80 rounded-[3.5rem] overflow-hidden shadow-xl shadow-gray-200/50 mb-6">
                                        <img src={pizza.image || '/pizzas/default-pizza.jpg'} alt={pizza.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <button onClick={() => addToCart(pizza)} className="absolute bottom-8 right-8 bg-dark-base text-white w-14 h-14 rounded-2xl opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center hover:bg-primary">
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <div className="px-4">
                                        <h3 className="text-xl font-black text-dark-base uppercase italic tracking-tighter">{pizza.name}</h3>
                                        <span className="font-black text-primary italic">Rs.{pizza.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="hidden lg:block w-80 sticky top-32">
                        <Filter
                            categories={categories} activeCategory={category} setCategory={setCategory}
                            activeStyle={style} setStyle={setStyle}
                            showCustomizable={customizable} setShowCustomizable={setCustomizable}
                        />
                    </aside>

                </div>
            </div>

            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>

                    <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl p-8 overflow-y-auto animate-slide-in-right">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-xl font-black uppercase italic tracking-tighter">Filters</h2>
                            <button onClick={() => setIsMobileFilterOpen(false)} className="text-2xl text-dark-base">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <Filter
                            categories={categories} activeCategory={category} setCategory={setCategory}
                            activeStyle={style} setStyle={setStyle}
                            showCustomizable={customizable} setShowCustomizable={setCustomizable}
                        />

                        <button
                            onClick={() => setIsMobileFilterOpen(false)}
                            className="w-full mt-10 bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;