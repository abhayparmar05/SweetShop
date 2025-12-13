import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const HomePage: FC = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    return (
        <div className="min-h-screen flex flex-col bg-cream-50">
            <Header />

            {/* Hero Section */}
            <section className="relative overflow-hidden py-12 md:py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-center lg:text-left z-10">
                            <h1 className="heading-1 mb-6 text-royal-900">
                                <span className="gradient-text">Celebrate with</span>
                                <br />
                                <span className="text-saffron-600">Delicious Sweets!</span>
                            </h1>
                            <p className="text-body text-royal-800/80 mb-8 max-w-lg mx-auto lg:mx-0">
                                Experience the rich heritage of Indian sweets. Handcrafted with pure ghee, premium dry fruits, and lots of love.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                {isAuthenticated ? (
                                    <Link to="/shop" className="btn-primary px-8 py-4 shadow-xl hover:shadow-2xl">
                                        Order Sweet Box
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/register" className="btn-primary px-8 py-4 shadow-xl hover:shadow-2xl">
                                            Start Ordering
                                        </Link>
                                        <Link to="/login" className="btn-secondary px-8 py-4">
                                            Sign In
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Right Image - Premium Design */}
                        <div className="hidden lg:block relative z-10">
                            <div className="relative">
                                {/* Main Image Container with Multiple Layers */}
                                <div className="relative group">
                                    {/* Animated gradient background */}
                                    <div className="absolute -inset-4 bg-gradient-to-br from-saffron-400 via-rose-400 to-royal-500 rounded-[2.5rem] blur-3xl opacity-40 group-hover:opacity-60 transition-all duration-700 animate-pulse"></div>

                                    {/* Main Image */}
                                    <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-royal-900/40 via-transparent to-saffron-500/30 z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                                        <img
                                            src="/static/first.jpg"
                                            alt="Delicious Traditional Indian Sweets"
                                            className="relative w-full max-w-lg h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />

                                        {/* Decorative border */}
                                        <div className="absolute inset-0 rounded-[2rem] border-4 border-white/20 z-20 pointer-events-none"></div>
                                    </div>

                                    {/* Floating Badge - Top Right */}
                                    <div className="absolute -top-4 -right-4 z-30 transform rotate-12 group-hover:rotate-6 transition-transform duration-500">
                                        <div className="bg-gradient-to-br from-saffron-500 to-saffron-600 text-white px-6 py-3 rounded-2xl shadow-2xl border-4 border-white">
                                            <div className="text-center">
                                                <div className="heading-3">100%</div>
                                                <div className="text-tiny font-semibold uppercase tracking-wide">Pure Ghee</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Badge - Bottom Left */}
                                    <div className="absolute -bottom-3 -left-3 z-30 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                                        <div className="bg-gradient-to-br from-royal-600 to-royal-700 text-white px-5 py-3 rounded-xl shadow-2xl border-4 border-white">
                                            <div className="flex items-center gap-2">
                                                <div className="text-3xl">⭐</div>
                                                <div>
                                                    <div className="heading-4 leading-none">Premium</div>
                                                    <div className="text-tiny font-medium opacity-90">Quality</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Mini Card - Top Left */}
                                    <div className="absolute -top-6 -left-6 z-20 transform group-hover:-translate-y-2 transition-transform duration-500">
                                        <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 flex items-center justify-center text-2xl shadow-lg">
                                                    🎉
                                                </div>
                                                <div>
                                                    <div className="text-small font-bold text-royal-900">Fresh Daily</div>
                                                    <div className="text-tiny text-gray-600">Since 2000</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative dots pattern */}
                                    <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-20 pointer-events-none">
                                        <div className="grid grid-cols-4 gap-3">
                                            {[...Array(16)].map((_, i) => (
                                                <div key={i} className="w-2 h-2 rounded-full bg-saffron-500"></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-saffron-100 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none"></div>
            </section>

            {/* Featured Sweets Gallery Section */}
            <section className="py-12 md:py-20 px-4 relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-saffron-100 rounded-full blur-3xl opacity-30 -z-10"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-30 -z-10"></div>

                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="text-saffron-600 font-bold tracking-wider uppercase text-small mb-2 block animate-pulse">Premium Selection</span>
                        <h2 className="heading-2 text-royal-900 mb-4">
                            Our <span className="gradient-text">Royal Collection</span>
                        </h2>
                        <p className="text-body text-gray-600 max-w-2xl mx-auto">
                            India's finest sweets, handcrafted with heritage and heart.
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-saffron-400 via-royal-400 to-rose-400 mx-auto rounded-full mt-4"></div>
                    </div>

                    {/* Grid of Sweets */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {/* Kaju Katli */}
                        <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div className="relative h-64 md:h-80 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-saffron-600/20 to-royal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                                <img
                                    src="/static/kajukatri.jpg"
                                    alt="Premium Kaju Katli - The King of Indian Sweets"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-2"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-royal-900/90 via-royal-900/40 to-transparent flex items-end p-6 z-20">
                                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="inline-block bg-saffron-500 text-white text-tiny font-bold px-3 py-1 rounded-full mb-2 shadow-lg">
                                            Premium
                                        </span>
                                        <h4 className="heading-3 text-white drop-shadow-lg">
                                            Kaju Katli
                                        </h4>
                                        <p className="text-white/80 text-small mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            The crown jewel of Indian sweets - pure cashew perfection
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Second Sweet */}
                        <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div className="relative h-64 md:h-80 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-rose-600/20 to-saffron-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                                <img
                                    src="/static/second.jpg"
                                    alt="Premium Sweet Collection"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-2"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-royal-900/90 via-royal-900/40 to-transparent flex items-end p-6 z-20">
                                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="inline-block bg-rose-500 text-white text-tiny font-bold px-3 py-1 rounded-full mb-2 shadow-lg">
                                            Premium
                                        </span>
                                        <h4 className="heading-3 text-white drop-shadow-lg">
                                            Festive Specials
                                        </h4>
                                        <p className="text-white/80 text-small mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            Celebrate every moment with sweetness
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Third Sweet */}
                        <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div className="relative h-64 md:h-80 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-royal-600/20 to-pistachio-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                                <img
                                    src="/static/third.jpg"
                                    alt="Artisan Sweet Creations"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-2"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-royal-900/90 via-royal-900/40 to-transparent flex items-end p-6 z-20">
                                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="inline-block bg-pistachio-500 text-white text-tiny font-bold px-3 py-1 rounded-full mb-2 shadow-lg">
                                            Artisan
                                        </span>
                                        <h4 className="heading-3 text-white drop-shadow-lg">
                                            Handcrafted Joy
                                        </h4>
                                        <p className="text-white/80 text-small mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            Each piece made with love and expertise
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-12 md:mt-16 text-center">
                        <Link
                            to={isAuthenticated ? "/shop" : "/register"}
                            className="inline-block bg-gradient-to-r from-saffron-500 to-royal-500 text-white font-bold heading-4 px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-b-4 border-royal-700"
                        >
                            {isAuthenticated ? "Explore Our Collection" : "Start Your Sweet Journey"}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 px-4 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-saffron-600 font-bold tracking-wider uppercase text-small mb-2 block">Our Promise</span>
                        <h2 className="heading-2 text-royal-900 mb-4">Why Sweet Shop?</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-saffron-400 to-royal-400 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {[
                            { title: 'Pure Ghee Quality', desc: 'We use only 100% pure desi ghee and premium dry fruits for that authentic taste that melts in your mouth.', color: 'saffron' },
                            { title: 'Fresh Delivery', desc: 'Delivered within 24 hours to ensure you get the freshest mithai possible, straight from our kitchen to your doorstep.', color: 'pistachio' },
                            { title: 'Festive Packing', desc: 'Beautiful, custom-designed boxes perfect for weddings, festivals, and corporate gifting needs.', color: 'rose' }
                        ].map((feature, idx) => (
                            <div key={idx} className={`group p-8 rounded-2xl bg-${feature.color}-50 border border-${feature.color}-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                                <h3 className="heading-3 mb-4 text-royal-900">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-body">
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
                        <span className="text-royal-600 font-bold tracking-wider uppercase text-small mb-2 block">Testimonials</span>
                        <h2 className="heading-2 text-royal-900 mb-4">What Our Customers Say</h2>
                        <p className="text-body text-gray-600 max-w-2xl mx-auto">Don't just take our word for it. Here is what our happy customers have to say.</p>
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
                                        <h4 className="font-bold heading-4 text-royal-900">{testimonial.name}</h4>
                                        <p className="text-saffron-600 text-small font-medium">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic text-body leading-relaxed relative z-10">
                                    {testimonial.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HomePage;
