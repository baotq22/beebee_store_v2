import logo1 from '../assets/payment_1.png'
import logo2 from '../assets/payment_2.png'
import logo3 from '../assets/payment_3.png'
import logo4 from '../assets/payment_4.png'
import logo5 from '../assets/payment_5.png'
import logo6 from '../assets/payment_6.png'
import logo7 from '../assets/payment_7.png'
import logo8 from '../assets/payment_8.png'
import './css/footer.css'

const Footer = () => {
    return (
        <>
            <footer>
                <div className="container">
                    <div className="footer__body">
                        <div className="footer__item">
                            <ul>
                                <li>
                                    <a href="#">Recharge VIP Credits</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <a href="#">Purchased History</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <a href="#">Delivery Rules</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <a href="#">Warranty Rules</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__item">
                            <ul>
                                <li>
                                    <a href="#">Introduction of Gaming Heaven</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <a href="#">Address</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <a href="#">Feedback</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <a href="#">Find Address</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__item">
                            <ul>
                                <li>
                                    <a href="#"><b>Hotline</b> (Free cost)</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <a href="#">Order: <b><span>085.210.2000</span></b> (7:30 - 22:00)</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <a href="#">Feedback: <b><span>tranquocbao2210@gmail.com</span></b> (8:00 - 21:30)</a>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <a href="#">Warranty: <b><span>085.210.2000</span></b> (8:00 - 21:00)</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__item">
                            <h3 className="footer__payment">Accepted Payment Method</h3>
                            <div className="footer__verify">
                                <a href="#" className="footer__link">
                                    <img src={logo1} alt="" />
                                </a>
                                <a href="#" className="footer__link">
                                    <img src={logo2} alt="" />
                                </a>
                                <a href="#" className="footer__link">
                                    <img src={logo3} alt="" />
                                </a>
                                <a href="#" className="footer__link">
                                    <img src={logo4} alt="" />
                                </a>
                                <a href="#" className="footer__link">
                                    <img src={logo5} alt="" />
                                </a>
                                <a href="#" className="footer__link">
                                    <img src={logo6} alt="" />
                                </a>
                                <a href="#" className="footer__link">
                                    <img src={logo7} alt="" />
                                </a>
                                <a href="#" className="footer__link">
                                    <img src={logo8} alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="copyright">
                <div className="container">
                    © 2023. Gaming Heaven Informatics JSC. GPDKKD: 0303217354 by Hanoi Invest and Plan Department.<br />
                    Address: No. 122 Doi Can Street, Ba Dinh Ward, Hanoi<br />Tel: 085.210.2000. Email:
                    tranquocbao2210@gmail.com. <br />
                </div>
            </div>
        </>
    )
}

export default Footer