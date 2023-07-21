import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
// center grid items
const Footer = () => {
  return (
    <>
      <div className="grid justify-items-center text-center">
        <div className="grid grid-cols-3 gap-4 w-4/5 py-10">
          <div className="flex flex-col">
            <h3 className="text-4xl font-bold text-cyan-700">About Us</h3>
            <p className="text-lg font-light mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              voluptatem, voluptatum, quia, quibusdam quisquam natus
              necessitatibus voluptate nemo quos doloremque quas. Quae
              voluptatem, voluptatum, quia, quibusdam quisquam natus
              necessitatibus voluptate nemo quos doloremque quas.
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-4xl font-bold text-cyan-700">Socials</h3>
            <div className="flex flex-row justify-center pl-3 mt-4">
              <Link href={"https://en-gb.facebook.com/"} target="_blank">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="text-4xl text-cyan-700 mr-4 hover:text-cyan-500 transition duration-300"
                />
              </Link>
              <Link href={"https://twitter.com"} target="_blank">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="text-4xl text-cyan-700 mr-4 hover:text-cyan-500 transition duration-300"
                />
              </Link>
              <Link href={"https://www.instagram.com/"} target="_blank">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-4xl text-cyan-700 mr-4 hover:text-cyan-500 transition duration-300"
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-4xl font-bold text-cyan-700">Contact Us</h3>
            <p className="text-lg font-light mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              voluptatem, voluptatum, quia, quibusdam quisquam natus
              necessitatibus voluptate nemo quos doloremque quas. Quae
              voluptatem, voluptatum, quia, quibusdam quisquam natus
              necessitatibus voluptate nemo quos doloremque quas.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
