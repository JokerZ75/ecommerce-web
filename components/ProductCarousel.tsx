import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import { Product } from "../components";
import { useIntersection } from "@mantine/hooks";
import { machine } from "os";
import { parse } from "path";

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
  type?: "autoScroll" | null;
}

const ProductCarousel: FunctionComponent<ProductCarouselProps> = ({
  items,
  type,
}) => {
  const [scroll, setScroll] = useState("0");
  const scrollDistance = 750;

  const leftArrowRef = useRef<HTMLDivElement>(null);
  const rightArrowRef = useRef<HTMLDivElement>(null);
  const productContainerRef = useRef<HTMLDivElement>(null);

  const lastProductRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: lastProductRef.current,
    threshold: 0,
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
      if (type == "autoScroll") {
        if (leftArrow) leftArrow.style.display = "none";
        if (rightArrowRef.current) rightArrowRef.current.style.display = "none";
        if (productContainer) {
          const scrollWidth = productContainer.childNodes.length * 150;
          if (parseInt(scroll) - 150 <= -scrollWidth) {
            setScroll((scroll) => (0).toString());
          } 
        }
      }
      if (productContainer) {
        productContainer.style.transform = `translateX(${scroll}px)`;
      }
      if (leftArrow) {
        if (scroll == "0") {
          leftArrow.style.display = "none";
        } else if (type != "autoScroll") {
          leftArrow.style.display = "block";
        }
      }
    };
    updateScroll();
  }, [scroll]);

  useMemo(() => {
    if (type == "autoScroll") {
      const auto = async () => {
        setInterval(() => {
          setScroll((scroll) => (parseInt(scroll) - 150).toString());
        }, 1500);
      };
      auto();
    }
  }, []);

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
    <div className="mb-10 w-[100%] overflow-hidden">
      <div
        ref={leftArrowRef}
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
        ref={rightArrowRef}
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
