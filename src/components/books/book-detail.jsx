import { Link } from "react-router-dom";
import { styled } from "styled-components";

const StyledDiv = styled.div`
    width: 90%;
    height: 90px;
    display: flex;
    background-color: wheat;
    border-radius: 5px;
    padding: 16px;
    margin-bottom: 8px;
    text-decoration: none;
    color: black;
`;

const StyledImg = styled.img`
    width: 60px;
    height: 90px;
    margin-right: 16px;
`;

const Title = styled.h2`
    font-size: 1.3rem;
`;

const Price = styled.p`
    font-size: 1rem;
`;

const BookDetail = ({book}) => {
    return(
        <StyledDiv>
            <StyledImg width={220} src={`/assets/images/books/${book.id}.png`} />
            <div>
                <Title>{book.title}</Title>
                <Price>{`$${book.price}`}</Price>
            </div>
        </StyledDiv>
    )
}

export default BookDetail;