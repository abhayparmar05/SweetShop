import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { sweetsApi } from '../api/sweets.api';
import type { Sweet } from '../types/sweet.types';

// Extended interface for display purposes since backend model is simple
interface DisplaySweet extends Omit<Sweet, '_id'> {
    id: string;
    image: string;
    description: string;
}

const HomePage: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [featuredSweets, setFeaturedSweets] = useState<DisplaySweet[]>([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchSweets = async () => {
            try {
                const response = await sweetsApi.getAllSweets(1, 6);
                // Map API data to display format with placeholders for missing fields
                const mappedSweets: DisplaySweet[] = response.data.map((sweet) => ({
                    ...sweet,
                    id: sweet._id,
                    image: '',
                    description: `Delicious ${sweet.category} sweet - ${sweet.name}`,
                }));
                setFeaturedSweets(mappedSweets);
            } catch (error) {
                console.error('Failed to fetch sweets:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSweets();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-cream-50">
            <Header />

            {/* Hero Section */}
            <section className="relative overflow-hidden py-12 md:py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-center lg:text-left z-10">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-royal-900 leading-tight">
                                <span className="gradient-text">Celebrate with</span>
                                <br />
                                <span className="text-saffron-600">Delicious Sweets!</span>
                            </h1>
                            <p className="text-lg md:text-xl text-royal-800/80 mb-8 max-w-lg mx-auto lg:mx-0">
                                Experience the rich heritage of Indian sweets. Handcrafted with pure ghee, premium dry fruits, and lots of love.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                {isAuthenticated ? (
                                    <Link to="/dashboard" className="btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl">
                                        Order Sweet Box
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/register" className="btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl">
                                            Start Ordering
                                        </Link>
                                        <Link to="/login" className="btn-secondary text-lg px-8 py-4">
                                            Sign In
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>


                    </div>
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-saffron-100 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none"></div>
            </section>

            {/* Featured Sweets Section */}
            <section className="py-12 md:py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="text-saffron-600 font-bold tracking-wider uppercase text-sm mb-2 block">Premium Selection</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-royal-900 mb-4">Our Royal Collection</h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">From the streets of Kolkata to the palaces of Mysore, taste the diversity of India.</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-saffron-600"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {featuredSweets.map((sweet) => (
                                <div key={sweet.id} className="sweet-card p-6 md:p-8 group relative bg-white">
                                    <div className="absolute top-4 right-4 text-xs font-bold text-saffron-600 bg-saffron-50 px-2 py-1 rounded-full border border-saffron-100">
                                        {sweet.category}
                                    </div>
                                    <h3 className="text-2xl font-bold text-royal-900 mb-2 text-center">
                                        {sweet.name}
                                    </h3>
                                    <p className="text-gray-600 mb-6 text-center text-sm line-clamp-2">
                                        {sweet.description}
                                    </p>
                                    <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200">
                                        <span className="text-xl font-bold text-saffron-700">
                                            ₹{sweet.price}/kg
                                        </span>
                                        <button className="btn-primary text-sm px-4 py-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                            Add to Box
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 px-4 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-saffron-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Promise</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-royal-900 mb-4">Why Sweet Shop?</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-saffron-400 to-royal-400 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {[
                            { title: 'Pure Ghee Quality', desc: 'We use only 100% pure desi ghee and premium dry fruits for that authentic taste that melts in your mouth.', color: 'saffron' },
                            { title: 'Fresh Delivery', desc: 'Delivered within 24 hours to ensure you get the freshest mithai possible, straight from our kitchen to your doorstep.', color: 'pistachio' },
                            { title: 'Festive Packing', desc: 'Beautiful, custom-designed boxes perfect for weddings, festivals, and corporate gifting needs.', color: 'rose' }
                        ].map((feature, idx) => (
                            <div key={idx} className={`group p-8 rounded-2xl bg-${feature.color}-50 border border-${feature.color}-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                                <h3 className="text-2xl font-bold mb-4 text-royal-900">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 px-4 bg-gradient-to-b from-royal-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-royal-600 font-bold tracking-wider uppercase text-sm mb-2 block">Testimonials</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-royal-900 mb-4">What Our Customers Say</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Don't just take our word for it. Here is what our happy customers have to say.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Priya Sharma', role: 'Food Blogger', text: 'The Kaju Katli is simply the best I have ever had! It literally melts in your mouth.', initials: 'PS' },
                            { name: 'Rahul Verma', role: 'Regular Customer', text: 'Ordered 50 boxes for my wedding. The packaging was exquisite and everyone loved the sweets.', initials: 'RV' },
                            { name: 'Anita Desai', role: 'Home Maker', text: 'My kids love the Chocolate Barfi. It has become a tradition to order from Sweet Shop every Diwali.', initials: 'AD' }
                        ].map((testimonial, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative">
                                <div className="absolute top-8 right-8 text-royal-200 text-6xl font-serif leading-none">"</div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-saffron-400 to-royal-400 rounded-full flex items-center justify-center border-2 border-white shadow-md select-none pointer-events-none">
                                        <span className="text-white font-bold text-lg">{testimonial.initials}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-royal-900">{testimonial.name}</h4>
                                        <p className="text-saffron-600 text-sm font-medium">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic text-lg leading-relaxed relative z-10">
                                    {testimonial.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-saffron-600 to-royal-600 relative overflow-hidden">
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    {isAuthenticated ? (
                        <>
                            <h2 className="text-4xl font-bold text-white mb-6">
                                Ready for a Royal Treat?
                            </h2>
                            <p className="text-xl text-saffron-100 mb-10 max-w-2xl mx-auto">
                                Check out our latest festive collections and manage your orders from your dashboard!
                            </p>
                            <Link to="/dashboard" className="bg-white text-royal-700 font-bold px-10 py-4 rounded-xl hover:shadow-2xl hover:bg-saffron-50 transition-all inline-block text-lg border-b-4 border-royal-200">
                                Go to Dashboard
                            </Link>
                        </>
                    ) : (
                        <>
                            <h2 className="text-4xl font-bold text-white mb-6">
                                Bring Sweetness to Your Life
                            </h2>
                            <p className="text-xl text-saffron-100 mb-10 max-w-2xl mx-auto">
                                Join thousands of happy families who trust Sweet Shop for their celebrations.
                            </p>
                            <Link to="/register" className="bg-white text-royal-700 font-bold px-10 py-4 rounded-xl hover:shadow-2xl hover:bg-saffron-50 transition-all inline-block text-lg border-b-4 border-royal-200">
                                Order Now
                            </Link>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HomePage;
