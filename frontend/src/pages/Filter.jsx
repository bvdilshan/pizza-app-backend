/**
 * @file Filter.jsx
 * @description Filter component for Menu page to filter pizzas by category and style.
 */
import React from 'react';

const Filter = ({ categories, activeCategory, setCategory, activeStyle, setStyle, showCustomizable, setShowCustomizable }) => {

    const pizzaStyles = [
        { id: 'All', name: "All Styles" },
        { id: 'Pan Pizza', name: "Pan Pizza" },
        { id: 'Thin ‘N Crispy', name: "Thin ‘N Crispy" },
        { id: 'Stuffed Crust', name: "Stuffed Crust" },
        { id: 'Cheese Lovers', name: "Cheese Lovers" },
        { id: 'Supreme', name: "Supreme" },
        { id: 'BBQ Chicken', name: "BBQ Chicken" },
        { id: 'Veggie Lovers', name: "Veggie Lovers" },
        { id: 'Hawaiian', name: "Hawaiian" },
    ];

    return (
        <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Category</span>
                <div className="flex flex-wrap lg:flex-col gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setCategory(cat.name)}
                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 flex-grow lg:flex-grow-0 ${activeCategory === cat.name
                                ? 'bg-dark-base text-white shadow-lg translate-x-1'
                                : 'bg-white text-gray-400 border border-gray-100 hover:text-dark-base'
                                }`}
                        >
                            <i className={`${cat.icon} text-xs ${activeCategory === cat.name ? 'text-primary' : ''}`}></i>
                            <span className="font-black text-[10px] uppercase tracking-widest">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Pizza Style</span>
                <div className="flex flex-wrap gap-2">
                    {pizzaStyles.map((style) => (
                        <button
                            key={style.id}
                            onClick={() => setStyle(style.id)}
                            className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 border ${activeStyle === style.id
                                ? 'bg-primary border-primary text-white shadow-md'
                                : 'bg-white border-gray-100 text-gray-400 hover:border-primary/50 hover:text-dark-base'
                                }`}
                        >
                            {style.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-gray-100 flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-dark-base italic leading-tight">Customizable</span>
                    <span className="text-[8px] font-bold text-gray-400 uppercase">Design Your Own</span>
                </div>
                <button
                    onClick={() => setShowCustomizable(!showCustomizable)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showCustomizable ? 'bg-primary' : 'bg-gray-200'
                        }`}
                >
                    <span className={`${showCustomizable ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm`} />
                </button>
            </div>
        </div>
    );
};

export default Filter;