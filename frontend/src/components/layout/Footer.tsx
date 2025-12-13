import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { SiSublimetext } from 'react-icons/si';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Footer: FC = () => {
    return (
        <footer className="bg-gray-800 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-6 select-none">
                            <span className="text-4xl text-saffron-400"><SiSublimetext /></span>
                            <span className="heading-3 text-saffron-400">
                                Sweet Shop
                            </span>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed text-small">
                            Celebrating the authentic taste of India since 2000. Handcrafted sweets made with pure love and premium ingredients.
                        </p>
                        <div className="flex gap-4">
                            <a href="#facebook" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600 transition-colors duration-300" aria-label="Facebook">
                                <FaFacebook className="text-xl" />
                            </a>
                            <a href="#instagram" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-pink-600 transition-colors duration-300" aria-label="Instagram">
                                <FaInstagram className="text-xl" />
                            </a>
                            <a href="#twitter" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-400 transition-colors duration-300" aria-label="Twitter">
                                <FaTwitter className="text-xl" />
                            </a>
                            <a href="#youtube" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-red-600 transition-colors duration-300" aria-label="YouTube">
                                <FaYoutube className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="heading-4 mb-6 text-white">Quick Links</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-saffron-400 transition-colors text-small">Home</Link>
                            </li>
                            <li>
                                <Link to="/shop" className="text-gray-300 hover:text-saffron-400 transition-colors text-small">Our Sweets</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-300 hover:text-saffron-400 transition-colors text-small">Our Story</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-300 hover:text-saffron-400 transition-colors text-small">Contact Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="heading-4 mb-6 text-white">Popular Categories</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/shop?category=premium-dry-fruit" className="text-gray-300 hover:text-saffron-400 transition-colors text-small">Premium Dry Fruit</Link>
                            </li>
                            <li>
                                <Link to="/shop?category=regional-traditional" className="text-gray-300 hover:text-saffron-400 transition-colors text-small">Traditional Sweets</Link>
                            </li>
                            <li>
                                <Link to="/shop?category=chocolate" className="text-gray-300 hover:text-saffron-400 transition-colors text-small">Modern Fusions</Link>
                            </li>
                            <li>
                                <Link to="/shop?category=festival" className="text-gray-300 hover:text-saffron-400 transition-colors text-small">Festive Specials</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="heading-4 mb-6 text-white">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-300">
                                <FaMapMarkerAlt className="text-xl mt-1" />
                                <span className="text-small">Near Prahladnagar,<br />Ahmedabad, Gujarat</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <FaPhone className="text-xl" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <FaEnvelope className="text-xl" />
                                <span>hello@sweetshop.com</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <FaClock className="text-xl" />
                                <span>Mon - Sun: 9:00 AM - 10:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-small">
                    <p>&copy; {new Date().getFullYear()} Sweet Shop. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-saffron-400 transition-colors text-small">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-saffron-400 transition-colors text-small">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
