import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";

const FormStyled = styled.form`
  background-color: wheat;
  border-radius: 5px;
  padding: 16px;
`;

const InputStyled = styled.input`
  width: 90%;
  border-radius: 5px;
  border: 2px solid transparent;
  color: crimson;
  background-color: white;
  padding: 12px 16px;
  margin-bottom: 8px;
  outline: 0px;
  font-size: 1rem;
  &:focus {
    border-color: #00daff;
  }
`;

const Description = styled.textarea`
  width: 90%;
  border-radius: 5px;
  border: 2px solid transparent;
  color: crimson;
  background-color: white;
  padding: 12px 16px;
  margin-bottom: 8px;
  outline: 0px;
  font-size: 1rem;
  min-height: 100px;
  resize: none;
  &:focus {
    border-color: #00daff;
  }
`;

const ButtonStyled = styled.button`
  border: 3px solid crimson;
  color: crimson;
  background: none;
  padding: 12px 16px;
  border-radius: 5px;
  outline: 0px;
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;
`;

const BookEdit = ({ isEdit }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(null);
  const { id, title, price, description } = formFields || {};

  const updateForm = ({ name, value }) => {
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const createHandler = async () => {
    try {
      const response = await axios.post(`/books/new`, { book: formFields });
      navigate(`/admin/${response.data.id}`);
    } catch (e) {
      alert("Error in creating book!");
    }
  };

  const saveHandler = async () => {
    try {
      await axios.post(`/books/${id}`, { book: formFields });
      alert(`Updated ${title} !`);
      navigate(`/admin`);
    } catch (e) {
      alert("Error in updating book!");
    }
  };

  const deleteHandler = async () => {
    try {
      await axios.delete(`/books/${id}`);
      alert(`Deleted ${title} !`);
      navigate(`/admin`);
    } catch (e) {
      alert("Error in updating book!");
    }
  };

  useEffect(() => {
    if (!isEdit) {
      setFormFields({
        id: "",
        title: "",
        price: 0,
        description: "",
      });
    }
  }, [isEdit]);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const response = await axios.get(`/books/${params.id}`);
        setFormFields(response.data);
      } catch (e) {
        console.warn(e);
        navigate("/admin", { replace: true });
      }
    })();
  }, [isEdit, params.id, navigate]);

  if (!formFields) return null;

  return (
    <FormStyled>
      <InputStyled
        type="text"
        name="id"
        placeholder="ID"
        value={id}
        onChange={({ target }) => updateForm(target)}
      />
      <InputStyled
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={({ target }) => updateForm(target)}
      />
      <InputStyled
        type="number"
        name="price"
        placeholder="Price"
        value={price}
        onChange={({ target }) =>
          updateForm({ name: target.name, value: Number(target.value) })
        }
      />
      <Description
        name="description"
        placeholder="Description"
        value={description}
        onChange={({ target }) => updateForm(target)}
      />
      {!isEdit && (
        <ButtonStyled type="button" onClick={createHandler}>
          Create
        </ButtonStyled>
      )}
      {isEdit && (
        <>
          <ButtonStyled type="button" onClick={saveHandler}>
            Save
          </ButtonStyled>
          <ButtonStyled type="button" onClick={deleteHandler}>
            Delete
          </ButtonStyled>
        </>
      )}
    </FormStyled>
  );
};

export default BookEdit;
