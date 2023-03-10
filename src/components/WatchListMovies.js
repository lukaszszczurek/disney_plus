import React from 'react';
import {useSelector} from "react-redux";
import {selectAllMovies} from "./moviestowatch/movieSlice";
import {selectWatchList} from "./user/UserDataAccess";
import styled from "styled-components";
import {Link} from "react-router-dom";


function WatchListMovies(props) {



    const movies = useSelector(selectAllMovies);
    const onWatchList = useSelector(selectWatchList);


    var ContainOnWatch =(id)=>{
        for (var i =0; i<onWatchList.length;i++){
            if(onWatchList[i] === id){
                return true;
            }
        }
        return false
    }


    console.log("XDD" + onWatchList)
    return (
        <Container>
            <Content>

            {movies &&
            movies.map((movie,key)=>(


                  <>
                  {( onWatchList.includes(movie.id) ) ? (


                      <Wrap key={key}>


                          <Link to={`/detail/` + movie.id}>


                              {movie.id}
                              <img src={movie.cardImg}/>


                          </Link>

                      </Wrap>



                  ) : (null)}


                  </>







            ))}
            </Content>

        </Container>
    );
}

export default WatchListMovies;



const Container = styled.div`
  color: #f9f9f9;
  padding: 10px 50px 26px;
  //justify-content: center;

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

const Content=styled.div`
    display: grid;
    grid-gap: 25px;
    gap: 25px;
  
    grid-template-columns: repeat(5,minmax(0,1fr));
  
  @media(max-width: 768px){
    
    grid-template-columns:repeat(2,minmax(0,1fr)) ;
    
  }

`;
