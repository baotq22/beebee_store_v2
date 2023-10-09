import banner from '../assets/2.jpg'
import promote from '../assets/promote.png'
import './css/banner.css'

const Banner = () => {
    return (
        <>
            <div id="banner">
                <a href="#">
                    <img src={banner} alt="banner" />
                </a>
            </div>
            <div id="promote">
            <div className="container">
                <h3 className="promote__heading">BIG SALE TODAY</h3>
                <a href="#" className="promote__link">
                    <img src={promote} alt="" className="promote__img" />
                </a>
            </div>
        </div>
        </>
    )
}

export default Banner