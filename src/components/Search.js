import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  selectNewdisney,
  selectOriginals,
  selectRecommend,
  selectTrending,
  setMovies,
} from "./moviestowatch/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Originals from "./Originals";
import Home from "./Home";
import { selectUserPhoto } from "./user/userSlice";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebase";
import SearchInput from "./SearchInput";
import { useContext } from "react";

function Search(props) {
  const moviesOriginal = useSelector(selectOriginals);
  const dispatch = useDispatch();
  const userPhoto = useSelector(selectUserPhoto);
  //const UserName=useSelector(selectUsername);

  let recommends = [];

  let newdisneys = [];
  let originals = [];
  let trending = [];
  let allMovies = [];
  //console.log(db);
  let array = [];

  useEffect(() => {
    onSnapshot(collection(db, "movies"), (snapshot) => {
      snapshot.docs.forEach((doc) => {
        let RepeatMovie = false;
        if (array.includes(doc.id)) {
          RepeatMovie = true;
        } else if (!array.includes(doc.id)) {
          RepeatMovie = false;
        }
        if (!RepeatMovie) {
          array.push(doc.id);

          switch (doc.data().type) {
            case "recommend":
              recommends = [...recommends, { id: doc.id, ...doc.data() }];
              allMovies = [...allMovies, { id: doc.id, ...doc.data() }];

              break;
            case "new":
              newdisneys = [...newdisneys, { id: doc.id, ...doc.data() }];
              allMovies = [...allMovies, { id: doc.id, ...doc.data() }];
              break;
            case "original":
              originals = [...originals, { id: doc.id, ...doc.data() }];
              allMovies = [...allMovies, { id: doc.id, ...doc.data() }];
              break;
            case "trending":
              trending = [...trending, { id: doc.id, ...doc.data() }];
              allMovies = [...allMovies, { id: doc.id, ...doc.data() }];
          }
        }
      });
      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newdisneys,
          original: originals,
          trending: trending,
          allMovies: allMovies,
        })
      );
    });
  }, [userPhoto]);
  return (
    <div>
      <SearchInput />
    </div>
  );
}

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;

  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Container = styled.div`
  align-content: center;
  justify-content: center;
  position: center;
  form {
    display: block;
  }
`;

const InputBar = styled.p`
  input {
    height: 15vh;
    width: 90vw;
    border-radius: 9px;
    align-content: center;
    justify-content: center;
    position: center;

    letter-spacing: 1.2px;
    background: rgba(44, 45, 55, 0.69);
    margin-left: 5vw;
    margin-right: 5vw;
    margin-top: 15vh;
    font-family: SansSerif;
    font-style: normal;
    font-size: 9vh;
    border: 0px;

    &:hover {
      background: #2c2d37;
    }

    &:focus {
      border-bottom-color: #040714;
      background: rgba(141, 153, 171, 0.52);
      border-color: #040714;
    }
  }
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
    outline-color: #040714;
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default Search;
