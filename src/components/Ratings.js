import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import db from "../firebase";
import { setMovies } from "./moviestowatch/movieSlice";
import RatingsData from "./RatingsData";
import { Button } from "@mui/material";

function Ratings(props) {
  const dispatch = useDispatch();
  let movies = [];
  let array = [];
  let queryArray = [];

  const mostLiked = query(collection(db, "movies"), orderBy("likes", "desc"));
  const lastDispensed = query(
    collection(db, "movies"),
    orderBy("subTitle".trim(/[0-9]{4}/), "desc")
  );
  const [defineSort, setDefineSort] = useState(mostLiked);

  useEffect(() => {
    onSnapshot(defineSort, (querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        let RepeatMovie = false;
        if (array.includes(doc.id)) {
          RepeatMovie = true;
        } else if (!array.includes(doc.id)) {
          RepeatMovie = false;
        }
        if (!RepeatMovie) {
          array.push(doc.id);
          queryArray = [...queryArray, { id: doc.id, ...doc.data() }];
        }
      });
      dispatch(
        setMovies({
          allMovies: movies,
          Querry: queryArray,
        })
      );
    });
  });
  return (
    <div>
      <Container>
        <DisplayButtons>
          <SortButton
            sx={{ color: "#f55b28" }}
            onClick={() => {
              setDefineSort(mostLiked);
            }}
          >
            Most Liked
          </SortButton>
          <SortButton
            sx={{ color: "#f55b28" }}
            onClick={() => {
              setDefineSort(lastDispensed);
            }}
          >
            Latest
          </SortButton>
        </DisplayButtons>

        <RatingsData />
      </Container>
    </div>
  );
}

const Container = styled.div`
  padding: 100px 50px 26px;
`;

const SortButton = styled(Button)`

  width: 100%;

 
    

  &:hover{
    background-color: #ff9446;
    color: #ff670b;
   font-weight: bold;
    opacity: 1;
    &.Mui-focusVisible{
     
        opacity: 1
      }
  },
  
`;

const DisplayButtons = styled.div`
  position: relative;
  padding: 20px 20px;
  display: flex;
`;

export default Ratings;
