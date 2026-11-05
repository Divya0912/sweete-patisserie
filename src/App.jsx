import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import SignatureCakes from "./components/SignatureCakes.jsx";
import AboutUs from "./components/AboutUs";
import Collection from "./components/Collection.jsx";
import Review from "./components/Review.jsx";
import Contact from "./components/Contact.jsx";

function App() {
    return (
        <main>
            <Navbar/>
            <Hero />
            <SignatureCakes/>
            <AboutUs/>
            <Collection />
            <Review/>
            <Contact />
            {/* Rest of your page sections go here */}
        </main>
    );
}

export default App;
