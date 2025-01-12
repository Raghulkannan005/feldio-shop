import Header from "../common/Header";
import Footer from "../common/Footer";
import Marquee from '../common/Marquee';

const Mainlayout = ({ children }) => {
    return (
        <div>
            <Marquee />
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Mainlayout