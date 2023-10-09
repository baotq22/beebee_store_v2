import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { api } from "../axios-instance";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { checkLogin } from "../checkLogin";
import Header from "../components/Header";
import { ProductChosenContext } from "../App";
import { useDispatch } from "react-redux";
import { addProductItem, getProductList } from "../slices/productListSlice";
import '../components/css/modal.css'
import './css/list.css'


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

const ProductList = ({ productList, loading }) => {
    const navigate = useNavigate();
    let loadingContent
    if (loading) {
        loadingContent = <h2 style={{ marginBottom: '30px' }}>Loading....</h2>
    }

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }
    // const productLists = data.filter((item) =>
    //     item.name.toLowerCase().includes(searchQuery.toLowerCase())
    // )

    async function deleteProduct(id: number) {
        try {
            await fetch(`https://64f71db49d77540849531dc0.mockapi.io/product/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Delete Successfully')
            window.location.reload(false);
        } catch (e) {
            alert('lol');
        }
    }

    return (
        <>
            <div className="filters">
                <input type="text"
                    id="input-search"
                    className="filters__textbox"
                    placeholder="Input here"
                    value={searchQuery}
                    onChange={handleSearchChange} />
                <button id="btn-search" className="btn btn-search">Search</button>
            </div>
            <div>
                <table id='table__result'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>RATING POINT</th>
                            <th>QUANTITY</th>
                            <th>SOLD QUANTITY</th>
                            <th>% DISCOUNT</th>
                            <th>SPECIAL</th>
                            <th>IMAGE</th>
                            <th>DESCRIPTION</th>
                            <th>CREATED DATE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    {loadingContent}
                    <tbody>
                        {
                            productList.map((product, index) =>
                                <tr key={index}>
                                    <td>
                                        {product.id}
                                    </td>
                                    <td>
                                        {product.productName}
                                    </td>
                                    <td>
                                        ${product.price}
                                    </td>
                                    <td>
                                        {product?.ratingPoint}
                                    </td>
                                    <td>
                                        {product.quantity}
                                    </td>
                                    <td>
                                        {product.soldQuantity}
                                    </td>
                                    <td>
                                        {product.discount}
                                    </td>
                                    <td>
                                        {product.special}% of portion pay
                                    </td>
                                    <td>
                                        <img style={{ width: '30%', height: '30%' }} src={product.image} />
                                    </td>
                                    <td>
                                        {product.description}
                                    </td>
                                    <td>
                                        {product.createDate}
                                    </td>
                                    <td>
                                        <button id='actionBtn' onClick={() => navigate(`/product/${product.id}`)}>Details</button>
                                        <button id='actionBtn'>Edit</button>
                                        <button id='actionBtn' onClick={() => deleteProduct(product.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

const AllProduct = ({ products }: { getProduct: () => void, products?: object, removeProduct: () => void }) => {

    const [productList, setProductList] = useState<Array<ProductType>>([])
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(10);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const [productChosing, setProductChosing] = useState()
    const productContext = useContext(ProductChosenContext);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [ratingPoint, setRatingPoint] = useState('');
    const [quantity, setQuantity] = useState('');
    const [soldQuantity, setSoldQuantity] = useState('');
    const [discount, setDiscount] = useState('');
    const [special, setSpecial] = useState('');
    const [image, setImage] = useState('');
    const [createDate, setCreateDate] = useState('');
    const [description, setDescription] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        console.log(data)
        addProduct(data)
    }

    async function addNewProduct() {
        try {
            await api.post(`/product`, {
                productName,
                price,
                ratingPoint,
                quantity,
                soldQuantity,
                discount,
                special,
                image,
                description,
                setCreateDate
            })
            getProduct();
            setProductName('');
            setPrice('');
            setRatingPoint('');
            setQuantity('');
            setSoldQuantity('');
            setDiscount('');
            setSpecial('');
            setImage('');
            setDescription('');
            setCreateDate('');
            window.location.reload(false);
        } catch (e) {
            console.log(e);
            alert('lol')
        }
    }

    async function editProduct() {
        try {
            await api.put(`/product/${products.id}`, {
                productName,
                price,
                ratingPoint,
                quantity,
                soldQuantity,
                discount,
                special,
                image,
                description,
            })
            getProduct();
            setProductName('');
            setPrice('');
            setRatingPoint('');
            setQuantity('');
            setSoldQuantity('');
            setDiscount('');
            setSpecial('');
            setImage('');
            setDescription('');
        } catch (e) {
            console.log(e);
            alert('lol')
        }
    }

    useEffect(() => {
        if (products) {
            setProductName(products.productName);
            setPrice(products.price);
            setRatingPoint(products.ratingPoint);
            setQuantity(products.quantity);
            setSoldQuantity(products.soldQuantity);
            setDiscount(products.discount);
            setSpecial(products.special);
            setImage(products.image);
            setDescription(products.description);
        }
    }, [products])

    function removeProductChosing() {
        setProductChosing(undefined)
    }

    async function getProduct() {
        const response = await api.get(`/product`);
        setProductList(response.data)
    }

    const dispatch = useDispatch();

    const [productLists, setProductLists] = useState([])

    async function addProduct(data) {
        try {
            const response = await dispatch(addProductItem(data)).unwrap();
            setProductLists(response);
            navigate('/all-products')
        } catch (e) {
            console.log(e)
        }
    }

    async function getProductLists() {
        try {
            const response = await dispatch(getProductList()).unwrap();
            setProductLists(response);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getProduct();
        getProductLists();
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

    // checkLogin();

    return (
        <div id="form">
            <Header />
            <div className='addButton'>
                <button id='actionBtn' onClick={openModal}>Add</button>
            </div>

            <ProductList productList={currentProducts} loading={loading} />
            <Pagination productsPerPage={productsPerPage} totalProducts={productList.length} paginate={paginate} />

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className='close-button' onClick={closeModal}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <h1 className='formTitle'>Log in</h1>
                        <form id="form" onSubmit={handleSubmit(onSubmit)}>
                            <div className='inputContainer'>
                                <label className='inputTitle'>PRODUCT NAME: <span>*</span></label>
                                <br></br>
                                <input className='inputArea' type='text' id='productName' {...register("productName", { required: true, maxLength: 30 })} />
                            </div>

                            <div className='inputContainer'>
                                <label className='inputTitle'>PRICE: <span>*</span></label>
                                <br></br>
                                <input className='inputArea' type='number' id='price' {...register("price", { required: true })} />
                            </div>

                            <div className='inputContainer'>
                                <label className='inputTitle'>RATING POINT: <span>*</span></label>
                                <br></br>
                                <input className='inputArea' type='number' id='ratingPoint' {...register("ratingPoint", { required: true })} />
                            </div>

                            <div className='inputContainer'>
                                <label className='inputTitle'>QUANTITY: <span>*</span></label>
                                <br></br>
                                <input className='inputArea' type='number' id='quantity' {...register("quantity", { required: true })} />
                            </div>

                            <div className='inputContainer'>
                                <label className='inputTitle'>SOLD QUANTITY: <span>*</span></label>
                                <br></br>
                                <input className='inputArea' type='number' id='soldQuantity' {...register("soldQuantity", { required: true })} />
                            </div>

                            <div className='inputContainer'>
                                <label className='inputTitle'>DESCRIPTION: <span>*</span></label>

                                <input type="text" className='inputArea' id='description' {...register("description", { required: true })} />
                            </div>

                            <div className='inputContainer'>
                                <label className='inputTitle'>% DISCOUNT: <span>*</span></label>
                                <select className='selectArea' style={{ marginRight: '30px' }} id="discount" {...register("discount", { required: true })}>
                                    <option value="7.5">7.5</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="12">12</option>
                                </select>
                                <label className='inputTitle'>SPECIAL: <span>*</span></label>
                                <select className='selectArea' id="special" {...register("special", { required: true })}>
                                    <option value="0">0</option>
                                    <option value="5">5</option>
                                    <option value="7">7</option>
                                </select>
                            </div>

                            <div className='inputContainer'>
                                <label className='inputTitle'>IMAGE: <span>*</span></label>
                                {/* <label htmlFor="image" className="button__upload" id="btn-upload-image">Upload</label> */}
                                <br />
                                <input type="file" id="image" {...register("image", { required: true })} />
                                <span id="product-image"></span>
                            </div>

                            <button type="submit" onClick={addNewProduct}>Add</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AllProduct