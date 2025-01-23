import { FaShippingFast, FaStore } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Admin = () => {
    const adminButtonStyle = 'flex items-center w-40 h-40 justify-center flex-col border-2 border-red-600 p-4 rounded-lg hover:bg-red-50 transition-colors duration-300'
    const adminIconStyle = 'text-6xl text-red-600 mx-auto mt-4'
    const adminTextStyle = 'text-red-600 text-center font-semibold mt-2'

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <motion.div 
            className="min-h-[80vh] flex items-center flex-col bg-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h1 
                className="text-5xl font-bold text-red-600 mt-10"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                Admin Dashboard
            </motion.h1>

            <motion.div 
                className="flex mt-32 justify-center gap-20 w-[80vw] h-[80vh]"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.a 
                    className={`${adminButtonStyle} shadow-lg hover:shadow-xl`} 
                    href="/admin/products"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaStore className={adminIconStyle} />
                    <span className={adminTextStyle}>Products</span>
                </motion.a>

                <motion.a 
                    className={`${adminButtonStyle} shadow-lg hover:shadow-xl`} 
                    href="/admin/shipments"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaShippingFast className={adminIconStyle} />
                    <span className={adminTextStyle}>Shipments</span>
                </motion.a>

                <motion.a 
                    className={`${adminButtonStyle} shadow-lg hover:shadow-xl`} 
                    href="/admin/payments"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className={adminIconStyle}>₹</span>
                    <span className={adminTextStyle}>Payments</span>
                </motion.a>
            </motion.div>
        </motion.div>
    )
}



export default Admin