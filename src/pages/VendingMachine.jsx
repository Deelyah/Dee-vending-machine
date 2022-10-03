import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import present1 from "../assets/present1.jpg";
import present2 from "../assets/present2.jpg";
import present3 from "../assets/present3.jpg";
import present4 from "../assets/present4.jpg";
import present5 from "../assets/present5.jpg";
import present6 from "../assets/present6.jpg";
import {
  getAllProducts,
  getUserProfile,
  resetAccountBalance,
} from "../store/actions/Index";
import BaseSpinner from "../components/base-components/BaseSpinner";
import BaseCard from "../components/base-components/BaseCard";

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
  const [popUpIsVisible, setPopUpIsVisible] = useState(false);
  const accountBalance = useSelector((state) => state?.profile.deposit);
  const allProducts = useSelector((state) => state?.allProducts);
  const [selectedProduct, setSelectedProduct] = useState({});
  const token = localStorage.getItem("token");
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

  const closeDropdown = (e) => {
    setPopUpIsVisible(false);
    console.log(popUpIsVisible);
  };

  const buyProduct = () => {};

  const resetBalance = () => {
    resetAccountBalance(token)
      .then(() => {
        getUserProfile(token).then((res) => {
          dispatch({ type: "PROFILE", payload: res.data });
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
      {!isLoading && (
        <div className="w-full flex justify-center">
          <div className="flex relative justify-center">
            <div className="w-11/12 md:w-2/3 h-screen overflow-auto fixed justify-center">
              <div className="bg-gray-200 rounded-xl pb-10">
                <div className="sticky top-0 px-3 py-2 bg-gray-200 flex items-center">
                  <h3>Balance: ${accountBalance}</h3>
                  <button
                    onClick={resetBalance}
                    className="ml-auto font-medium bg-[#4834D4] text-white px-4 py-1 rounded border hover:border-[#5742e2]"
                  >
                    Reset Balance
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
                          <p className="text-center text-sm">${product.cost}</p>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex justify-center">
                          <p>{product.amountAvailable}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                  {popUpIsVisible && (
                    <>
                      <div className="fixed inset-0 h-screen overflow-hidden bg-[#00000035] backdrop-blur-sm flex justify-center items-center">
                        <div className="bg-white h-fit p-5 rounded-lg">
                          {accountBalance >= selectedProduct.cost ? (
                            <>
                              <h5 className="font-medium text-xl mb-5">
                                You're about to buy{" "}
                                {selectedProduct?.productName} at $
                                {selectedProduct?.cost}
                              </h5>

                              <div className="w-full flex justify-center">
                                <button
                                  className="font-medium my-4 mr-4 px-4 py-1 rounded border hover:border-[#4834D4]"
                                  onClick={buyProduct}
                                >
                                  Proceed
                                </button>{" "}
                                <button
                                  className="font-medium my-4 px-4 py-1 rounded border hover:bg-red-600 hover:text-white"
                                  onClick={(e) => closeDropdown(e)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <h5 className="font-medium text-xl mb-3 text-center">
                                Insufficifient Funds
                              </h5>
                              <p className="text-sm text-center">
                                Deposit Funds to proceed
                              </p>
                              <div className="w-full flex justify-center mt-3">
                                <Link
                                  to="/my-account/deposit"
                                  className="font-medium my-4 mr-4 px-4 py-1 rounded border hover:border-[#4834D4]"
                                  onClick={closeDropdown}
                                >
                                  Deposit
                                </Link>{" "}
                                <button
                                  className="font-medium my-4 px-4 py-1 rounded border hover:bg-red-600 hover:text-white"
                                  onClick={(e) => closeDropdown(e)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
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
