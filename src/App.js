import React, { useCallback, useState , Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAdmin } from "./shared/hooks/admin-hook";

import { AdminContext } from "./shared/contexts/AdminContext";
import Header from "./Header/pages/Header";
import Home from "./Body/Home/pages/Home";
import Footer from "./footer/pages/Footer";
import Loading from "./shared/components/Loading";

import "./App.css";


const Portfolio = React.lazy(() => import("./Body/Portfolio/pages/Portfolio"));
const Blog = React.lazy(() => import("./Body/Blog/pages/Blog"));
const Contact = React.lazy(() => import( "./Body/Contact/pages/Contact"));
const Login = React.lazy(() => import( "./admin/pages/Login"));
const SomethingRelated = React.lazy(() => import("./shared/components/UIElements/SomethingRelated"));
const PortfolioArticle = React.lazy(() => import ("./Body/Portfolio/components/PortfolioArticle"));
const BlogArticle = React.lazy(() => import ("./Body/Blog/components/BlogArticle"));


const Admin = React.lazy(() => import("./admin/pages/Admin"));
const Select = React.lazy(() => import("./admin/components/Select"));
const CreateNewPost = React.lazy(() =>
  import("./admin/components/CreateNewPost")
);
const UpdatePost = React.lazy(() => import("./admin/components/UpdatePost"));
const ListOfPost = React.lazy(() => import("./admin/components/ListsOfPost"));
const ListOfContact = React.lazy(() =>
  import("./admin/components/ListOfContact")
);

function App() {
  // isAdmin is for layout.
  const [isAdmin, setAdmin] = useState(false);
  const handleAdmin = useCallback((pathname) => {
    if (pathname.match("/admin")) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  });

  // admin login
  const { token, login, logout } = useAdmin();
  let adminRoutes;

  if (token) {
    adminRoutes = (
      <Route path="/admin" element={<Admin setAdmin={handleAdmin} />}>
        <Route path="" element={<Select />} />
        <Route path="portfolio/web-related" element={<ListOfPost />} />
        <Route path="portfolio/ai-related" element={<ListOfPost />} />
        <Route
          path="portfolio/web-related/create-portfolio"
          element={<CreateNewPost />}
        />
        <Route
          path="portfolio/ai-related/create-portfolio"
          element={<CreateNewPost />}
        />
        <Route
          path="portfolio/web-related/edit/:webId"
          element={<UpdatePost />}
        />
        <Route
          path="portfolio/ai-related/edit/:webId"
          element={<UpdatePost />}
        />
        <Route path="blog/tech" element={<ListOfPost />} />
        <Route path="blog/productivity" element={<ListOfPost />} />
        <Route path="blog/life" element={<ListOfPost />} />
        <Route path="blog/nba" element={<ListOfPost />} />
        <Route path="blog/charo" element={<ListOfPost />} />
        <Route path="blog/tech/create-blog" element={<CreateNewPost />} />
        <Route
          path="blog/productivity/create-blog"
          element={<CreateNewPost />}
        />
        <Route path="blog/life/create-blog" element={<CreateNewPost />} />
        <Route path="blog/nba/create-blog" element={<CreateNewPost />} />
        <Route path="blog/charo/create-blog" element={<CreateNewPost />} />
        <Route path="blog/tech/edit/:blogId" element={<UpdatePost />} />
        <Route path="blog/productivity/edit/:blogId" element={<UpdatePost />} />
        <Route path="blog/life/edit/:blogId" element={<UpdatePost />} />
        <Route path="blog/nba/edit/:blogId" element={<UpdatePost />} />
        <Route path="blog/charo/edit/:blogId" element={<UpdatePost />} />
        <Route path="contact" element={<ListOfContact />} />
      </Route>
    );
  } else {
    adminRoutes = (
      <Route path="/admin" element={<Login setAdmin={handleAdmin} />} />
    );
  }

  return (
    <AdminContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <Suspense
        fallback={
          <div className="center">
            <Loading />
          </div>
        }
      >
        <Router>
          {!isAdmin && <Header />}
          <main
            style={{
              paddingBottom: !isAdmin ? "20px" : "0",
              minHeight: !isAdmin ? "800px" : "0",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio/" element={<Portfolio />}>
                <Route
                  path="web-related"
                  element={
                    <SomethingRelated name="portfolio" category="web-related" />
                  }
                />
                <Route
                  path="ai-related"
                  element={
                    <SomethingRelated name="portfolio" category="ai-related" />
                  }
                />
              </Route>
              <Route
                path="/portfolio/web-related/:webId"
                element={<PortfolioArticle />}
              />
              <Route
                path="/portfolio/ai-related/:webId"
                element={<PortfolioArticle />}
              />
              <Route path="/blog" element={<Blog />}>
                <Route
                  path="tech"
                  element={<SomethingRelated name="blog" category="tech" />}
                />
                <Route
                  path="productivity"
                  element={
                    <SomethingRelated name="blog" category="productivity" />
                  }
                />
                <Route
                  path="life"
                  element={<SomethingRelated name="blog" category="life" />}
                />
                <Route
                  path="nba"
                  element={<SomethingRelated name="blog" category="nba" />}
                />
                <Route
                  path="charo"
                  element={<SomethingRelated name="blog" category="charo" />}
                />
              </Route>
              <Route path="/blog/tech/:blogId" element={<BlogArticle />} />
              <Route
                path="/blog/productivity/:blogId"
                element={<BlogArticle />}
              />
              <Route path="/blog/life/:blogId" element={<BlogArticle />} />
              <Route path="/blog/nba/:blogId" element={<BlogArticle />} />
              <Route path="/blog/charo/:blogId" element={<BlogArticle />} />
              <Route path="/contact" element={<Contact />} />
              {adminRoutes}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          {!isAdmin && <Footer />}
        </Router>
      </Suspense>
    </AdminContext.Provider>
  );
}

export default App;
