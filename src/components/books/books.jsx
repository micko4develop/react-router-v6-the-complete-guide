import { Outlet } from "react-router-dom";
import styled from "styled-components";

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
            </BooksContainer>
        </>
    )
}

export default Books;