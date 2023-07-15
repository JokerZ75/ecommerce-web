import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Product } from "../components";

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

const ProductCarousel = ( {items}:any) => {
    const [scroll, setScroll] = useState("0");
    useEffect(() => {
      const effect = async () => {
        const updateScroll = async () => {
          const productContainer = await document.querySelector<HTMLElement>(
            ".min-w-fit"
          );
          if (productContainer) {
            productContainer.style.transform = `translateX(${scroll}px)`;
          }
        };
        await updateScroll();
  
        const productContainer = await document.querySelector<HTMLElement>(
          ".min-w-fit"
        );
        const scrollWidth = await productContainer?.scrollWidth;
        if (scrollWidth) {
          const leftArrow = await document.getElementById("left-arrow");
          const rightArrow = await document.getElementById("right-arrow");
          if (leftArrow && rightArrow) {
            if (scroll == "0") {
              leftArrow.style.display = "none";
            }
            if (parseInt(scroll) < 0) {
                leftArrow.style.display = "block";
            }
            if (parseInt(scroll) - 1750 <= -scrollWidth) {
              rightArrow.style.display = "none";
            }
  
            if (parseInt(scroll) - 1750 > -scrollWidth) {
              rightArrow.style.display = "block";
            }
          }
        }
      };
      effect();
    }, [scroll]);
  
    const handleClick = async (type: string) => {
      const productContainer = await document.querySelector<HTMLElement>(
        ".min-w-fit"
      );
      const scrollWidth = await productContainer?.scrollWidth;
      if (scrollWidth) {
        if (type == "-") {
          if (parseInt(scroll) + 1750 >= 0) {
            setScroll((scroll) => (0).toString());
          } else {
            setScroll((scroll) => (parseInt(scroll) + 1750).toString());
          }
        } else if (type == "+") {
          if (parseInt(scroll) - 1750 <= -scrollWidth) {
          } else {
            setScroll((scroll) => (parseInt(scroll) - 1750).toString());
          }
        }
      }
    };

    return (
        <div>
        <div className="absolute h-[350px] left-0 z-10 hover:scale-110 hover:brightness-200 transition duration-200 ease-in-out ">
          <FontAwesomeIcon
            id="left-arrow"
            className="text-6xl text-cyan-700 font-extrabold m-12 mb-4 mt-[70%] grid justify-center"
            icon={faChevronCircleLeft}
            onClick={() => {
              handleClick("-");
            }}
          />
        </div>
        <div
          className="absolute h-[350px] right-0 z-10 hover:scale-110 hover:brightness-200 transition duration-200 ease-in-out"
          onClick={() => {
            handleClick("+");
          }}
        >
          <FontAwesomeIcon
            id="right-arrow"
            className="text-6xl text-cyan-700 font-extrabold m-12 mb-4 mt-[70%] grid justify-center"
            icon={faChevronCircleRight}
          />
        </div>
        <div className="flex flex-row min-w-fit overflow-hidden transition duration-500 ease-in-out">
          {items.map((product: ProductInterface) => (
            <Product {...product} key={product._id} />
          ))}
        </div>
      </div>
    )
    

}

export default ProductCarousel;