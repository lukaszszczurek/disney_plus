import React, {useEffect} from 'react';
import {Container} from "@mui/material";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectAllMovies, selectQuery} from "./moviestowatch/movieSlice";

import {Link} from "react-router-dom";



import db from "../firebase";
import {collection, getDocs, onSnapshot, query, where,doc} from "firebase/firestore";
import {selectUserPhoto} from "./user/userSlice";


// querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log( "ABABA: "+ doc.id, " => ", doc.data());
// });




function RatingsData(props) {
    const movies = useSelector(selectAllMovies);
    const userPhoto = useSelector(selectUserPhoto);
    const useQuerr = useSelector(selectQuery);
    console.log("movies" + movies)

    let arr = [];

    useEffect(()=>{

    })


        // onSnapshot(collection(db,'movies').where('likes','>',0).get(),snapshot => {
        //     snapshot.docs.forEach((doc,key)=>{
        //         console.log( "JSON: " +key + " "+ doc.id)
        //     })
        // })






    // console.log("MOST LIKED" + mostLiked)
    return (
        <div>
             <Containr>

                 <Content>




                   

                 {useQuerr
                 && useQuerr.map((movie,key)=>(


                     <Wrap key={key}>
                         {key+1}



                             <Link to={`/detail/` + movie.id}>


                                 <img src={movie.cardImg}/>
                                 <Description>
                                     saasd
                                 </Description>


                             </Link>


                         </Wrap>

                     ))}
                     </Content>
             </Containr>
        </div>
    );
}

export default RatingsData;


const Containr=styled.div`
  


`;

const Content=styled.div`
  //  display: flex;
  //  //grid-gap: 25px;
  //  gap: 25px;
  //
  ////  grid-template-columns: repeat(1,minmax(0,1fr));
  //
  //@media(max-width: 768px){
  //  
  //  grid-template-columns:repeat(2,minmax(0,1fr)) ;
  //  
  //}

`;


const  Wrap = styled.div`

  padding-top: 12.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
  rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;  
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  text-align: start;
  width: 70%;
  
 
  img {
    display: flex;
    padding-left: 8%;
    justify-content: center;
    padding-top: 0%;
  //  height: 100%;
   // object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    z-index: 1;
    top: 0;
    
  }



`;

const Place = styled.div` 
 
    font-size: 20px;
  font-weight: bold;
  border: 2px solid red;  
  position: relative;
  display: grid;
  
  text{
    
    color: darkcyan;
  }
  
  



`;

const Description = styled.div`
    position: relative;


`;