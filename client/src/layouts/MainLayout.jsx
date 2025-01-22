import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

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
