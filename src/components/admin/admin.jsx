import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";

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
            <Outlet />
        </>
    )
}

export default Admin;