import { motion } from 'framer-motion';
import { FaUsers, FaStore, FaTruck, FaHeadset } from 'react-icons/fa';

const About = () => {
    const features = [
        {
            icon: <FaUsers className="text-4xl text-blue-500" />,
            title: "Customer First",
            description: "We prioritize customer satisfaction and experience above all else."
        },
        {
            icon: <FaStore className="text-4xl text-green-500" />,
            title: "Trending Products",
            description: "Curated selection of the latest and most trending products worldwide."
        },
        {
            icon: <FaTruck className="text-4xl text-purple-500" />,
            title: "Fast Delivery",
            description: "Quick and reliable shipping to your doorstep nationwide."
        },
        {
            icon: <FaHeadset className="text-4xl text-red-500" />,
            title: "24/7 Support",
            description: "Round-the-clock customer service to assist you anytime."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Hero Section */}
            <motion.section 
                className="py-20 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-5xl font-bold text-blue-900 mb-6">About Feldio Shop</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto px-4">
                    Your go-to destination for the most trending and innovative products. 
                    We bring you what's hot and what's next in the world of consumer goods.
                </p>
            </motion.section>

            {/* Features Grid */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Story Section */}
            <motion.section 
                className="py-16 px-4 bg-blue-900 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                    <p className="text-lg leading-relaxed">
                        Founded in 2024, Feldio Shop has evolved from a small online store to a 
                        leading marketplace for trending products. We constantly scout the global 
                        market to bring you the most innovative, useful, and exciting products 
                        before they become mainstream. Our mission is to make the latest trends 
                        accessible to everyone while ensuring premium quality and excellent service.
                    </p>
                </div>
            </motion.section>

            {/* Stats Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <motion.div
                        className="p-6"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-4xl font-bold text-blue-500">1K+</h3>
                        <p className="text-gray-600 mt-2">Happy Customers</p>
                    </motion.div>
                    <motion.div
                        className="p-6"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-4xl font-bold text-green-500">100+</h3>
                        <p className="text-gray-600 mt-2">Trending Products</p>
                    </motion.div>
                    <motion.div
                        className="p-6"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-4xl font-bold text-purple-500">10+</h3>
                        <p className="text-gray-600 mt-2">Categories</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;