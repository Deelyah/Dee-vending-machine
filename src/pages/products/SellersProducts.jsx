import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseCard from "../../components/base-components/BaseCard";
import { deleteProduct, getSellersProducts } from "../../store/actions/Index";
import { Link } from "react-router-dom";
import BaseSpinner from "../../components/base-components/BaseSpinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SellersProucts = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const profile = useSelector((state) => {
    return state?.profile;
  });
  const products = useSelector((state) => {
    return state?.sellersProduct;
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    setIsLoading(true);
    getSellersProducts(token)
      .then((res) => {
        setIsLoading(false);
        dispatch({ type: "SELLERS_PRODUCT", payload: res.data });
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    deleteProduct({ id: id, token: token })
      .then(() => {
        getSellersProducts(token)
          .then((res) => {
            setIsLoading(false);
            dispatch({ type: "SELLERS_PRODUCT", payload: res.data });
            toast.success("Product Deleted", {
              position: toast.POSITION.TOP_CENTER,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {isLoading && (
        <BaseCard>
          <BaseSpinner></BaseSpinner>
        </BaseCard>
      )}
      {!isLoading && (products?.length === 0 || !products) && (
        <BaseCard>
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-semibold text-lg mb-4">
              {profile?.username}... You have no products😥
            </h2>
            <p>Don't worry, we've got you!</p>
            <Link
              to="/my-account/seller/add-product"
              className="bg-[#13113f] hover:bg-[#13113fe5] text-white px-4 py-2 mt-4 rounded-sm"
            >
              Add Products here
            </Link>
          </div>
        </BaseCard>
      )}
      {!isLoading && products && products?.length !== 0 && (
        <>
          <div className="flex flex-wrap w-full justify-center">
            {products?.map((product, index) => {
              return (
                <div key={index} className="px-4 mb-8 basis-1/4">
                  <div className="bg-white w-full px-2 pt-4 rounded-lg min-h-[200px] flex flex-col justify-center items-center">
                    <h2 className="font-semibold text-2xl text-center">
                      {product?.productName}
                    </h2>
                    <p className="font-medium text-center">
                      {product?.description}
                    </p>
                    <p className="font-medium text-center"> ₦{product?.cost}</p>
                    <div>
                      <Link
                        to={`/my-account/seller/edit-product/${product._id}`}
                        className="font-medium my-4 mr-4 px-4 py-1 rounded border hover:border-[#4834D4]"
                      >
                        Edit
                      </Link>
                      <button
                        className="font-medium my-4 px-4 py-1 rounded border hover:bg-red-600 hover:text-white"
                        onClick={() => {
                          handleDelete(product?._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center">
            <Link
              to="/my-account/seller/add-product"
              className="text-[#13113f] hover:bg-[#dbd1d1] bg-white border px-4 py-2 mt-4 rounded-sm"
            >
              Add More Products here
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default SellersProucts;
