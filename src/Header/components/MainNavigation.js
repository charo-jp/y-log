import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from "@mui/material/List";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import "./MainNavigation.css";

const MainNavigation = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [droppedForPortfolio, isDroppedForPortfolio] = useState(false);
  const [droppedForBlog, isdroppedForBlog] = useState(false);
  const toggleDrawer = open =>  event => {
    if (event.type  === "keydown" && event.type === "tab" || event.key === "Shift"){
      return;
    }
    setOpenDrawer(open);
  }

  const handleDropDownForPortfolio = () => {
    isDroppedForPortfolio(!droppedForPortfolio);
  }

  const handleDropDownForBlog = () => {
    isdroppedForBlog(!droppedForBlog);
  }

  const font = {
    fontFamily: "Dongle, sans-serif",
    fontSize: "28px",
    color: "black"
  };

  const fontForCollapse = {
    fontFamily: "Dongle, sans-serif",
    fontSize: "24px",
    height: "30px",
    paddingLeft: "15px"
  };

  useEffect(() => {
    if (openDrawer === false) {
      isDroppedForPortfolio(false);
      isdroppedForBlog(false);
    }
  }, [openDrawer])

  return (
    <div className="main-nav">
      <div className="site-title">
        <h1>
          <Link to="/" className="title">Y-log</Link>
        </h1>
      </div>
      <div className="nav-menu">
      <button 
        onClick = {toggleDrawer(true)}
        className = "hamburger-menu"
      >
          <MenuIcon className = "hamburger" />
      </button>
      <Drawer
        anchor = "right"
        open = {openDrawer}
        onClose = {toggleDrawer(false)} 
      >
        <List>
          <ListItemButton component = {Link} to="/" onClick = {toggleDrawer(false)}>
          <ListItemText primary = "Home" primaryTypographyProps = {font} />
          </ListItemButton>
          <ListItemButton onClick = {handleDropDownForPortfolio}>
            <ListItemText primary = "Portfolio" primaryTypographyProps = {font}/>
            {droppedForPortfolio ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in = {droppedForPortfolio} timeout = "auto" unmountOnExit>
            <List disablePadding>
              <ListItemButton component = {Link} to="/portfolio/web-related" onClick = {toggleDrawer(false)}>
                <ListItemText primary = "Web Related" primaryTypographyProps = {fontForCollapse}/>
              </ListItemButton>
              <ListItemButton component = {Link} to="/portfolio/ai-related" onClick = {toggleDrawer(false)}>
                <ListItemText primary = "AI Related" primaryTypographyProps = {fontForCollapse}/>
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton onClick = {handleDropDownForBlog}>
            <ListItemText primary = "Blog" primaryTypographyProps = {font}/>
            {droppedForBlog ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in = {droppedForBlog} timeout = "auto" unmountOnExit>
            <List disablePadding>
              <ListItemButton component = {Link} to="/blog/tech" onClick = {toggleDrawer(false)}>
                <ListItemText primary = "Tech" primaryTypographyProps = {fontForCollapse}/>
              </ListItemButton>
              <ListItemButton component = {Link} to="/blog/productivity" onClick = {toggleDrawer(false)}>
                <ListItemText primary = "Productivity" primaryTypographyProps = {fontForCollapse}/>
              </ListItemButton>
              <ListItemButton component = {Link} to="/blog/life" onClick = {toggleDrawer(false)}>
                <ListItemText primary = "Life"primaryTypographyProps = {fontForCollapse} />
              </ListItemButton>
              <ListItemButton component = {Link} to="/blog/nba" onClick = {toggleDrawer(false)}>
                <ListItemText primary = "NBA" primaryTypographyProps = {fontForCollapse}/>
              </ListItemButton>
              <ListItemButton component = {Link} to="/blog/charo" onClick = {toggleDrawer(false)}>
                <ListItemText primary = "Charo" primaryTypographyProps = {fontForCollapse}/>
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton component = {Link} to="/contact" onClick = {toggleDrawer(false)}>
            <ListItemText primary = "Contact" primaryTypographyProps = {font}/>
          </ListItemButton>
          <ListItemButton component = {Link} to="/admin" onClick = {toggleDrawer(false)}>
            <ListItemText primary = "Admin" primaryTypographyProps = {font}/>
          </ListItemButton>
          </List>
        </Drawer>
      </div>
    </div>
  );
};

export default MainNavigation;
