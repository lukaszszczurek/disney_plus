import React, { useEffect } from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectAllMovies, selectQuery } from "./moviestowatch/movieSlice";

import { Link } from "react-router-dom";

import { selectUserPhoto } from "./user/userSlice";
import CardMedia from "@mui/material/CardMedia";

function RatingsData(props) {
  const movies = useSelector(selectAllMovies);
  const userPhoto = useSelector(selectUserPhoto);
  const useQuerr = useSelector(selectQuery);
  console.log("movies" + movies);



  useEffect(() => {});

  return (
    <div>


      <Content>
        {useQuerr &&
          useQuerr.map((movie, key) => (
            <Link to={`/detail/` + movie.id}>
              <CardMedia
                image={movie.titleImg}
                sx={{
                  opacity: "1",
                  border: "solid 1px",
                  borderRadius: "10px",
                  display: "flex",
                  borderColor: "#c3ada8",
                }}
                key={key}
              >
                <Box sx={{ display: "relative", flexDirection: "column" }}>
                  <CardContent sx={{ static: "1 0 auto" }}>
                    <Typography
                      variant="subtitle1"
                      color={"#17a511"}
                      component="div"
                      sx={{
                        position: "relative",
                        fontSize: "32px",
                        fontFamily: "SansSerif",
                        paddingTop: "7vh",
                        textDecoration: "bold",
                      }}
                    >
                      {key + 1}
                    </Typography>
                  </CardContent>

                  <Box
                    sx={{
                      display: "static",
                      alignItems: "center",
                      pl: 1,
                      pb: 1,
                    }}
                  ></Box>
                </Box>

                <CardMedia
                  image={movie.cardImg}
                  alt="Live from space album cover"
                  sx={{
                    width: 300,
                    paddingLeft: "10px",
                    display: "block",
                    margin: "10px 5px ",
                    paddingTop: "-10px",
                    img: {
                      opacity: "1",
                    },
                  }}
                />

              </CardMedia>
            </Link>
          ))}
      </Content>

    </div>
  );
}

export default RatingsData;



const Content = styled.div`
    padding: 1px;
`;

const Wrap = styled.div`
  padding-top: 12.25%;
  border-radius: 8px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  display: flex;
  line-height: 17px;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  text-align: start;
  width: 70%;

  span {
  }

  img {
    display: flex;
    padding-left: 8%;
    justify-content: center;
    padding-top: 0%;
    
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

  text {
    color: darkcyan;
  }
`;

const Description = styled.div`
  position: relative;
`;
