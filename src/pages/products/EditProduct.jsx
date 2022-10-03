import { useEffect, useState } from "react";
import BaseCard from "../../components/base-components/BaseCard";
import BaseSpinner from "../../components/base-components/BaseSpinner";
import {
  getProductById,
  getSellersProducts,
  updateProduct,
} from "../../store/actions/Index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
const EditProduct = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({
    productName: product?.productName,
    cost: product?.cost,
    description: product?.description,
    amountAvailable: product?.amountAvailable,
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    getProductById({ token: token, id: id })
      .then((res) => {
        setProductDetails(res.data);
        console.log(product);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleInputChange = (e) => {
    setProductDetails((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (productDetails.cost % 5 !== 0) {
      setIsLoading(false);
      toast.error("Price must be a multiple of 5", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (productDetails.amountAvailable > 10) {
      setIsLoading(false);
      toast.error("Amount available must be less than 10", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      updateProduct({ token: token, details: productDetails, id: id })
        .then(() => {
          getSellersProducts(token)
            .then((res) => {
              dispatch({ type: "SELLERS_PRODUCT", payload: res.data });
              setIsLoading(false);
              toast.success("Product Updated", {
                position: toast.POSITION.TOP_CENTER,
              });
              setTimeout(() => {
                navigateTo("/my-account/seller/my-products");
              }, 1000);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          setIsLoading(false);
          const errorText = `E11000 duplicate key error collection: test.products index: productName_1 dup key: { productName: "${productDetails?.productName}" }`;
          if (error.response.data.message == errorText) {
            toast.warning(
              `${productDetails.productName} already exists. Kindly add another product.`,
              {
                position: toast.POSITION.TOP_CENTER,
              }
            );
          } else {
            toast.error(error.response.data.message, {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  };
  return (
    <BaseCard>
      <ToastContainer />
      <h2 className="text-xl md:text-2xl text-black font-medium text-center">
        Edit Product
      </h2>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="py-[26px]"
      >
        <div className="">
          <label htmlFor="productName">Product Name</label>
          <input
            required
            type="text"
            value={productDetails?.productName}
            className="focus:outline-none w-full border rounded px-3 py-2"
            name="productName"
            id="productName"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>

        <div className="mt-6">
          <label htmlFor="description">Description</label>
          <input
            required
            type="text"
            value={productDetails?.description}
            className="focus:outline-none w-full border rounded px-3 py-2"
            name="description"
            id="description"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>
        <div className="mt-6">
          <label htmlFor="cost">Price</label>
          <input
            required
            type="number"
            value={productDetails?.cost}
            className="focus:outline-none w-full border rounded px-3 py-2"
            name="cost"
            id="cost"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>
        <div className="mt-6">
          <label htmlFor="amountAvailable">Amount Available</label>
          <input
            required
            type="number"
            value={productDetails?.amountAvailable}
            className="focus:outline-none w-full border rounded px-3 py-2"
            name="amountAvailable"
            id="amountAvailable"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>
        <div className="w-full">
          <button className="w-1/2 flex justify-center items-center text-sm text-white bg-[#4834D4] py-2 md:py-3 mt-11 rounded-lg">
            {isLoading ? <BaseSpinner /> : "Save"}
          </button>
        </div>
      </form>
    </BaseCard>
  );
};

export default EditProduct;
