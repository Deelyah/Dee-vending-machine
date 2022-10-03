import { Link } from "react-router-dom";
const InfoPopup = ({
  selectedProduct,
  accountBalance,
  buyProduct,
  closeDropdown,
  count,
  increaseNumberOfItems,
  reduceNumberOfItems,
  sizeError,
}) => {
  return (
    <>
      <div className="fixed inset-0 h-screen overflow-hidden bg-[#00000035] backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white h-fit p-5 rounded-lg">
          {accountBalance >= selectedProduct.cost ? (
            <>
              <div className="flex justify-center mb-3">
                <button
                  className="font-bold text-lg py-1 px-3 border"
                  onClick={increaseNumberOfItems}
                >
                  +
                </button>
                <button
                  className="ml-4 font-bold text-lg py-1 px-3 border"
                  onClick={reduceNumberOfItems}
                >
                  -
                </button>
              </div>
              <h5 className="font-medium text-xl mb-2">
                You're about to buy {count} {selectedProduct?.productName} at ¢
                {selectedProduct?.cost * count}
              </h5>
              <p className="text-xs text-center mb-5">
                Change number of items using the buttons above
              </p>
              {sizeError && (
                <p className="font-bold italic text-red-700 text-center">
                  {sizeError}
                </p>
              )}
              <div className="w-full flex justify-center">
                <button
                  className="font-medium my-4 mr-4 px-4 py-1 rounded border hover:border-[#4834D4]"
                  onClick={buyProduct}
                >
                  Proceed
                </button>{" "}
                <button
                  className="font-medium my-4 px-4 py-1 rounded border hover:bg-red-600 hover:text-white"
                  onClick={closeDropdown}
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
              <p className="text-sm text-center">Deposit Funds to proceed</p>
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
                  onClick={closeDropdown}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InfoPopup;
