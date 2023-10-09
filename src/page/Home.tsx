import { useEffect, useContext, useState } from "react";
import './css/HomeProduct.css'
import axios from "axios";
import { api } from "../axios-instance";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { checkLogin } from "../checkLogin";
import Header from "../components/Header";
import { ProductChosenContext } from "../App";
import '../library/fontawesome/css/all.min.css'
import Footer from "../components/Footer";
import Banner from "../components/Banner";

type ProductType = {
    productName: string,
    price: number,
    ratingPoint: number,
    quantity: number,
    soldQuantity: number,
    discount: number,
    special: number,
    image: string,
    description: string,
    createDate: string,
}

const Products = ({ productList, loading }) => {
    let loadingContent
    if (loading) {
        loadingContent = <h2 style={{ marginBottom: '30px' }}>Loading....</h2>
    }

    return (
        <>
            <div id="products">
                <div className="container">
                    <h3 className="products__heading">BEST SELLER</h3>
                    {loadingContent}
                    <div className="products__list" id="products__list">
                        {
                            productList.map((product, index) =>
                                <div className="products__item" key={index}>
                                    <Link to={`/product/${product.id}`}>
                                        <small className="products__sale">Portion pay {product.special}%</small>
                                        <div className="products__img">
                                            <a href="#" className="products__img">
                                                <img src={product.image} />
                                            </a>
                                        </div>
                                        <p>
                                            <p className="products__title">{product.productName}</p>
                                        </p>
                                        <p className="products__price">
                                            <span>{product.price}</span>
                                            <span>-{product.discount}% SALE</span>
                                        </p>
                                        <div className="products__rating">
                                            <span>{product.ratingPoint}</span>
                                            <span><i className="fa-solid fa-star" style={{ color: '#f9c61f' }}></i></span>
                                            <span>({product.quantity} sold)</span>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

const Home = () => {
    const productContext = useContext(ProductChosenContext);
    const navigate = useNavigate();

    const [productList, setProductList] = useState<Array<ProductType>>([])
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(12);

    async function getProduct() {
        const response = await api.get(`/product`);
    }

    useEffect(() => {
        getProduct();
    }, [])

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const res = await axios.get(`https://64f71db49d77540849531dc0.mockapi.io/product`);
            setProductList(res.data);
            setLoading(false);
        }
        fetchProduct();
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct);

    checkLogin();

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <div id="form">
                <Header />
                <Banner />
                <Products productList={currentProducts} loading={loading} />
                <Pagination productsPerPage={productsPerPage} totalProducts={productList.length} paginate={paginate} />
            </div>
            <Footer />
        </div>
    )
}

export default Home