import React, {useEffect, useState} from 'react';
import CardMedia from "@mui/material/CardMedia";
import {useParams} from "react-router-dom";
import {collection, onSnapshot} from "firebase/firestore";
import db from "../firebase";
import {Button, Input} from "@mui/material";
import styled from "styled-components";


function Video(props) {
    const {id} =useParams();
    const [data,setData]=useState("");

    useEffect(()=>{
        onSnapshot(collection(db,'movies'),snapshot => {
            snapshot.docs.forEach((doc)=>{
                if(doc.id===id){
                    setData(doc.data())
                }
            })
        })
    },[id])
    return (
        <div>



            <CardMedia component={"video"}
                       autoPlay={false}
                       controls

                     src={data.source}
                   sx={{height:"100%", width:"100%",margin:"0%",
                       animationPlayState:"none",
                       opacity:"75%",
                       border:"solid",

                   position:"absolute"}}    />


        </div>
    );
}

const Ass=styled.div`
  margin-top: 500px;
  padding-top: 100px;
  padding-left: 400px;
  size: 900px 90px;
  z-index: 100;
  color: #b0b0c5;
  background-color: #f9f9f9;
  
  
  

`;



export default Video;


