import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Container = styled.div`
  background: wheat;
  border-radius: 5px;
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
`;

const Image = styled.img`
  width: 60px;
  margin-right: 16px;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.3rem;
  margin: 0;
`;

const Price = styled.p`
  color: #a12b27;
  font-weight: 700;
  font-size: 1rem;
  margin: 0;
`;

const Back = styled.button`
  border: 3px solid #a12b27;
  color: #a12b27;
  background: none;
  padding: 12px 14px;
  margin-right: 6px;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;
`;

const BookDetail = ({ book }) => {
  const navigate = useNavigate();

  return book ? (
    <Container>
      <Header>
        <Image src={`/assets/images/books/${book.id}.png`} alt={book.title} />
        <div>
          <Title>{book.title}</Title>
          <Price>{`$${book.price}`}</Price>
        </div>
      </Header>

      <div>
        <p>{book.description}</p>
      </div>

      <Back type="button" onClick={() => navigate(-1)}>
        Back
      </Back>
    </Container>
  ) : (
    <h3>Loading...</h3>
  );
};

export default BookDetail;