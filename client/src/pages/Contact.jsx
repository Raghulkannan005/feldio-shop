import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    const contactInfo = [
        {
            icon: <FaPhone className="text-3xl text-red-600" />,
            title: "Phone",
            details: "+91 6385673493",
            subdetails: "24/7 Available"
        },
        {
            icon: <FaPhone className="text-3xl text-red-600" />,
            title: "Phone",
            details: "+91 63696 32751",
            subdetails: "24/7 Available"
        },
        {
            icon: <FaEnvelope className="text-3xl text-red-600" />,
            title: "Email",
            details: "Feldioshop@gmail.com",
            subdetails: "Online support 24/7"
        },
        {
            icon: <FaMapMarkerAlt className="text-3xl text-red-600" />,
            title: "Location",
            details: "Car street, Madhuranthakam, chengalpattu, chennai, 603306",
            subdetails: "Tamil Nadu, India"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4">
            {/* Header Section */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">Get in Touch</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Have questions about our products or services? We're here to help! Reach out to us through any of the following channels.
                </p>
            </motion.div>

            {/* Contact Info Section */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {contactInfo.map((contact, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="mb-4">{contact.icon}</div>
                        <h3 className="text-xl font-bold text-red-600 mb-2">{contact.title}</h3>
                        <p className="text-gray-700">{contact.details}</p>
                        <p className="text-gray-500">{contact.subdetails}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Contact;