import React from "react";

import HomeComponent from "../components/HomeComponent";
import IntroductionCategory from "../components/IntroductionCategory";

import helloAvif from "../../../assets/hello.avif";
import charoAvif from "../../../assets/charo.avif";

import webRelatedAvif from "../../../assets/web-related.avif";
import aiRelatedAvif from "../../../assets/ai-related.avif";
import techAvif from "../../../assets/tech.avif";
import productivityAvif from "../../../assets/productivity.avif";
import lifeAvif from "../../../assets/life.avif";
import nbaAvif from "../../../assets/nba.avif";
import charoathomeAvif from "../../../assets/charoathome.avif";



const Home = () => {
  const portfolio = [
    {
      category: "Web-related",
      about:
        "It contains portfolios which includes HTML, CSS, JavaScript, React, MERN stack and so on.",
      to: "/portfolio/web-related",
      picture: webRelatedAvif,
      alt: "web-related",
    },
    {
      category: "AI-related",
      about: "It shows my work for AI (Machine Learning). ",
      to: "/portfolio/ai-related",
      picture: aiRelatedAvif,
      alt: "ai-related",
    },
  ];

  const blog = [
    {
      category: "Tech",
      about:
        "I write articles about programming (MERN stack, HTML, CSS, JavaScript and AI) in a simple yet comprehensible way.",
      to: "/blog/tech",
      picture: techAvif,
      alt: "tech",
    },
    {
      category: "Productivity",
      about:
        "It is just me trying to become a productive person. I research about how to improve productivity and share tips.",
      to: "/blog/productivity",
      picture: productivityAvif,
      alt: "productivity",
    },
    {
      category: "Life",
      about:
        "Just a blog that tells you about what happended in my life.",
      to: "/blog/life",
      picture: lifeAvif,
      alt: "life",
    },
    {
      category: "NBA",
      about:
        "I have been a fan of NBA for 4 years, Here, I talk about anything pertaining to the NBA Basketball",
      to: "/blog/nba",
      picture: nbaAvif,
      alt: "nba",
    },
    {
      category: "Charo",
      about:
        "I have been a fan of NBA for 4 years, Here, I talk about anything pertaining to the NBA Basketball",
      to: "/blog/charo",
      picture: charoathomeAvif,
      alt: "charo",
    }
  ];

  return (
    <React.Fragment>
      <HomeComponent
        title="About"
        avif = {helloAvif}
        alt="profile pic"
        cNamePic="about-me-pic"
        cNameCon="about-me-content"
      >
        Hello, I am Yuya Hochi. I changed my expertise from mechanical
        engineering to Computer Science after graduating college. I am now
        preparing for a CS course which starts this September in the UK. While
        waiting for the departure, I have taught myself MERN stack and published
        this website “Y-log”. In this blog I attach some web-and-ai-related
        portfolios and post articles about tech, my hobbies and a part of my
        family Charo.
      </HomeComponent>
      <IntroductionCategory
        title="Portfolio"
        intro="Portfolio is a place where you can see all of my past work. I focus on Web related and AI related portfolios."
        categories={portfolio}
      />
      <IntroductionCategory
        title="Blog"
        intro="There are 5 categories in blog; Tech, Productivity, Travel, NBA and Charo. You will never get bored reading each article."
        categories={blog}
      />
      <HomeComponent
        title="Hello! This is Charo!"
        avif = {charoAvif}
        alt="charo"
        cNamePic="about-charo-pic"
        cNameCon="about-charo-content"
      >
        This is my dog Charo. She is a girl and 11 year-old pomeranian. She has
        been a part of my family for 11 years and we love her. The picture on
        the right is taken when she begged a piece of carrot (her favorite
        vegetable) from me. There are plenty of pictures of her in Blog Charo.
      </HomeComponent>
    </React.Fragment>
  );
};

export default Home;
