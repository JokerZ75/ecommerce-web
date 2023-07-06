import React from "react";
import product from "../pages/product";
interface ProductInterface {
  brand: string;
  format: string;
  tags: string[];
  name: string;
  image_url: string;
  category: string;
  price: number;
  _id: number;
}

const Product = (product: ProductInterface) => {
  return (
    <div>
      {product.name}
      {product.image_url}
      {/* <img src={product.image_url} alt="" /> */}
    </div>
  );
};

export default Product;
