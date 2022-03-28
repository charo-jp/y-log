const nameCategoryHandler = (path) => {
  let name, category
  if (path.includes("blog")){
    name = "blog";
    if (path.includes("tech")){
      category = "tech"; 
    }
    if (path.includes("productivity")){
      category = "productivity"; 
    }
    if (path.includes("life")){
      category = "life"; 
    }
    if (path.includes("nba")){
      category = "nba"; 
    }
    if (path.includes("charo")){
      category = "charo"; 
    }
  }else {
    name = "portfolio"
    if (path.includes("ai")) {
      category = "ai-related";
    }else {
      category = "web-related";
    }
  }
  return {name, category};
}

export default nameCategoryHandler;