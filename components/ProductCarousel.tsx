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

const ProductCarousel: FunctionComponent<ProductCarouselProps> = ({
  items
}) => {
  const hasWindow = typeof window !== "undefined";
  const windowWidth = hasWindow ? window.innerWidth : 0;
  const [scroll, setScroll] = useState("0");
  const scrollDistance = windowWidth > 768 ? 750 : 255;

  const leftArrowRef = useRef<HTMLDivElement>(null);
  const rightArrowRef = useRef<HTMLDivElement>(null);
  const productContainerRef = useRef<HTMLDivElement>(null);

  const lastProductRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: lastProductRef.current,
    threshold: 1,
  });

  if (entry?.isIntersecting) {
    const rightArrow = rightArrowRef.current;
    if (rightArrow) {
      rightArrow.style.display = "none";
    }
  }

  useEffect(() => {
    const updateScroll = async () => {
      const productContainer = productContainerRef.current;
      const leftArrow = leftArrowRef.current;
      if (productContainer) {
        productContainer.style.transform = `translateX(${scroll}px)`;
      }
      if (leftArrow) {
        if (scroll == "0") {
          leftArrow.style.display = "none";
        } else if (scroll != "0") {
          leftArrow.style.display = "block";
        }
      }
    };
    updateScroll();
  }, [scroll]);

  const handleClick = async (type: string) => {
    const productContainer = productContainerRef.current;
    const rightArrow = rightArrowRef.current;
    const scrollWidth = await productContainer?.scrollWidth;
    if (scrollWidth) {
      if (type == "-") {
        if (rightArrow) {
          rightArrow.style.display = "block";
        }
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
    <div className="mb-4 md:mb-10 w-[100%] overflow-hidden">
      <div
        ref={leftArrowRef}
        className="absolute h-[350px]  left-[-35px] md:left-0 z-10 hover:scale-110 hover:cursor-pointer hover:brightness-200 transition duration-200 ease-in-out"
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
        ref={rightArrowRef}
        className="absolute h-[350px] right-0 z-10 hover:cursor-pointer hover:scale-110 hover:brightness-200 transition duration-200 ease-in-out"
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
      <div
        ref={productContainerRef}
        className="flex flex-row min-w-fit overflow-hidden transition duration-500 ease-in-out"
      >
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
