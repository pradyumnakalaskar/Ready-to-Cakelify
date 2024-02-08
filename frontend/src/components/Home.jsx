import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";
import Filters from "./layout/Filters";
import "./Home.css";
import Cake from "./Category/Cakes.png";
import JarCakes from "./Category/JarCakes.png";
import Pastry from "./Category/pastry.png";
import "./Category/Category.css";

const Home = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");

  const params = { page, keyword };

  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);
  ratings !== null && (params.ratings = ratings);

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  const columnSize = keyword ? 4 : 3;

  if (isLoading) return <Loader />;

  const textStyle = {
    fontFamily: "Sacramento",
    fontSize: "40px",
  };

  return (
    <>
      <MetaData title={"Buy Best Cakes Online"} />
      <div className="ForDesktop">
        <div className="row">
          {keyword && (
            <div className="col-6 col-md-3 mt-5">
              <Filters />
            </div>
          )}
          <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
            <h1 id="products_heading" className="text-secondary">
              {keyword
                ? `${data?.products?.length} Products found with keyword: ${keyword}`
                : "Latest Products"}
            </h1>

            <section id="products" className="mt-5">
              <div className="row">
                {data?.products?.map((product) => (
                  <ProductItem product={product} columnSize={columnSize} />
                ))}
              </div>
            </section>

            <CustomPagination
              resPerPage={data?.resPerPage}
              filteredProductsCount={data?.filteredProductsCount}
            />
          </div>
        </div>
      </div>

      {/* For Mobile Version */}

      <div className="ForMobile">
        <div>
          <div className="">
            {keyword && (
              <div className="">
                <Filters />
              </div>
            )}
            <img src="image1.png" className="image-1" alt="" />{" "}
            <h5 className="CategoryHeading"> Offers for you</h5>
            <div className="Offer">
              <h6 className="offerHeading">Up to &#8377;60 OFF</h6>
              <p className="offerPara">
                Get 30% off up to &#8377;60 on orders of &#8377;200
              </p>
            </div>
            <div className="divCategory">
              <h5 className="CategoryHeading">
                What &nbsp;<span style={textStyle}>tantalizing</span>{" "}
                &nbsp;treat is on your mind?
              </h5>
              <div className="productCategory">
                <div className="Cake">
                  <img src={Cake} alt="Cake" className="CategoryCake" />
                  <p className="categoryPara">Cakes</p>
                </div>
                <div className="JarCake">
                  <img
                    src={JarCakes}
                    alt="JarCakes"
                    className="CategoryJarCakes"
                  />
                  <p className="categoryPara">Jar Cakes</p>
                </div>
                <div className="Pastry">
                  <img src={Pastry} alt="Pastry" className="CategoryPastry" />
                  <p className="categoryPara">Pastries</p>
                </div>
              </div>
            </div>
          </div>
          <div className={keyword ? "" : ""}>
            <h1 id="products_heading" className="text-secondary">
              {keyword
                ? `${data?.products?.length} Products found with keyword: ${keyword}`
                : "Our Best Seller"}
            </h1>
          </div>
          <div className="">
            <section id="products" className="">
              <div className="cardNameCarouselProducts">
                {data?.products?.map((product) => (
                  <ProductItem product={product} columnSize={columnSize} />
                ))}
              </div>
            </section>
          </div>
          <CustomPagination
            resPerPage={data?.resPerPage}
            filteredProductsCount={data?.filteredProductsCount}
          />
          <img src="footer.png" className="footer" alt="" />
          <img src="footer-2.png" className="footer-2" alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;
