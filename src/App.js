import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useRoutes,
} from "react-router-dom";
import "./App.css";
import { styled } from "styled-components";

import Nav from "./common/nav";
import Books from "./components/books/books";
import BooksList from "./components/books/books-list";
import Book from "./components/books/book";
import BookEdit from "./components/books/book-edit";
import ProtectedRoute from "./common/protected-route";
import { useState } from "react";
import Admin from "./components/admin/admin";
import ScrollTop from "./common/scroll-top";

const AppContainer = styled.div`
  margin: 60px auto;
  width: 400px;
`;
const Content = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 28px;
`;

const App = () => {
  const [authenticated] = useState(true);
  const routes = useRoutes([
    {
      path: "/",
      element: <Books />,
      children: [
        {
          index: true,
          element: <BooksList />,
        },
        {
          path: ":id",
          element: <Book />,
        },
      ],
    },
    {
      path: "/admin",
      element: authenticated ? <Admin /> : <Navigate to="/" />,
      children: [
        {
          index: true,
          element: <BooksList />,
        },
        {
          path: "new",
          element: <BookEdit isEdit={false} />,
        },
        {
          path: ":id",
          element: <BookEdit isEdit={true} />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return routes;
};

const AppWrapper = () => (
  <>
    <AppContainer>
      <Router>
        <ScrollTop />
        <Content>
          <Nav />
          <App />
        </Content>
      </Router>
    </AppContainer>
  </>
);

export default AppWrapper;
