import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import StarRatings from "react-star-ratings";
import "./button.css";

const ProductItem = ({ product, columnSize }) => {
  return (
    <>
      {" "}
      <div className={`col-sm-12 col-md-6 col-lg-${columnSize} my-3`}>
        <div className="cardProduct">
          <img
            className="card-img-top mx-auto"
            src={
              product?.images[0]
                ? product?.images[0]?.url
                : "/images/default_product.png"
            }
            alt={product?.name}
          />
          <div className="card-body  d-flex justify-content-center flex-column ">
            <h5 className="card-title">
              <Link to={`/product/${product?._id}`}>{product?.name}</Link>
            </h5>
            <div className="ratings mt-auto d-flex">
              <StarRatings
                rating={product?.ratings}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="1px"
              />
              <span id="no_of_reviews" className="pt-2 ps-2">
                {" "}
                ({product?.numOfReviews})
              </span>
            </div>
            <p className="card-text mt-2">&#8377;{product?.price}</p>
            <Link
              to={`/product/${product?._id}`}
              id="view_btn"
              className="button-6"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
