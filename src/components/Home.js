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
import { selectUserPhoto} from "./user/userSlice";
import {useDispatch, useSelector} from "react-redux";

import { doc, setDoc } from "firebase/firestore";

import { onSnapshot, collection } from 'firebase/firestore';


function Home(props) {

    window.onload = function() {
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }

    const dispatch=useDispatch();
    const userPhoto=useSelector(selectUserPhoto);
    let recommends=[];
    let newdisneys=[];
    let originals=[];
    let trending=[];
    console.log(db);

    useEffect(()=>{








               onSnapshot(collection(db,'movies'),(snapshot)=>{
                       snapshot.docs.forEach((doc) => {


                            console.log(recommends);

                           switch(doc.data().type){

                               case 'recommend':
                                   recommends=[...recommends,{id:doc.id,...doc.data()}];
                                   break;
                               case 'new':
                                   newdisneys=[...newdisneys,{id:doc.id,...doc.data()}];
                                   break;
                               case 'original':
                                   originals=[...originals,{id:doc.id,...doc.data()}];
                                   break;
                               case 'trending':
                                   trending=[...trending,{id:doc.id,...doc.data()}];


                           }
                           dispatch(setMovies({
                                   recommend:recommends,
                                   newDisney:newdisneys,
                                   original:originals,
                                   trending:trending,

                               })
                           );

                       });


               });




    },[userPhoto]);
    // window.location.reload(true);






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
