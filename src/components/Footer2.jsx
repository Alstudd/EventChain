import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaTwitch,
} from "react-icons/fa";
import img from "../assets/Home/ultimate2.svg";

const Footer = () => {
  return (
    <div className="w-full py-8 md:px-2 px-10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8">
        <img className="col-span-2 w-[20rem]" src={img} alt="" />
        <div className="mt-6">
          <h6 className="font-bold uppercase py-2">Features</h6>
          <ol>
            <li className="py-2">Attendance Tracking</li>
            <li className="py-2">Engagement Rewards</li>
            <li className="py-2">Blockchain Security</li>
          </ol>
        </div>
        <div className="mt-6">
          <h6 className="font-bold uppercase py-2">Links</h6>
          <div className="flex flex-col">
            <a className="py-2 w-10" href="/">
              Home
            </a>
            <a className="py-2 w-10" href="/about">
              About
            </a>
            <a className="py-2 w-10" href="/contact">
              Contact
            </a>
          </div>
        </div>
        <div className="col-span-2 mt-6 md:pt-2">
          <p className="font-bold uppercase">Subscribe for Event Updates</p>
          <p className="py-4">
            Get the latest news, event updates, and reward offers delivered to
            your inbox.
          </p>
          <form className="flex flex-col sm:flex-row">
            <input
              className="w-full p-2 mr-4 rounded-md mb-2 border-2 border-black"
              type="email"
              placeholder="Enter email"
            />
            <button
              className="p-3 mb-2 bg-[#00b386] text-white rounded-md text-center"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col max-w-[1280px] px-2 py-4 m-auto justify-between sm:flex-row text-center text-gray-500 items-center">
        <p>
          2024 <span className="text-[#00b386]">EventChain</span>, All rights
          reserved.
        </p>
        <div className="flex justify-between sm:w-[300px] pt-4 text-2xl gap-2">
          <FaFacebook />
          <FaGithub />
          <FaInstagram />
          <FaTwitch />
          <FaTwitter />
        </div>
      </div>
    </div>
  );
};

export default Footer;
