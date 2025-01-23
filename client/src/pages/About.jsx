import { motion } from 'framer-motion';
import { FaShippingFast, FaBoxOpen, FaUndo, FaMapPin, FaExclamationTriangle, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const About = () => {
    const shippingPolicies = [
        { icon: <FaShippingFast/>, title: "Fast Processing", content: "Orders ship within 2-5 business days including weekends & holidays" },
        { icon: <FaBoxOpen/>, title: "Free Shipping", content: "We offer complimentary standard shipping on all orders" },
        { icon: <FaUndo/>, title: "Easy Returns", content: "3-day return window for unused items in original packaging" },
        { icon: <FaMapPin/>, title: "Address Verification", content: "Please verify shipping details to avoid delivery delays" },
        { icon: <FaExclamationTriangle/>, title: "Damage Protection", content: "Full coverage for items damaged during transit" }
    ];

    const contactInfo = [
        { icon: <FaEnvelope/>, info: "Feldioshop@gmail.com" },
        { icon: <FaPhone/>, info: "+91 6385673493" },
        { icon: <FaPhone/>, info: "+91 63696 32751" },
        { icon: <FaMapMarkerAlt/>, info: "Car street, Madhuranthakam, chengalpattu, chennai, 603306" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
            <motion.section 
                className="py-24 text-center bg-red-600 text-white"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <motion.h1 
                    className="text-6xl font-bold mb-8"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Welcome to Feldio
                </motion.h1>
                <p className="text-xl max-w-3xl mx-auto px-6">
                    Your premier destination for trending products and innovative solutions. 
                    We curate the latest in technology, fashion, and lifestyle to bring you 
                    tomorrow's must-haves, today.
                </p>
            </motion.section>

            <section className="py-16 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 text-red-600">Shipping & Policies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {shippingPolicies.map((policy, index) => (
                            <motion.div
                                key={index}
                                className="bg-red-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
                                whileHover={{ y: -10 }}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="text-3xl text-red-600 mb-4">{policy.icon}</div>
                                <h3 className="text-xl font-bold mb-3 text-red-600">{policy.title}</h3>
                                <p className="text-gray-700">{policy.content}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <motion.section 
                className="py-16 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-8">Why Choose Feldio?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-red-800/50 rounded-lg">
                            <h3 className="text-xl font-bold mb-3">Quality First</h3>
                            <p>Authentic products sourced from trusted global suppliers</p>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-red-800/50 rounded-lg">
                            <h3 className="text-xl font-bold mb-3">Trending Selection</h3>
                            <p>Curated collection of latest market innovations</p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 text-red-600">Get in Touch</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {contactInfo.map((contact, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-lg"
                                whileHover={{ scale: 1.02 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <span className="text-2xl text-red-600">{contact.icon}</span>
                                <span className="text-gray-700 font-medium">{contact.info}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;