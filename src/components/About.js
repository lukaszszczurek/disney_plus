import React from 'react';
import styled from "styled-components";

// img



function About(props) {
    return (
        <Container>
        <h1>
            About
        </h1>
            <h3>
                Clone Disney+ app
            </h3>
            <h4>
              Clone of Disney+ app is only for educational purpose. It was non for profit created.
                Moreover, some of cardMovie (carouser in main-home menu and Disney, Pixar, National Geographic etc. cards).
            </h4>

            <h2>Technologies:</h2>


            {/*<img src={'/aboutPhoto/redux-logo.png'} height={'100px'} width={'100px'} />*/}

            {/*<img src={'/aboutPhoto/logo192.png'} height={'100px'} width={'100px'} />*/}
            {/*<img src={'https://firebase.google.com/static/downloads/brand-guidelines/PNG/logo-logomark.png'} height={'100px'} width={'80px'} />*/}


            <Content>
                <Technology>
                    <img src={'/aboutPhoto/logo192.png'} height={'150px'} width={'150px'} />
                    ReactJS is one of the most popular JavaScript libraries for mobile and web application development.
                    Created by Facebook, React contains a collection of reusable JavaScript code snippets used for user interface
                    (UI) building called components. React allows to create UI both  on web apps and mobile ( React Native). Library is
                    really popular nowadays and have a huge community.


                </Technology>
            <Technology>
                <img src={'/aboutPhoto/WebStorm_Icon.png'} height={'150px'} width={'150px'} />
                WebStorm is an integrated development environment for JavaScript and related technologies.
                WebStorm is full-packed of different plugins that allow programming faster and more enjoyable. In case of this app
                it helps with uses firebase method more properly, finds a compile and logic errors quickly.


            </Technology>

            <Technology>
                <img src={'/aboutPhoto/mui-logo.png'} height={'150px'} width={'150px'} />

                MUI offers a comprehensive suite of UI tools to help you ship new features faster.
                Start with Material UI, our fully-loaded
                component library, or bring your own design system to our production-ready components.
                It helps to create simple animated UI elements with no CSS necessary. MUI elements is used
                in the MediaCard UI that display most liked and last added movies.
            </Technology>

                <Technology>
                    <img src={'/aboutPhoto/styled-logo.png'} height={'100px'} width={'100px'} />
                     Utilising tagged template literals (a recent addition to JavaScript) and the power of CSS,
                    styled-components allows you to write actual CSS code to style your components. It also removes the mapping between components and styles
                    – using components as a low-level styling construct could not be easier!


                </Technology>
                <Technology>
                    <img src={'/aboutPhoto/redux-logo.png'} height={'150px'} width={'150px'} />
                    Redux is a pattern and library for managing and updating application state, using events called "actions".
                    It serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the
                    state can only be updated in a predictable fashion. I used it to create state that allows me get data from firebase in
                    another part of my application. Redux make project more scalable and menage data faster and cleaner.

                </Technology>
                <Technology>
                    <img src={'https://firebase.google.com/static/downloads/brand-guidelines/PNG/logo-logomark.png'} height={'150px'} width={'120px'} />
                    Firebase is a Backend-as-a-Service (Baas). It provides developers with a variety of tools and services to
                    help them develop quality apps, grow their user base, and earn profit.
                    It helps to create Google Account functionality and have a NoSQL data base was used to store data
                    (Like logic, filter data in Search and Rating module, get data for movie UI elements)


                </Technology>

        </Content>






        </Container>
    );
}

const Container = styled.div`
  padding: 100px 50px 26px;;
  color: white;
  font-family: "sans-serif";
  
  h1{
    align-content: center;
    justify-content: center;
    text-align: center;
    
  }
  h3{
    font-family: "sans-serif";
    text-align: center;
  }
  h4{
    font-family: "Georgia Pro";
    color: #ffebaf;
  }
  
`;


const Content=styled.div`
    display: grid;
    grid-gap: 50px;
  gap: 45vh;
  
    grid-template-columns: repeat(2,minmax(0,1fr));
  
  @media(max-width: 768px){
    
    grid-template-columns:repeat(2,minmax(0,1fr)) ;
    
  }
  
  `;



const Technology = styled.div`
  font-family: "Segoe UI";
  opacity: 0.8;
  height: 30vh;
  width: 50vh;
  position: relative;
  display: flow;
  position: relative;
  padding-left: 5vw;
  padding-bottom: 20vh;
  text-align: justify;
  color: rgb(246, 171, 7);


  &:hover {
    opacity: 1;
    scale: 1.01;
  }


`;



export default About;