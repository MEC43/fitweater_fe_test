import { useState } from "react";

import Header from "../components/Header";
import PresentWeather from "../components/PresentWeather";
import WeatherTalk from "../components/WeatherTalk";
import Avatar from "../components/Avatar";
import Hours from "../components/Hours";
import Weekly from "../components/Weekly";
import Footer from "../components/Footer";

import bgStyle from "../css/MainWeatherBG.module.css";
import MainWeatherBG from "../components/MainWeatherBG";

const IndexPage = () => {
  const [matchingUrl, setMatchingUrl] = useState({
    tops: "",
    bottoms: "",
    outers: "",
  });

  return (
    <>
      <Header />
      <main className="mw">
        <div className={bgStyle.MainweatherBGcon}>
          <MainWeatherBG />

          <PresentWeather />
          <WeatherTalk setMatchingUrl={setMatchingUrl} />
          <Avatar
            topUrl={matchingUrl.tops}
            bottomUrl={matchingUrl.bottoms}
            outerUrl={matchingUrl.outers}
          />
        </div>
        <Hours />
        <Weekly />
        <Footer />
      </main>
    </>
  );
};

export default IndexPage;
