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

import {doc, getDocs, setDoc} from "firebase/firestore";

import { onSnapshot, collection } from 'firebase/firestore';


function Home(props) {

    console.log(process.env.REACT_APP_API+"@@@@@");







    const dispatch=useDispatch();
    const userPhoto=useSelector(selectUserPhoto);
    const UserName=useSelector(selectUsername);
    let recommends=[];

    let newdisneys=[];
    let originals=[];
    let trending=[];
    console.log(db);
    let array=[];


    useEffect(()=>{










               onSnapshot(collection(db,'movies'),(snapshot)=>{
                       snapshot.docs.forEach((doc) => {
                           let a=false;
                           if(array.includes(doc.id)){
                               a=true;
                           }
                           else if(!array.includes(doc.id)){
                               a=false;
                           }


                           console.log(a+'😀')



                           if(!a){
                               array.push(doc.id);
                               console.log(a+'😀')
                               console.log(array+'🙃');


                               switch(doc.data().type){


                                   case 'recommend':

                                       console.log(doc.name);

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

                           }




                            console.log(recommends);




                       });
                   dispatch(setMovies({
                           recommend:recommends,
                           newDisney:newdisneys,
                           original:originals,
                           trending:trending,

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
