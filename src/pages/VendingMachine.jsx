import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import present1 from "../assets/present1.jpg";
import present2 from "../assets/present2.jpg";
import present3 from "../assets/present3.jpg";
import present4 from "../assets/present4.jpg";
import present5 from "../assets/present5.jpg";
import present6 from "../assets/present6.jpg";
import {
  buyAProduct,
  getAllProducts,
  getUserProfile,
  resetAccountBalance,
} from "../store/actions/Index";
import BaseSpinner from "../components/base-components/BaseSpinner";
import BaseCard from "../components/base-components/BaseCard";
import InfoPopup from "./InfoPopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VendingMachine = () => {
  const dispatch = useDispatch();
  const images = [
    present6,
    present4,
    present1,
    present2,
    present5,
    present6,
    present3,
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [isReseting, setIsReseting] = useState(false);
  const [popUpIsVisible, setPopUpIsVisible] = useState(false);
  const accountBalance = useSelector((state) => state?.profile.deposit);
  const allProducts = useSelector((state) => state?.allProducts);
  const [selectedProduct, setSelectedProduct] = useState({});
  const token = localStorage.getItem("token");
  const [sizeError, setSizeError] = useState(null);
  const [numberOfItems, setNumberOfItems] = useState(1);
  const increaseNumberOfItems = () => {
    setNumberOfItems(() => {
      if (numberOfItems > selectedProduct.amountAvailable - 1) {
        setSizeError(
          `There are only ${selectedProduct.amountAvailable} ${selectedProduct.productName}`
        );
        setTimeout(() => {
          setSizeError(null);
        }, 3000);
        return numberOfItems;
      } else {
        return numberOfItems + 1;
      }
    });
  };
  const reduceNumberOfItems = () => {
    setNumberOfItems(() => {
      if (numberOfItems === 1) {
        setSizeError("You must have at least 1 item");
        setTimeout(() => {
          setSizeError(null);
        }, 3000);
        return numberOfItems;
      } else {
        return numberOfItems - 1;
      }
    });
  };
  useEffect(() => {
    setIsLoading(true);
    getAllProducts()
      .then((res) => {
        setIsLoading(false);
        dispatch({ type: "ALL_PRODUCTS", payload: res.data });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  const confirmPurchase = (index) => {
    setPopUpIsVisible(true);
    setSelectedProduct(allProducts[index]);
  };

  const closeDropdown = () => {
    setNumberOfItems(1);
    setPopUpIsVisible(false);
  };

  const buyProduct = () => {
    buyAProduct({
      id: selectedProduct._id,
      token: token,
      amount: numberOfItems,
    })
      .then(() => {
        getUserProfile(token).then((res) => {
          dispatch({ type: "PROFILE", payload: res.data });
          setPopUpIsVisible(false);
          setNumberOfItems(1);
          toast.success("Successful!", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
      })
      .catch((error) => {
        setPopUpIsVisible(false);
        setNumberOfItems(1);
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const resetBalance = () => {
    setIsReseting(true);
    resetAccountBalance(token)
      .then(() => {
        getUserProfile(token).then((res) => {
          setIsReseting(false);
          dispatch({ type: "PROFILE", payload: res.data });
        });
      })
      .catch((err) => {
        setIsReseting(false);
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <>
      {isLoading && (
        <BaseCard>
          <BaseSpinner></BaseSpinner>
        </BaseCard>
      )}
      {!isLoading && (
        <div className="w-full flex justify-center">
          <div className="flex relative justify-center">
            <div className="w-11/12 md:w-2/3 h-screen overflow-auto fixed justify-center">
              <div className="bg-gray-200 rounded-xl pb-10">
                <div className="sticky top-0 px-3 py-2 bg-gray-200 flex items-center">
                  <h3>Balance: ¢{accountBalance}</h3>
                  <button
                    onClick={resetBalance}
                    className="ml-auto font-medium bg-[#4834D4] text-white px-4 py-1 rounded border hover:border-[#5742e2]"
                  >
                    {isReseting ? <BaseSpinner /> : "Reset Balance"}
                  </button>
                </div>
                <div className="p-5 flex flex-wrap justify-center w-full">
                  {allProducts?.map((product, index) => (
                    <button
                      className="px-2 basis-auto sm:basis-1/2 md:basis-1/4 mb-8"
                      key={index}
                      onClick={() => {
                        confirmPurchase(index);
                      }}
                    >
                      <div className="bg-white flex flex-col items-center shadow-md p-4 rounded border-2 h-full border-transparent hover:border-[#13113f]">
                        <div className=" bg-white w-full rounded shadow-xl">
                          <h3 className="font-medium text-lg text-center">
                            {product.productName}
                          </h3>
                        </div>
                        <div className="pt-1 flex flex-col w-full items-center bg-transparent">
                          <img
                            src={images[Math.floor(Math.random() * 4)]}
                            alt=""
                            className="w-[150px] h-[120px]"
                          />
                          <p className="text-center text-sm">
                            {product.description}
                          </p>
                          <p className="text-center text-sm">¢{product.cost}</p>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex justify-center">
                          <p>{product.amountAvailable}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                  {popUpIsVisible && (
                    <>
                      <InfoPopup
                        selectedProduct={selectedProduct}
                        accountBalance={accountBalance}
                        buyProduct={buyProduct}
                        closeDropdown={closeDropdown}
                        count={numberOfItems}
                        increaseNumberOfItems={increaseNumberOfItems}
                        reduceNumberOfItems={reduceNumberOfItems}
                        sizeError={sizeError}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VendingMachine;
