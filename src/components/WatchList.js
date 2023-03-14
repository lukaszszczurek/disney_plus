import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {selectWatchList} from "./user/UserDataAccess";
import {selectAllMovies, selectOriginals, setMovies} from "./moviestowatch/movieSlice";
import {collection, getDocs, onSnapshot} from "firebase/firestore";
import db from "../firebase";
import {Link} from "react-router-dom";
import {selectUserPhoto} from "./user/userSlice";
import WatchListMovies from "./WatchListMovies";
import Originals from "./Originals";
import {Typography} from "@mui/material";


function WatchList(props) {

        const moviesOnList = useSelector(selectWatchList);
        const  movieData = useSelector(selectAllMovies);
        const userPhoto=useSelector(selectUserPhoto);
        const dispatch=useDispatch();


        //const [movies,setMovies] = useState([])
        let movies=[];
        let array=[];
        const usersCollectionRef = collection(db, "movies");



    useEffect(()=>{


        onSnapshot(collection(db,'movies'),(snapshot)=>{
            snapshot.docs.forEach((doc)=>{

                let RepeatMovie=false;
                if(array.includes(doc.id)){
                    RepeatMovie=true;
                }
                else if(!array.includes(doc.id)){
                    RepeatMovie=false;
                }

                if(!RepeatMovie){
                    array.push(doc.id)
                    movies=[...movies,{id:doc.id,...doc.data()}];
                }






            })
            dispatch(setMovies({
                allMovies:movies
            }))

        })



    },[userPhoto])



    //const movies = useSelector(selectAllMovies);








    return (
    <Container>
        <TitleH1>Watch List</TitleH1>

        <WatchListMovies/>

    </Container>
    );
}

export default WatchList;


const Container = styled.div`
  color: #f9f9f9;
  padding: 100px 50px 26px;
  //justify-content: center;

`;

const TitleH1 = styled.h1`

  
  justify-content: center;
  text-align: center;
  font-family:"Georgia Pro Cond Light";
  font-size: 50px;
  
`;

const  Wrap = styled.div`

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