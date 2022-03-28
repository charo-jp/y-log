import React from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import "./IntroductionCategory.css";
const IntroductionCategory = (props) => {
  const { title, intro, categories } = props;
  return (
    <div className="introduction-container">
      <h2 className="introduction-title">
        {title}{" "}
        <span className="help-out">
          <HelpOutlineIcon fontSize="small" sx={{ verticalAlign: "middle" }} />
        </span>
      </h2>
      <p className="introduction-intro">{intro}</p>
      <div className="introduction-cards-container">
        {categories &&
          categories.map((category) => (
            <Card className="introduction-card" key = {category.alt}>
              <CardActionArea
                className="introduction-card-action"
                component={Link}
                to={category.to}
              >
                <CardMedia
                  component="img"
                  height="200"
                  src={category.picture}
                  alt={category.alt}
                  loading = "lazy"
                />
              </CardActionArea>
              <CardContent>
                <h3 className="introduction-category">{category.category}</h3>
                <p className="introduction-about">{category.about}</p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default IntroductionCategory;
