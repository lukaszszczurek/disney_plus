import React from 'react';
import styled from "styled-components";
import ImageSlider from "./ImageSlider";

console.log("Home Opened")

function Home(props) {
    return (
        <Container>
          <ImageSlider/>


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
  
    color: white;


`;

export default Home;