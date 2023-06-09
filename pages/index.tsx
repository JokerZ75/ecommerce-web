import React from "react";
import { Product, FooterBanner, HeroBanner} from "../components"

const Home = () => {
  return (
    <>
      <main className="h-screen">
        <HeroBanner/>
        <div className="text-4xl text-cyan-700 font-extrabold m-12 mt-8 grid justify-center">
          <h2 className="">Best Selling Products</h2>
          <p className="text-cyan-600 font-normal opacity-75 text-lg justify-self-center">
            All the of the best
          </p>
        </div>
        <div className="grid justify-center">{["product 1", "product 2"].map((product) => product)}
        </div>
      </main>
      <FooterBanner/>
    </>
  );
};
export default Home;
