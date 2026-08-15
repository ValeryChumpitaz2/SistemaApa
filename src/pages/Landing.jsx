import Navbar from "../components/common/Navbar";

import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Process from "../components/landing/Process";
import SemesterProgress from "../components/landing/SemesterProgress";
import Users from "../components/landing/Users";
import Testimonials from "../components/landing/Testimonials";
import FAQ from "../components/landing/FAQ";
import CTA from "../components/landing/CTA";

import Footer from "../components/common/Footer";


export default function Landing() {

  return (

    <div className="min-h-screen bg-white">

      <Navbar />

      <main>

        <Hero />

        <Features />

        <Process />

        <SemesterProgress />

        <Users />

        <Testimonials />

        <FAQ />

        <CTA />

      </main>

      <Footer />

    </div>

  );

}