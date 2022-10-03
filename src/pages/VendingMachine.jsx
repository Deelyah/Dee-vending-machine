import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import present1 from "../assets/present1.jpg";
import present2 from "../assets/present2.jpg";
import present3 from "../assets/present3.jpg";
import present4 from "../assets/present4.jpg";
import present5 from "../assets/present5.jpg";
import present6 from "../assets/present6.jpg";
import { getAllProducts } from "../store/actions/Index";

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
  const [popUpIsVisible, setPopUpIsVisible] = useState(false);

  const allProducts = useSelector((state) => state?.allProducts);
  useEffect(() => {
    getAllProducts()
      .then((res) => {
        dispatch({ type: "ALL_PRODUCTS", payload: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const buyProduct = (index) => {
    setPopUpIsVisible(true);
    console.log(allProducts[index]);
  };

  const closeDrop = (e) => {
    e.stopPropagation();
    setPopUpIsVisible(false);
    console.log(popUpIsVisible);
  };
  return (
    <div className="w-full flex justify-center">
      <div className="w-2/3 flex">
        <div className="w-full">
          <div className="p-5 flex flex-wrap justify-center w-full">
            {allProducts?.map((product, index) => (
              <div
                className="meeeeeeeeee px-2 basis-1/4 mb-8"
                key={index}
                onClick={() => {
                  buyProduct(index);
                }}
              >
                <div className="bg-white shadow-md p-4 rounded border-2 h-full border-transparent hover:border-[#13113f]">
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
                    <p className="text-center text-sm">{product.description}</p>
                    <p className="text-center text-sm">${product.cost}</p>
                  </div>
                </div>

                {popUpIsVisible && (
                  <div className="fixed inset-0 bg-white">
                    <button
                      className="bg-white"
                      onClick={(e) => closeDrop(e, index)}
                    >
                      close
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendingMachine;
