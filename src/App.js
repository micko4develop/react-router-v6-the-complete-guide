import { styled } from "styled-components";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Books from './components/books/books';
import Admin from './components/admin/admin';
import './App.css';
import Nav from "./common/nav";
import BooksList from "./components/books/books-list";
import Book from "./components/books/book";

const AppContainer = styled.div`
  margin: 60px auto;
  width: 400px;
`;

const Content = styled.div`
    background-color: white;
    border-radius: 5px;
    padding: 28px;
`;

function App() {
  return (
    <>
      <AppContainer>
        <Router>
          <Content>
            <Nav />
            <Routes>
              <Route path="/" element={<Books />}>
                <Route path="/" element={<BooksList />}/>
                <Route path="/:id" element={<Book />}/>
              </Route>
              <Route path="/admin" element={<Admin />}/>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Content>
        </Router>
      </AppContainer>
    </>
  );
}

export default App;
