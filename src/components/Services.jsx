import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiNetworkChart } from "react-icons/bi";
import { RiTimeFill } from "react-icons/ri";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">{subtitle}</p>
    </div>
  </div>
);

const Services = () => (
  <div className="flex w-full justify-center items-center gradient-bg-transactions pb-20">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
          Services that we
          <br />
          continue to improve
        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          EventChain provides a seamless event experience, secure attendance
          tracking, and real-time insights, empowering both organizers and
          attendees to make the most of every event.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Verified Participation"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="Attendance is authenticated and secured through blockchain-backed NFTs, guaranteeing tamper-proof records and genuine engagement."
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Efficient Queue Management"
          icon={<BiNetworkChart fontSize={21} className="text-white" />}
          subtitle="Our system optimizes check-in processes and ensures smooth crowd flow, making large-scale events more manageable and enjoyable for attendees."
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Real-time Insights"
          icon={<RiTimeFill fontSize={21} className="text-white" />}
          subtitle="Stay updated with real-time insights into attendee engagement, event analytics, and participation trends, giving organizers a competitive edge."
        />
      </div>
    </div>
  </div>
);

export default Services;
