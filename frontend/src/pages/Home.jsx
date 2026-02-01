import { useEffect, useState } from 'react';
import { fetchMenu } from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Home = () => {
    const { addToCart } = useCart();
    const [pizzas, setPizzas] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { url: '/slider/s1.jpg', title: 'CRISPY, HOT & DELICIOUS!', sub: 'Experience authentic Sri Lankan taste.' },
        { url: '/slider/s2.jpg', title: 'CHEESY OVERLOAD!', sub: 'The best mozzarella in town.' },
        { url: '/slider/s3.jpg', title: 'FRESH TOPPINGS!', sub: 'From farm to your doorstep.' }
    ];

    // Auto Slide Logic (Fade Effect)
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(slideInterval);
    }, [slides.length]);

    useEffect(() => {
        const getPizzas = async () => {
            try {
                const { data } = await fetchMenu();
                
                const latestPizzas = data.data.reverse().slice(0, 10);
                setPizzas(latestPizzas);
            } catch (err) {
                console.error("Error fetching menu:", err);
            }
        };
        getPizzas();
    }, []);

    const handleAddToCart = (pizza) => {
        addToCart(pizza);
        toast.success(`${pizza.name} added to basket!`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            
            {/* Hero Section with Fade Slider */}
            <section className="relative h-[500px] md:h-[650px] overflow-hidden bg-dark-base">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/50 z-10" />
                        <img src={slide.url} alt="Slider" className="w-full h-full object-cover" />
                        
                        {/* Content */}
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
                            <h1 className="text-4xl md:text-7xl font-poppins font-black text-white italic tracking-tighter leading-tight uppercase">
                                {slide.title.split(' ')[0]} <span className="text-primary">{slide.title.split(' ').slice(1).join(' ')}</span>
                            </h1>
                            <p className="text-gray-200 font-medium text-sm md:text-lg mt-4 max-w-xl uppercase tracking-widest">
                                {slide.sub}
                            </p>
                            <button className="mt-8 bg-primary hover:bg-dark-base text-white font-black px-10 py-4 rounded-full transition-all shadow-xl active:scale-95 text-xs uppercase tracking-widest">
                                Order Now <i className="fas fa-pizza-slice ml-2"></i>
                            </button>
                        </div>
                    </div>
                ))}
                
                {/* Dots Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                    {slides.map((_, i) => (
                        <button 
                            key={i} 
                            onClick={() => setCurrentSlide(i)}
                            className={`h-2 transition-all duration-500 rounded-full ${i === currentSlide ? 'bg-primary w-8' : 'bg-white/50 w-2'}`} 
                        />
                    ))}
                </div>
            </section>

            {/* Latest 10 Pizzas Section */}
            <section className="max-w-7xl mx-auto py-16 px-4">
                <div className="flex items-end justify-between mb-12 border-b-2 border-gray-100 pb-6">
                    <div>
                        <h2 className="text-3xl font-poppins font-black text-dark-base italic uppercase tracking-tighter">
                            New <span className="text-primary">Arrivals</span>
                        </h2>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Our latest handcrafted pizzas</p>
                    </div>
                    <a href="/menu" className="text-xs font-black text-primary uppercase border-b-2 border-primary hover:text-dark-base hover:border-dark-base transition-colors pb-1">View Full Menu</a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {pizzas.map((pizza) => (
                        <div key={pizza._id} className="group bg-white rounded-[2.5rem] p-4 shadow-xl shadow-gray-200/40 border border-gray-50 flex flex-col transition-all duration-500 hover:-translate-y-2">
                            <div className="h-52 rounded-[2rem] overflow-hidden relative mb-4">
                                <img 
                                    src={pizza.image || '/slider/s1.jpg'} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                    alt={pizza.name}
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-tighter italic">NEW</span>
                                </div>
                            </div>
                            
                            <div className="px-2 flex-grow">
                                <h3 className="text-lg font-black text-dark-base uppercase italic leading-tight group-hover:text-primary transition-colors">{pizza.name}</h3>
                                <p className="text-gray-400 text-[11px] font-medium mt-2 line-clamp-2">{pizza.description}</p>
                            </div>

                            <div className="flex justify-between items-center mt-6 bg-gray-50 p-2 rounded-2xl">
                                <span className="font-black text-lg text-dark-base italic ml-3">Rs. {pizza.price}</span>
                                <button 
                                    onClick={() => handleAddToCart(pizza)}
                                    className="bg-dark-base hover:bg-primary text-white w-10 h-10 rounded-xl transition-all shadow-lg flex items-center justify-center active:scale-90"
                                >
                                    <i className="fas fa-plus text-xs"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;