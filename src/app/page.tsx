// Server Components
import QuickStats from './components/QuickStats';
import AboutProperty from './components/AboutProperty';
import Features from './components/Features';
import Location from './components/Location';
import Footer from './components/Footer';

// Client Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <QuickStats />
      <AboutProperty />
      <Features />
      <Gallery />
      <Location />
      <ContactForm />
      <Footer />
    </div>
  );
}