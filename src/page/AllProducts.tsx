import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { addProductItem, editProductItem } from "../slices/productListSlice";
import '../components/css/modal.css'
import './css/list.css'

const ProductList = ({ productList, loading }) => {
    const navigate = useNavigate();
    let loadingContent
    if (loading) {
        loadingContent = <h2 style={{ marginBottom: '30px' }}>Loading....</h2>
    }

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

    const dispatch = useDispatch();

    async function editProduct(data) {
        try {
            const cloneItem = { ...data }
            const product_id = selectedProductId;
            await dispatch(editProductItem({ productId: product_id, ...cloneItem })).unwrap();
            alert('Updated Successfully!')
            window.location.reload(false);
        } catch (e) {
            console.log(e)
            alert('Edit Failed!')
        }
    }

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const openEditModal = (productId) => {
        setSelectedProductId(productId);
        setIsModalEditOpen(true);
    }

    const closeEditModal = () => {
        setIsModalEditOpen(false);
    }

    const [editedProductData, setEditedProductData] = useState(null);

    useEffect(() => {
        if (selectedProductId !== null) {
          // Fetch the product data by ID and set it in the state.
          const fetchProductById = async () => {
            try {
              const response = await axios.get(
                `https://64f71db49d77540849531dc0.mockapi.io/product/${selectedProductId}`
              );
              setEditedProductData(response.data);
              console.log(selectedProductId)
            } catch (error) {
              console.error("Error fetching product data:", error);
            }
          };
      
          fetchProductById();
        }
      }, [selectedProductId]);
      

    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        if (selectedProductId !== null) { // Step 5
            editProduct(data);
        }
    }

    return (
        <>
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
                                        <button id='actionBtn' onClick={() => openEditModal(product.id)}>Edit</button>
                                        <button id='actionBtn' onClick={() => deleteProduct(product.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                {isModalEditOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button className='close-button' onClick={closeEditModal}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                            <h1 className='formTitle'>Log in</h1>
                            <form id="form" onSubmit={handleSubmit(onSubmit)}>
                                <div className='inputContainer'>
                                    <label className='inputTitle'>PRODUCT NAME: <span>*</span></label>
                                    <br></br>
                                    <input className='inputArea' type='text' id='productName' {...register("productName", { required: true, maxLength: 30 })} defaultValue={editedProductData?.productName || ""} />
                                </div>

                                <div className='inputContainer'>
                                    <label className='inputTitle'>PRICE: <span>*</span></label>
                                    <br></br>
                                    <input className='inputArea' type='number' id='price' {...register("price", { required: true })} defaultValue={editedProductData?.price || ""} />
                                </div>

                                <div className='inputContainer'>
                                    <label className='inputTitle'>RATING POINT: <span>*</span></label>
                                    <br></br>
                                    <input className='inputArea' type='number' id='ratingPoint' {...register("ratingPoint", { required: true })} defaultValue={editedProductData?.ratingPoint || ""} />
                                </div>

                                <div className='inputContainer'>
                                    <label className='inputTitle'>QUANTITY: <span>*</span></label>
                                    <br></br>
                                    <input className='inputArea' type='number' id='quantity' {...register("quantity", { required: true })} defaultValue={editedProductData?.quantity || ""}></input>
                                </div>

                                <div className='inputContainer'>
                                    <label className='inputTitle'>SOLD QUANTITY: <span>*</span></label>
                                    <br></br>
                                    <input className='inputArea' type='number' id='soldQuantity' {...register("soldQuantity", { required: true })} defaultValue={editedProductData?.soldQuantity || ""} />
                                </div>

                                <div className='inputContainer'>
                                    <label className='inputTitle'>DESCRIPTION: <span>*</span></label>

                                    <input type="text" className='inputArea' id='description' {...register("description", { required: true })} defaultValue={editedProductData?.description || ""} />
                                </div>

                                <div className='inputContainer'>
                                    <label className='inputTitle'>% DISCOUNT: <span>*</span></label>
                                    <select className='selectArea' style={{ marginRight: '30px' }} id="discount" {...register("discount", { required: true })} defaultValue={editedProductData?.discount || ""}>
                                        <option value="7.5">7.5</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="12">12</option>
                                    </select>
                                    <label className='inputTitle'>SPECIAL: <span>*</span></label>
                                    <select className='selectArea' id="special" {...register("special", { required: true })} defaultValue={editedProductData?.special || ""}>
                                        <option value="0">0</option>
                                        <option value="5">5</option>
                                        <option value="7">7</option>
                                    </select>
                                </div>

                                <div className='inputContainer'>
                                    <label className='inputTitle'>IMAGE: <span>*</span></label>
                                    <br />
                                    <input type="file" id="image" {...register("image", { required: true })} />
                                    <span id="product-image"></span>
                                </div>

                                <button type="submit">Update</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

const AllProduct = ({ products }: { getProduct: () => void, products?: object, removeProduct: () => void }) => {

    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(10);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const [productChosing, setProductChosing] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => { addProduct(data) }

    function removeProductChosing() {
        setProductChosing(undefined)
    }

    const dispatch = useDispatch();

    async function addProduct(data) {
        try {
            const cloneItem = { ...data }
            await dispatch(addProductItem(cloneItem)).unwrap();
            alert('Added Successfully!')
            window.location.reload(false);
        } catch (e) {
            console.log(e)
            alert('Add Failed!')
        }
    }

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
                                <br />
                                <input type="file" id="image" {...register("image", { required: true })} />
                                <span id="product-image"></span>
                            </div>

                            <button type="submit">Add</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AllProduct