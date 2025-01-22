import React from "react";
import Hero from "./components/hero";
import Brand from "@/app/components/brand";
import Club from "./components/club";
import Desktop from "./components/desktop";
import Fetch1 from "./components/fetch1";
import Fetch2 from "./components/fetch2";

const Home = () => {
  return (
    <div>
      <Hero />
      <Brand />
      <Fetch1 />
      <Fetch2 />
      <Club />
      <Desktop />
    </div>
  );
};

export default Home;
