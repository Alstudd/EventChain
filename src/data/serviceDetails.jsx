import { MdAnalytics, MdSafetyCheck, MdBook } from "react-icons/md";

const ourServices = [
  {
    icon: <MdSafetyCheck />,
    heading: "High-Level Security",
    detail:
      "Using blockchain, we ensure the highest level of security for event data and transactions. Attendance records and rewards are verifiable and tamper-proof, ensuring trustworthy experiences.",
  },
  {
    icon: <MdAnalytics />,
    heading: "Engagement Rewards",
    detail:
      "EventChain intelligently distributes rewards like tokens, badges, or NFTs based on attendee engagement, offering personalized perks to enhance the event experience.",
  },
  {
    icon: <MdBook />,
    heading: "Attendee Profiles",
    detail:
      "Create comprehensive profiles that reflect your participation and engagement across events. Whether you're an attendee or an organizer, EventChain ensures you get recognized for your contributions.",
  },
];

export default ourServices;
