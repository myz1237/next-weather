import type { NextPage } from "next";
import Head from "next/head";

import FamousPlace from "./components/FamousPlace";
import SearchBox from "./components/SearchBox";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Weather App - Next</title>
      </Head>

      <div className="home">
        <div className="container">
          <SearchBox placeholder="Search for a city" />
          <FamousPlace />
        </div>
      </div>
    </div>
  );
};

export default Home;
