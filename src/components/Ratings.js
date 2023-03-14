import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {selectUserPhoto} from "./user/userSlice";
import {collection, doc, onSnapshot, query, where,orderBy} from "firebase/firestore";
import db from "../firebase";
import {setMovies} from "./moviestowatch/movieSlice";
import RatingsData from "./RatingsData";
import {Button} from "@mui/material";

function Ratings(props) {


    const userPhoto = useSelector(selectUserPhoto);
    const dispatch = useDispatch();
    let movies = []
    let array = []
    let like = []
    let year =[]
    let queryArray =[];



    const mostLiked  =  query(collection(db, "movies"), orderBy("likes","desc"))
    const lastDispensed = query(collection(db,'movies'), orderBy("subTitle".trim(/[0-9]{4}/)))
    const minutes  = query(collection(db,'movies'), orderBy("subTitle".trim(/[0-9]{4}/)))
    const [defineSort,setDefineSort] = useState(mostLiked);


    useEffect(()=>{

        console.log()

        onSnapshot(collection(db,'movies'),snapshot => {
            snapshot.docs.forEach((doc,key)=>{
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

                    year=[...year,{id:doc.id,...movies[key].subTitle.match(/[0-9]{4}/)}];

                    console.log("YEARS: " + year)
                }
            })

        })




        onSnapshot(defineSort, (querySnapshot) => {
            querySnapshot.docs.map(doc =>{
                if(!queryArray.includes(doc.id)){
                    queryArray=[...queryArray,{id:doc.id,...doc.data()}];

                }



            })
            dispatch(setMovies({
                allMovies:movies,
                Querry:queryArray
            }))

        })




        // const q = query(collection(db, "movies"),where('likes','>',0))
        // const unsub = onSnapshot(q, (querySnapshot) => {
        //     console.log("Data", querySnapshot.docs.map(q => doc.data));
        // });
    })
    return (
        <div>
            <Container>

                <DisplayButtons>
                   <SortButton onClick={()=>{setDefineSort(mostLiked)}}>Most Liked</SortButton>
                    <SortButton onClick={()=>{setDefineSort(lastDispensed)}}>Latest</SortButton>

                </DisplayButtons>


            <RatingsData/>

            </Container>
        </div>
    );
}



const Container=styled.div`
  padding: 100px 50px 26px;
  color: #f9f9f9;


`;

const SortButton = styled(Button)`

  width: 100%;

`;

const DisplayButtons= styled.div`
  position: relative;
  padding: 20px 20px;
  display: flex;


`;

export default Ratings;