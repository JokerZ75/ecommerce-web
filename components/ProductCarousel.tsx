import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Product } from "../components";
import { useIntersection } from "@mantine/hooks";

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

interface ProductCarouselProps {
  items: ProductInterface[];
}

const ProductCarousel : FunctionComponent<ProductCarouselProps> = ( { items } ) => {
  const [scroll, setScroll] = useState("0");
  const scrollDistance = 750;

  const lastProductRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: lastProductRef.current,
    threshold: 0.5,
  });

  if (entry?.isIntersecting) {
    const rightArrow = document.querySelector<HTMLElement>("#right-arrow");
    if (rightArrow) {
      rightArrow.style.display = "none";
    }
  }

  useEffect(() => {
    const updateScroll = async () => {
      const productContainer = await document.querySelector<HTMLElement>(
        ".min-w-fit"
      );
      const leftArrow = await document.querySelector<HTMLElement>(
        "#left-arrow"
      );
      if (productContainer) {
        productContainer.style.transform = `translateX(${scroll}px)`;
      }
      if (leftArrow) {
        if (scroll == "0") {
          leftArrow.style.display = "none";
        } else {
          leftArrow.style.display = "block";
        }
      }
    };
    updateScroll();
  }, [scroll]);

  const handleClick = async (type: string) => {
    const productContainer = await document.querySelector<HTMLElement>(
      ".min-w-fit"
    );
    const rightArrow = await document.querySelector<HTMLElement>("#right-arrow");
    const scrollWidth = await productContainer?.scrollWidth;
    if (scrollWidth) {
      if (type == "-") {
        if (rightArrow) {rightArrow.style.display = "block";}
        if (parseInt(scroll) + scrollDistance >= 0) {
          setScroll((scroll) => (0).toString());
        } else {
          setScroll((scroll) => (parseInt(scroll) + scrollDistance).toString());
        }
      } else if (type == "+") {
        if (parseInt(scroll) - scrollDistance + 150 <= -scrollWidth) {
        } else {
          setScroll((scroll) => (parseInt(scroll) - scrollDistance).toString());
        }
      }
    }
  };

  return (
    <div>
      <div
        className="absolute h-[350px] left-0 z-10 hover:scale-110 hover:brightness-200 transition duration-200 ease-in-out"
        onClick={() => {
          handleClick("-");
        }}
      >
        <FontAwesomeIcon
          id="left-arrow"
          className="text-6xl text-red-300 font-extrabold m-12 mb-4 mt-[70%] grid justify-center"
          icon={faChevronCircleLeft}
        />
      </div>
      <div
        className="absolute h-[350px] right-0 z-10 hover:scale-100 hover:brightness-200 transition duration-200 ease-in-out"
        onClick={() => {
          handleClick("+");
        }}
      >
        <FontAwesomeIcon
          id="right-arrow"
          className="text-6xl text-red-300 font-extrabold m-12 mb-4 mt-[70%] grid justify-center"
          icon={faChevronCircleRight}
        />
      </div>
      <div className="flex flex-row min-w-fit overflow-hidden transition duration-500 ease-in-out">
        {items.map((product: ProductInterface, index: number) => {
          if (items.length - 1 == index) {
            return (
              <div key={product._id} ref={ref}>
                <Product {...product} />
              </div>
            );
          }
          return <Product key={product._id} {...product} />;
        })}
      </div>
    </div>
  );
};

export default ProductCarousel;
