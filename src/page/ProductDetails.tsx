import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../axios-instance";
import Header from "../components/Header";
import { checkLogin } from "../checkLogin";
import { useDispatch } from "react-redux";
import { addProductToList } from "../slices/productChosenListSlice";
import './css/ProductDetails.css'
import Footer from "../components/Footer";

const ProductDetail = () => {

    const params = useParams();
    const productId = params.productId;
    const [product, setProduct] = useState();

    useEffect(() => {
        api.get(`/product/${productId}`).then(res => {
            setProduct(res.data)
        }).catch(e => console.log(e));
    }, [])

    checkLogin();
    // const dispatch = useDispatch();

    const cartList = localStorage.getItem('cart');
    const cartListArray = JSON.parse(cartList) || [];

    async function chooseProduct(item) {
        const cart = [...cartListArray, item]
        // dispatch(addProductToList(product));
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to Cart successfully')
        window.location.reload(false);
    }

    const addToCart = () => {
        chooseProduct(product);
    }

    return (
        <div id='productDetail'>
            <Header />
            <div className="container">
                <div className="card">
                    <div className="container-fliud">
                        <div className="wrapper row">
                            <div className="preview col-md-6">
                                <div className="preview-pic tab-content">
                                    <div className="tab-pane active" id="pic-1"><img src={product?.image} /></div>
                                </div>
                            </div>
                            <div className="details col-md-6">
                                <small className="products__sale">{product?.discount}% DISCOUNT</small>
                                <h3 className="product-title">{product?.productName}</h3>
                                <div className="rating">
                                    <div className="stars">
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                    </div>
                                    <span className="review-no">{product?.ratingPoint} reviews</span>
                                </div>
                                <p className="product-description">{product?.description}</p>
                                <h4 className="price">current price: <span>${product?.price}</span></h4>
                                <h2 className="vote"><strong>{product?.soldQuantity}</strong> of buyers enjoyed this product! <strong>({product?.quantity} in Stock)</strong></h2>
                                <h2 className="vote"><strong>Special offers?</strong><span><h3>{product?.special}% protion pay</h3></span></h2>


                                <div className="action">
                                    <button className="add-to-cart btn btn-default" onClick={addToCart}>add to cart</button>
                                    <button className="like btn btn-default" type="button"><span className="fa fa-heart"></span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductDetail