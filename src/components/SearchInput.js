import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "@mui/material";
import { TextField } from "@mui/material";
import { selectRecommend, selectAllMovies } from "./moviestowatch/movieSlice";
import styled from "styled-components";
import { Link } from "react-router-dom";

function SearchInput(props) {
  const [titleInput, setTitleInput] = useState("");
  const movies = useSelector(selectAllMovies);
  const getmovie = useSelector(selectRecommend);

  return (
    <Container>
      {/*<Input id="outlined-basic" />*/}
      {/*    <InputStyled onChange={(e)=>setTitleInput(e.target.value)} />*/}

      {/*<input/>*/}
      <TextField
        variant={"standard"}
        id="searchField"
        type={"text"}
        fullWidth={true}
        color={"warning"}
        placeholder={"search..."}
        onChange={(e) => setTitleInput(e.target.value)}
        sx={{
          border: "10px",
          fontSize: "15px",
          input: {
            fontFamily: "sans-serf",
            color: "white",
            height: "10vh",
            fontSize: "8vh",
            opacity: "0.7",
            cursor: "type",
          },
        }}
      />
      <Content>
        {movies &&
          movies
            .filter((titles) => titles.title.toLowerCase().includes(titleInput))
            .map((movie, key) => (
              <Wrap key={key}>
                {movie.id}
                <Link to={`/detail/` + movie.id}>
                  <img src={movie.cardImg} />
                </Link>
              </Wrap>
            ))}
      </Content>
    </Container>
  );
}

export default SearchInput;

const InputStyled = styled.input`
  font-family: Lato, sans-serif;
  color: #242424;
  padding-right: 3.75rem;
  caret-color: #ffc200;
  padding-top: 150px;
  height: 5vh;
  outline: none;
  font-size: 8vh;
  align-content: center;
  margin-left: 15vw;
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

const Container = styled.div`
  padding: 100px 50px 26px;
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  padding-top: 30px;

  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
const InputTitle = styled.input`
  margin-top: 20vh;

  display: flex;
  font-size: 20px;
  margin-left: 50vw;

  justify-content: center;
`;
