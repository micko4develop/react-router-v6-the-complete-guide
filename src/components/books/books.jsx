import { Outlet, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import BooksList from "./books-list";
import Book from "./book";

const BooksContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.img`
    border-radius: 5px;
    width: 200px;
    margin: 26px auto 26px;
`;

const Books = () => {
    return (
        <>
            <BooksContainer>
                <Logo src="/assets/images/logo.svg" alt="StarBooks Logo" />
                <Outlet />
                <Routes>
                    <Route path="/" element={<BooksList />}/>
                    <Route path="/:id" element={<Book />}/>
                </Routes>
            </BooksContainer>
        </>
    )
}

export default Books;