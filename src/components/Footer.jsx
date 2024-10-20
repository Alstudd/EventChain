import React from "react";

import logo from "../images/logo.svg";

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <a href="/">
      <div className="flex flex-[0.5] justify-center items-center gap-4">
        <img src={logo} alt="logo" className="w-12 h-11 rounded-full" />
        <h1 className="text-white text-4xl font-extrabold">EventChain</h1>
      </div>
      </a>
      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <a href="/"><p className="text-white text-base text-center mx-2 cursor-pointer">Home</p></a>
        <a href="/discover"><p className="text-white text-base text-center mx-2 cursor-pointer">Discover</p></a>
        <a href="/create"><p className="text-white text-base text-center mx-2 cursor-pointer">Create</p></a>
        <a href="#"><p className="text-white text-base text-center mx-2 cursor-pointer">Profile</p></a>
      </div>
    </div>

    <div className="flex justify-center items-center flex-col mt-5">
      <p className="text-white text-sm text-center">Come join us and hear for the unexpected miracle</p>
      <p className="text-white text-sm text-center font-medium mt-2">EventChain@gmail.com</p>
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <p className="text-white text-left text-xs">@EventChain2024</p>
      <p className="text-white text-right text-xs">All rights reserved</p>
    </div>
  </div>
);

export default Footer;