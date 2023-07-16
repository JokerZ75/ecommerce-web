import React from "react";
import Link from "next/link";
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FooterBanner = () => {
  return (
    <>
      <div>
        <div className="bg-black h-96 flex flex-col justify-center items-center">
          <h1 className="text-white text-5xl font-bold">Get in touch</h1>
          <p className="text-white text-2xl font-light">
            We are always here to help
          </p>
          <div className="flex flex-row justify-center items-center mt-10">
            <Link href="https://www.facebook.com/">
              <p className="text-white text-4xl mr-4">
                <FontAwesomeIcon icon={faFacebookSquare} />
              </p>
            </Link>
            <Link href="https://www.instagram.com/">
              <p className="text-white text-4xl mr-4">
                <FontAwesomeIcon icon={faInstagramSquare} />
              </p>
            </Link>
            <Link href="https://twitter.com/">
              <p className="text-white text-4xl mr-4">
                <FontAwesomeIcon icon={faTwitterSquare} />
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterBanner;
