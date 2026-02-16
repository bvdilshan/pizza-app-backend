/**
 * @file OffersNews.jsx
 * @description Component for displaying latest offers and promotions.
 */
import React from 'react';

const OffersNews = () => {
    const offers = [
        {
            id: 1,
            title: "Valentine's Special",
            subtitle: "DATE NIGHT BUNDLE",
            desc: "Two Medium Pan Pizzas, Garlic Bread, and 1.5L Coke. Perfect for your special someone.",
            code: "LOVE2026",
            expiry: "Valid until Feb 28",
            color: "bg-red-600",
            icon: "fas fa-heart",
            featured: true
        },
        {
            id: 2,
            title: "Month End Crave",
            subtitle: "30% FLAT OFF",
            desc: "Fuel your hustle! Get a massive discount on all large thin-crust pizzas.",
            code: "FINISH26",
            expiry: "Last 3 days of month",
            color: "bg-dark-base",
            icon: "fas fa-calendar-check",
            featured: false
        },
        {
            id: 3,
            title: "Mid-Week Madness",
            subtitle: "BUY 1 GET 1 FREE",
            desc: "Every Wednesday. Buy any Large Pizza and get a Medium Pan Pizza absolutely free.",
            code: "FREEBIE",
            expiry: "Wednesdays only",
            color: "bg-primary",
            icon: "fas fa-bolt",
            featured: false
        }
    ];

    return (
        <section className="relative py-24 bg-gray-50 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-poppins font-black text-dark-base italic uppercase tracking-tighter">
                            Exclusive <span className="text-primary">Offers</span>
                        </h2>
                        <div className="h-1.5 w-20 bg-primary mt-4 rounded-full"></div>
                    </div>
                    <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-4 md:mt-0">
                        Limited Time Promotions
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {offers.map((offer) => (
                        <div
                            key={offer.id}
                            className={`${offer.featured ? 'lg:col-span-2' : 'lg:col-span-1'} 
                            relative group overflow-hidden rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl transition-all duration-500 hover:scale-[1.01] ${offer.color}`}
                        >
                            <div className="absolute -bottom-10 -right-10 opacity-10 text-[12rem] md:text-[18rem] transform group-hover:rotate-12 transition-transform duration-700">
                                <i className={offer.icon}></i>
                            </div>

                            <div className="relative z-10 h-full flex flex-col">
                                <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase w-fit mb-6">
                                    {offer.subtitle}
                                </span>

                                <h3 className={`font-poppins font-black italic uppercase tracking-tighter mb-4 ${offer.featured ? 'text-4xl md:text-6xl' : 'text-3xl'}`}>
                                    {offer.title}
                                </h3>

                                <p className="text-white/80 font-medium text-sm md:text-base max-w-md leading-loose mb-8">
                                    {offer.desc}
                                </p>

                                <div className="mt-auto flex flex-wrap items-center gap-6">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Use Code</p>
                                        <div className="bg-white text-dark-base px-6 py-2 rounded-xl font-black text-sm tracking-widest border-2 border-dashed border-dark-base/20">
                                            {offer.code}
                                        </div>
                                    </div>

                                    <button className="bg-white/10 hover:bg-white hover:text-dark-base backdrop-blur-sm border border-white/20 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
                                        Claim Offer
                                    </button>
                                </div>

                                <p className="mt-8 text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold">
                                    * {offer.expiry}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OffersNews;