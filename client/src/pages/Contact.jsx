import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    const contactInfo = [
        {
            icon: <FaPhone className="text-3xl text-blue-500" />,
            title: "Phone",
            details: "+91 9677605417",
            subdetails: "Monday to Saturday, 10am to 6pm"
        },
        {
            icon: <FaEnvelope className="text-3xl text-green-500" />,
            title: "Email",
            details: "info@example.com",
            subdetails: "Online support 24/7"
        },
        {
            icon: <FaMapMarkerAlt className="text-3xl text-red-500" />,
            title: "Location",
            details: "123 Chengalpattu",
            subdetails: "Tamil Nadu, India"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
            {/* Header Section */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Get in Touch</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Have questions about our products or services? We're here to help! Reach out to us through any of the following channels.
                </p>
            </motion.div>

            {/* Contact Info Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {contactInfo.map((info, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4">{info.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{info.title}</h3>
                            <p className="text-blue-600 font-medium mb-1">{info.details}</p>
                            <p className="text-gray-500 text-sm">{info.subdetails}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Contact Form Section */}
            <motion.div 
                className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Send us a Message</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 mb-2" htmlFor="name">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="How can we help?"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                rows="5"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Your message here..."
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-300"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;