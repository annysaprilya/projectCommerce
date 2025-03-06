import React from "react";
import banner from "/banner.jpg";

const Hero = ({ imageUrl, title, description }) => {
  const hero = {
    position: "relative",
    width: "100%",
    height: "50vh", // Adjusted height to 50% of the viewport height
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
  };

  const heroImage = {
    position: "absolute",
    width: "100%",
    height: "auto",
    objectFit: "cover",
    zIndex: -1,
  };

  const heroContent = {
    textAlign: "center",
    color: "white",
    zIndex: 1,
    padding: "20px",
  };

  return (
    <div className="hero">
      <img src={banner} alt="Hero" style={hero} />
      <div style={heroContent}></div>
    </div>
  );
};

export default Hero;
