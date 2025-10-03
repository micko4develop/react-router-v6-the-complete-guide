import styled from "styled-components";
import { Link, Routes, Route } from "react-router-dom";
import BooksList from "../books/books-list";
import BookEdit from "../books/book-edit";

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const StyledLink = styled(Link)`
    border: 3px solid crimson;
    border-radius: 5px;
    padding: 6px 12px;
    margin-left: auto;
    text-decoration: none;
    font-weight: 700;
    text-transform: uppercase;
    color: crimson;
`;

const Admin = () => {
    return (
        <>
            <Container>
                <h1>Admin</h1>
                <StyledLink to="new">New</StyledLink>
            </Container>
            <Routes>
                <Route path="/" element={<BooksList />}/>
                <Route path="/new" element={<BookEdit isEdit={false} />}/>
                <Route path="/:id" element={<BookEdit isEdit={true} />} />
            </Routes>
        </>
    )
}

export default Admin;