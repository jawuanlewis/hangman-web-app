import { Outlet } from "react-router-dom";
import Header from "@/components/global/Header";
import NavBar from "@/components/global/NavBar";
import Footer from "@/components/global/Footer";

const MainLayout = () => {
  return (
    <>
      <div className="header-and-nav">
        <Header title="Hangman" />
        <NavBar />
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
