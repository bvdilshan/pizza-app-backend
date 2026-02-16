/**
 * @file Home.jsx
 * @description Homepage component featuring a hero slider, signature styles, and promotional sections.
 */
import { useEffect, useState, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import OffersNews from './OffersNews';

const Home = () => {
    const { addToCart } = useCart();
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { url: '/slider/s1.jpg', title: 'CRISPY, HOT & DELICIOUS!', sub: 'EXPERIENCE AUTHENTIC SRI LANKAN TASTE.' },
        { url: '/slider/s2.jpg', title: 'CHEESY OVERLOAD!', sub: 'CRAFTED WITH THE FINEST MOZZARELLA IN TOWN.' },
        { url: '/slider/s3.jpg', title: 'FRESH TOPPINGS!', sub: 'LOCALLY SOURCED INGREDIENTS AT YOUR DOORSTEP.' }
    ];

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 6000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);

    const pizzaStyles = [
        { id: 1, name: "Pan Pizza", desc: "Our signature thick crust, featuring a soft center and a golden, crispy exterior.", icon: "fas fa-layer-group" },
        { id: 2, name: "Thin ‘N Crispy", desc: "A lighter, crunchier option for those who prefer a delicate base.", icon: "fas fa-Utensils" },
        { id: 3, name: "Stuffed Crust", desc: "The ultimate indulgence featuring a crust filled with premium melted mozzarella.", icon: "fas fa-circle-notch" },
        { id: 4, name: "Cheese Lovers", desc: "A decadent combination of imported mozzarella and specialty cheeses.", icon: "fas fa-cheese" },
        { id: 5, name: "Supreme", desc: "A masterclass in flavor, generously loaded with fresh vegetables and meats.", icon: "fas fa-crown" },
        { id: 6, name: "BBQ Chicken", desc: "Smoky barbecue sauce paired with tender grilled chicken and red onions.", icon: "fas fa-fire" },
        { id: 7, name: "Veggie Lovers", desc: "A vibrant selection of garden-fresh mushrooms, capsicums, and olives.", icon: "fas fa-leaf" },
        { id: 8, name: "Hawaiian", desc: "A sophisticated balance of savory ham and sweet pineapple.", icon: "fas fa-sun" },
    ];

    return (
        <div className="min-h-screen bg-white">
            <section className="relative h-screen min-h-[700px] overflow-hidden bg-black">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

                        <img
                            src={slide.url}
                            alt="Slider"
                            className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'}`}
                        />

                        <div className="absolute inset-0 z-20 flex items-center px-6 md:px-20">
                            <div className="max-w-4xl">
                                <span className={`block overflow-hidden mb-4`}>
                                    <span className={`block text-primary font-black tracking-[0.4em] text-xs md:text-sm transition-all duration-700 delay-300 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                                        PREMIUM PIZZA EXPERIENCE
                                    </span>
                                </span>

                                <h1 className={`text-5xl md:text-8xl font-poppins font-black text-white italic leading-[0.9] uppercase tracking-tighter transition-all duration-1000 delay-500 transform ${index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                                    {slide.title.split(' ')[0]} <br />
                                    <span className="text-primary">{slide.title.split(' ').slice(1).join(' ')}</span>
                                </h1>

                                <p className={`mt-8 text-gray-300 font-medium text-sm md:text-lg max-w-xl tracking-wide leading-relaxed transition-all duration-1000 delay-700 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                    {slide.sub}
                                </p>

                                <div className={`mt-10 transition-all duration-1000 delay-1000 transform ${index === currentSlide ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                                    <a href="/menu" className="bg-primary hover:bg-white hover:text-dark-base text-white font-black px-12 py-5 rounded-full transition-all shadow-2xl active:scale-95 text-xs uppercase tracking-widest inline-flex items-center gap-3">
                                        Order Now <i className="fas fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
                    <div
                        key={currentSlide}
                        className="h-full bg-primary animate-progress"
                        style={{ animationDuration: '6000ms' }}
                    />
                </div>

                <div className="absolute right-10 bottom-10 z-30 hidden md:flex items-center gap-4">
                    <button onClick={prevSlide} className="w-14 h-14 rounded-full border border-white/20 text-white hover:bg-primary hover:border-primary transition-all flex items-center justify-center">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <div className="text-white font-black italic tracking-tighter text-2xl">
                        0{currentSlide + 1} <span className="text-white/30 text-lg">/ 0{slides.length}</span>
                    </div>
                    <button onClick={nextSlide} className="w-14 h-14 rounded-full border border-white/20 text-white hover:bg-primary hover:border-primary transition-all flex items-center justify-center">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </section>

            <section className="max-w-7xl mx-auto py-24 px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-poppins font-black text-dark-base italic uppercase tracking-tighter">
                        Our Signature <span className="text-primary">Styles</span>
                    </h2>
                    <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pizzaStyles.map((item) => (
                        <div key={item.id} className="group bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl hover:border-primary/20">
                            <div className="w-16 h-16 bg-gray-50 text-primary rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                <i className={item.icon}></i>
                            </div>
                            <h3 className="text-lg font-black text-dark-base uppercase tracking-tight mb-4">{item.name}</h3>
                            <p className="text-gray-500 text-xs font-medium leading-loose">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <OffersNews />

                <div className="mt-24">
                    <div className="bg-dark-base rounded-[2.5rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl flex flex-col items-center text-center">
                        <div className="absolute -bottom-10 -right-10 opacity-5 text-[20rem] pointer-events-none">
                            <i className="fas fa-pizza-slice"></i>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-6">
                            Tailored to Your <span className="text-primary">Taste</span>
                        </h3>
                        <p className="text-gray-400 max-w-2xl mx-auto font-medium text-sm md:text-base leading-relaxed">
                            Looking for something specific? Our chefs are ready to create a masterpiece based on your unique topping preferences.
                        </p>
                        <button className="mt-12 bg-primary hover:bg-white hover:text-dark-base text-white font-black px-14 py-5 rounded-full transition-all shadow-xl text-xs uppercase tracking-[0.2em] z-10">
                            Customize Your Order
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;