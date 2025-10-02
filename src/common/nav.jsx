import { Link, NavLink } from "react-router-dom";
import { styled } from "styled-components";

const NavContainer = styled.nav`
    margin-bottom: 16px;
    a{
        padding: 8px 14px;
        text-decoration: none;
        border-radius: 5px;
        font-weight: 500;
    }

    .active{
        color: #00daff;
        border: 2px solid #00daff;
    }
`;

const Nav = () => {
    return(
        <NavContainer>
            <NavLink to={"/"}>Books</NavLink>
            <NavLink to={"/admin"}>Admin</NavLink>
        </NavContainer>
    )
}

export default Nav;