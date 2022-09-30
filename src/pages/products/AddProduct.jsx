import { useState } from "react";
import BaseCard from "../../components/base-components/BaseCard";
import BaseSpinner from "../../components/base-components/BaseSpinner";
import { createProduct } from "../../store/actions/Index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const token = localStorage.getItem("token");
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
      createProduct({ token: token, details: productDetails })
        .then((res) => {
          setIsLoading(false);
          toast.success("Product Created", {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            navigateTo("/my-account/my-product");
          }, 1000);
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };
  return (
    <BaseCard>
      <ToastContainer />
      <h2 className="text-xl md:text-2xl text-black font-medium text-center">
        Create Product
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
            placeholder="Must be a multiple of 5"
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
            placeholder="Must be less than 10"
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
            {isLoading ? <BaseSpinner /> : "Create"}
          </button>
        </div>
      </form>
    </BaseCard>
  );
};

export default AddProduct;
