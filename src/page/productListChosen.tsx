import { useSelector } from "react-redux";
import Header from "../components/Header"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer";
import { checkLogin } from "../checkLogin";
import { useEffect, useState } from "react";
import './css/orderPage.css'
import { api } from "../axios-instance";

const updateQuantity = async () => {
    const response = await api.put(`/product?quantity`)
}

const ProductChosen = () => {
    // const productChosenContext = useContext(ProductChosenContext)
    // const { productList } = productChosenContext

    const navigate = useNavigate();

    const productList = useSelector(state => state.productChosenList)

    const SuccessOrder = () => {
        if (updateCart.length > 0) {
            alert('Successfully Order ' + updateCart.length + ' product(s)\nPress OK to direct to homepage')
            localStorage.setItem('cart', '[]');
            navigate(`/`)
        } else {
            alert('Your cart is empty')
        }
    }

    const cartListArray = localStorage.getItem('cart') || [];

    const [updateCart, setUpdateCart] = useState([]);
    const productToDelete = {}
    useEffect(() => {
        if (cartListArray) {
            const parsedData = JSON.parse(cartListArray);
            setUpdateCart(parsedData);
        }
        console.log(updateCart)
    }, [])


    const DeleteProduct = (productToDelete) => {
        const updatedData = updateCart.filter(item => item.id !== productToDelete.id);
        localStorage.setItem('cart', JSON.stringify(updatedData));
        setUpdateCart(updatedData);
        window.location.reload(false);
    }

    const [columnSum, setColumnSum] = useState(0);

    const calColSum = () => {
        const sum = updateCart.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.price;
        }, 0);

        return sum;
    }

    useEffect(() => {
        setColumnSum(calColSum());
    }, [updateCart]);

    const ArrayCartList = JSON.parse(localStorage.getItem('cart')) || [];
    function chooseProduct() {
        // productContext.setProductList([...productContext.productList, {name: product?.name, price: product?.price}]);
        // dispatch(addProductToList(product));
        const cart = [...ArrayCartList]
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const [count, setCount] = useState(1);

    const increment = () => {
        setCount(count + 1);
        chooseProduct();
    }

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    const getCartList = () => {
        const CartArray1 = [];

        const cartListArray = JSON.parse(localStorage.getItem('cart')) || [];

        for (let i = 0; i < cartListArray.length; i++) {
            const item = CartArray1.find(findItem => findItem.id === cartListArray[i].id);
            console.log(CartArray1)
            if (item) {
                item.count += 1;
            } else {
                CartArray1.push({ ...cartListArray[i], count: 1 });
            }
        }
        console.log(CartArray1);
        return CartArray1;
    }

    const [cartArray, setCartArray] = useState([]);

    useEffect(() => {
        const getCartArray = getCartList();
        setCartArray(getCartArray);
        console.log(cartArray)
    }, [])

    let cartLength;

    if (ArrayCartList.length > 0) {
        cartLength =
            <>
                {
                    cartArray.map((item) =>
                        <tr key={item.id}>
                            <td className='imageCol'>
                                <img src={item.image} style={{ width: '100%' }} />
                            </td>
                            <td className='nameCol'>
                                <Link to={`/product/${item.id}`}><p>{item.productName}</p></Link>
                            </td>
                            <td className='priceCol'>${item.price}</td>
                            <td className='quantityCol'>
                                <span>
                                    <button className='amountAction' onClick={decrement}>-</button>
                                </span>
                                <span>
                                    <input type="text" value={item.count} readOnly />
                                </span>
                                <span>
                                    <button className='amountAction' onClick={increment}>+</button>
                                </span>
                            </td>
                            <td className='totalCol'>${item.price * item.count}</td>
                            <td className='actionCol'>
                                <button onClick={() => DeleteProduct(item)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </>
    } else {
        cartLength =
            <tr>
                <td colSpan={6}>Oops! There is no item in your cart. Comeback to Homepage then shopping!</td>
            </tr>
    }

    return (
        <div id='orderPage'>
            <Header />
            <h1>Confirm The Order</h1>
            <div className="cartContainer">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="cartTable">
                                <thead>
                                    <tr>
                                        <th style={{ maxWidth: '100px' }}>Image</th>
                                        <th style={{ minWidth: '400px' }}>Product Name &amp; Details</th>
                                        <th style={{ width: '100px' }}>Price</th>
                                        <th className="text-center py-3 px-4" style={{ width: '120px' }}>Quantity</th>
                                        <th className="text-right py-3 px-4" style={{ width: '100px' }}>Total</th>
                                        <th style={{ width: '40px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartLength}
                                    <tr>
                                        <td colSpan={4} style={{ fontSize: '30px' }}>Total Price</td>
                                        <td colSpan={2} style={{ fontSize: '30px', color: 'red' }}><strong>${columnSum * count}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="btnContainer">
                            <button type="button" className="btn btn-lg btn-default md-btn-flat mt-2 mr-3" onClick={() => navigate(`/`)}>Back</button>
                            <button type="button" className="btn btn-lg btn-primary mt-2" onClick={SuccessOrder}>Order</button>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductChosen