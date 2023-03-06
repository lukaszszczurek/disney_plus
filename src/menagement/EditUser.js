import React, {useState} from 'react';
import styled from "styled-components";
import {Button, Input} from "@mui/material";
import {white} from "mui/source/styles/colors";
import {brown, green, pink} from "@mui/material/colors";
import db from "../firebase";
import {collection, doc, onSnapshot,deleteDoc,setDoc} from "firebase/firestore";



function EditUser(props) {

    const fun = (id)=>{
        deleteDoc(db,'userData',id);
    }



    const [ids,setids] = useState("");
    return (
        <div>
            <h1>H</h1>
            <h1>H</h1>
            <h1>H</h1>
            <h1>H</h1>
            <h1>H</h1>  <h1>H</h1>

            <Input id="outlined-basics" onChange={(e)=>setids(e.target.value)}  sx={{
                color:brown,
                backgroundColor:pink,
                bgcolor:white,

            }}/>
            <Button onClick={()=>{deleteDoc(doc(db,'userData',"UNSncvKxZhegffBsxRYBVZFbFh52")
                 )}}>Click</Button>

        </div>
    );
    const Cont= styled.div`
        color: #f9f9f9;
    `
}

export default EditUser;