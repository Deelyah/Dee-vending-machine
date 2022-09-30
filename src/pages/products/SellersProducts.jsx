import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseCard from "../../components/base-components/BaseCard";
import { getSellersProducts } from "../../store/actions/Index";
import { Link } from "react-router-dom";

const SellersProucts = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState(null);
  const updatedProducts = useSelector((state) => {
    return state?.sellersProducts;
  });
  const profile = useSelector((state) => {
    return state?.profile;
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    getSellersProducts(token)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "SELLERS_PRODUCT", payload: res.data });
        setProducts(updatedProducts);
        console.log(products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updatedProducts]);
  return (
    <div>
      {!products && (
        <BaseCard>
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-semibold text-lg mb-4">
              {profile?.username}... You have no products😥
            </h2>
            <p>Don't worry, we've got you!</p>
            <Link
              to="/my-account/update-profile"
              className="bg-[#13113f] hover:bg-[#13113fe5] text-white px-4 py-2 mt-4 rounded-sm"
            >
              Add Products here
            </Link>
          </div>
        </BaseCard>
      )}
      {products && (
        <div>
          {products.map((product, index) => {
            return (
              <div key={index}>
                <BaseCard>{product.productName}</BaseCard>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SellersProucts;
