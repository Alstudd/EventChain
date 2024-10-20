import Home from "./pages/Home";
import { Navbar, Welcome, Footer, Services, Transactions } from "./components";
import HeroSection from "./components/Home/HeroSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main";
import Discover from "./pages/Discover";
import Create from "./components/Create";
import EventSlider from "./components/EventSlider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: (
          <div className="min-h-screen overflow-x-hidden">
            <div className="gradient-bg-welcome">
              <Navbar />
              <HeroSection />
            </div>
            <Home />
            <Footer />
          </div>
        ),
      },
      {
        path: "/discover",
        element: (
          <div className="min-h-screen overflow-x-hidden">
            <div className="gradient-bg-welcome">
              <Navbar />
              {/* <Discover /> */}
              <EventSlider />
            </div>
            <Footer />
          </div>
        ),
      },
      {
        path: "/create",
        element: (
          <div className="min-h-screen overflow-x-hidden">
            <div className="gradient-bg-welcome">
              <Navbar />
              <Create />
            </div>
            <Footer />
          </div>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
