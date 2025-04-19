import Navbar from "../components/Navbar";
import { 
  Hero, 
  About, 
  Services, 
  Products, 
  Projects, 
  Contact, 
  Footer 
} from "../components/home";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Products />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
