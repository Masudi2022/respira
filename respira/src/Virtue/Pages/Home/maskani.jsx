import React from "react";

// Import your homepage sections
import RespiraHome from "../Home/Home";
import Popular from "../destination/popular";
import FeaturedTours from "../feuturedTour/features";
import Experiences from "../experience/experience";
import WhyChooseUs from "../choosingUs/choosingUs";
import AboutUs from "../about/about";
import Testimonials from "../testimonial/testimonials";

/**
 * Maskani Page
 * This is the main FRONT PAGE that combines all homepage sections
 * Each section is a separate component for clean structure
 */

export default function Maskani() {
  return (
    <>
      {/* HERO / SLIDER SECTION */}
      <RespiraHome />

      {/* POPULAR DESTINATIONS SECTION */}
      <Popular />

      {/* You can continue adding sections below */}
      <FeaturedTours />
      <Experiences />
      <WhyChooseUs />
      <AboutUs />
      {/* <WhyChooseUs /> */}
      <Testimonials />
      {/* <Footer /> */}
    </>
  );
}
