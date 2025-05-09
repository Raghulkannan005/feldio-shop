import { motion } from 'framer-motion';

const Marquee = () => {
return (
        <div className="flex overflow-hidden whitespace-nowrap text-white bg-gradient-to-b from-red-800 to-red-900 p-1">
            <motion.div
                className="flex space-x-32"
                animate={{
                    x: [0, -1000],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 20,
                        ease: "linear",
                    },
                }}
            >
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex space-x-32">
                        <p className="text-xl font-medium">COD & Free Delivery Available</p>
                        <p className="text-xl font-medium">Order On +91-6385673493 </p>
                        <p className="text-xl font-medium">Welcome to Feldio Shop - Your One-Stop Fashion Destination</p>
                        <p className="text-xl font-medium">Discover amazing products at great prices</p>
                        <p className="text-xl font-medium">Shop Now</p>
                        <p className="text-xl font-medium">Order On +91-63696 32751 </p>
                        <p className="text-xl font-medium">Exclusive and Trending products</p>

                    </div>
                ))}
            </motion.div>
        </div>
);
};

export default Marquee;