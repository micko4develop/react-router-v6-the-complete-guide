import { styled } from "styled-components";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Books from './components/books/books';
import Admin from './components/admin/admin';
import './App.css';
import Nav from "./common/nav";
import ProtectedRoute from "./common/protected-route";
import { useState } from "react";

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
  const [authenticated] = useState(true);
  return (
    <>
      <AppContainer>
        <Router>
          <Content>
            <Nav />
            <Routes>
              <Route path="/*" element={<Books />}/>
              <Route path="/admin/*" element={<ProtectedRoute authenticated={authenticated} to={"/"} element={<Admin />} />}/>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Content>
        </Router>
      </AppContainer>
    </>
  );
}

export default App;
