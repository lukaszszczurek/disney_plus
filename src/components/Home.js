import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import ImageSlider from "./ImageSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import Newdisney from "./Newdisney";
import Originals from "./Originals";
import Trending from "./Trending";


import db from "../firebase";
import {setMovies} from "./moviestowatch/movieSlice";
import {selectUsername, selectUserPhoto} from "./user/userSlice";
import {useDispatch, useSelector} from "react-redux";


import { onSnapshot, collection } from 'firebase/firestore';


function Home(props) {


    const dispatch=useDispatch();
    const userPhoto=useSelector(selectUserPhoto);
    //const UserName=useSelector(selectUsername);
    let recommends=[];

    let newdisneys=[];
    let originals=[];
    let trending=[];
    let allMovies=[]

    let array=[];



    useEffect(()=>{



               onSnapshot(collection(db,'movies'),(snapshot)=>{
                       snapshot.docs.forEach((doc) => {
                           let RepeatMovie=false;
                           if(array.includes(doc.id)){
                               RepeatMovie=true;
                           }
                           else if(!array.includes(doc.id)){
                               RepeatMovie=false;
                           }

                           if(!RepeatMovie){
                               array.push(doc.id);


                               switch(doc.data().type){


                                   case 'recommend':

                                      // console.log(doc.name);

                                       recommends=[...recommends,{id:doc.id,...doc.data()}];
                                       allMovies=[...allMovies,{id:doc.id,...doc.data()}];


                                       break;
                                   case 'new':
                                       newdisneys=[...newdisneys,{id:doc.id,...doc.data()}];
                                       allMovies=[...allMovies,{id:doc.id,...doc.data()}];
                                       break;
                                   case 'original':
                                       originals=[...originals,{id:doc.id,...doc.data()}];
                                       allMovies=[...allMovies,{id:doc.id,...doc.data()}];
                                       break;
                                   case 'trending':
                                       trending=[...trending,{id:doc.id,...doc.data()}];
                                       allMovies=[...allMovies,{id:doc.id,...doc.data()}];


                               }

                           }


                       });
                   dispatch(setMovies({
                           recommend:recommends,
                           newDisney:newdisneys,
                           original:originals,
                           trending:trending,
                       //
                            allMovies:allMovies,

                       })
                   );

               });
    },[userPhoto]);

    return (

        <Container>
          <ImageSlider/>
            <Viewers/>
            <Recommends/>
            <Newdisney/>
            <Originals/>
            <Trending/>

        </Container>
    );
}


const Container=styled.main`
  position: relative;
  
  min-height:(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top:72px;
  padding: 0 (3.5vh+5px);
  
  
  &:after{
    background: url("/images/home-background.png") center center/ cover no-repeat ;
    content: '';
    position: absolute;
    inset: 0;
    opacity: 1;
    z-index: -1;
  }
    


`;

export default Home;
export let allMovies;


