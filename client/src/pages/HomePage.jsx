import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Levels from "@/components/Levels";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <>
      <div className="header-and-nav">
        <Header title="Hangman" type="homepage-header" />
        <NavBar />
      </div>
      <main>
        <section>
          <div className="head-text">
            <label>Welcome! Choose a level to play below:</label>
          </div>
          <br></br><br></br>
          <Levels />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
