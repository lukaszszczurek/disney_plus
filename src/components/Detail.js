import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  onSnapshot,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import db from "../firebase";

import "firebase/firestore";
import "firebase/auth";

import { FacebookShareButton } from "react-share";
// icons
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { white } from "mui/source/styles/colors";
import { useSelector } from "react-redux";
import { selectLiked, selectWatchList } from "./user/UserDataAccess";

import { selectIdUserData } from "./user/UserDataAccess";

function Detail(props) {
  const { id } = useParams();
  const [likeStatus, setLikeStatus] = useState(false);
  const [lastStateFromBase, setLastStateFromBase] = useState(false);
  const [onWatchListStatus, setonWatchList] = useState(false);

  const Liked = useSelector(selectLiked);
  const ListToWatch = useSelector(selectWatchList);
  const UserId = useSelector(selectIdUserData);

  console.log("DEF: " + UserId);

  const history = useNavigate();
  const [displayMovie, setDisplayMovie] = useState(false);
  const [DataDetail, SetDataDetail] = useState(false);

  const href = window.location.href;

  // like logic

  const changeStatusLogic = (currentNumber) => {
    if (likeStatus) {
      const movieDoc = doc(db, "movies", id);
      const editField = { likes: currentNumber - 1 };
      updateDoc(movieDoc, editField);

      const userDataDoc = doc(db, "userData", UserId);

      updateDoc(userDataDoc, { liked: arrayRemove(id) });
    } else if (!likeStatus) {
      const movieDoc = doc(db, "movies", id);
      const editField = { likes: currentNumber + 1 };
      updateDoc(movieDoc, editField);

      console.log("ud ID : " + UserId);
      const userDataDoc = doc(db, "userData", UserId);
      updateDoc(userDataDoc, { liked: arrayUnion(id) });
    }
    setLikeStatus(!likeStatus);
  };

  // add to watchlist

  const addToWatchlist = (movie_id) => {
    if (onWatchListStatus) {
      const docPath = doc(db, "userData", UserId);
      const operation = { watchList: arrayRemove(movie_id) };

      updateDoc(docPath, operation);
    } else if (!onWatchListStatus) {
      const docPath = doc(db, "userData", UserId);
      const operation = { watchList: arrayUnion(movie_id) };

      updateDoc(docPath, operation);
    }
    setonWatchList(!onWatchListStatus);
  };

  useEffect(() => {
    onSnapshot(collection(db, "movies"), (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id === id) {
          SetDataDetail(doc.data());
        }
      });
    });
  }, [id]);

  useEffect(() => {
    for (var i = 0; i < Liked.length; i++) {
      if (Liked[i] === id) {
        setLikeStatus(true);
      }
    }
    for (var j = 0; j < ListToWatch.length; j++) {
      if (ListToWatch[j] === id) {
        setonWatchList(true);
      }
    }
  }, []);

  return (
    <Container>
      <Background>
        <img src={DataDetail.backgroundImg} alt={DataDetail.title} />
      </Background>

      <ImageTitle>
        <img src={DataDetail.titleImg} alt={DataDetail.title} />
      </ImageTitle>
      <ContentMeta>
        <Controls>
          <Player
            onClick={() => {
              history("/video/" + id);
            }}
          >
            <img src="/images/play-icon-black.png" />
            <span>Play</span>
          </Player>

          <Trailer>
            <img src="/images/play-icon-white.png" />
            <span>Trailer</span>
          </Trailer>
          <AddList>
            {onWatchListStatus ? (
              <BookmarkRemoveIcon
                onClick={() => addToWatchlist(id)}
                sx={{ color: white }}
              />
            ) : (
              <AddIcon
                onClick={() => addToWatchlist(id)}
                sx={{ color: white }}
              />
            )}
          </AddList>

          <FacebookShareButton url={href}>
            <GroupWatch>
              <img src="/images/group-icon.png" />
            </GroupWatch>
          </FacebookShareButton>

          <Like
            onClick={() => {
              changeStatusLogic(DataDetail.likes);
            }}
          >
            {likeStatus ? (
              <ThumbUpIcon sx={{ color: white }} />
            ) : (
              <ThumbUpOffAltIcon sx={{ color: white }} />
            )}
          </Like>
        </Controls>
        <Subtitle>{DataDetail.subTitle}</Subtitle>

        <Description>{DataDetail.description}</Description>
      </ContentMeta>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  min-height: (100vh-250px);
  overflow: hidden;
  display: block;
  top: 72px;
  padding: 0 (3.5vw+5px);
  @media (max-width: 768px) {
    margin-top: 10vh;
  }
`;

const Background = styled.div`
  left: 0px;
  opacity: 0.8;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: -1;

  img {
    height: 100%;
    width: 100%;
  }
  @media (max-width: 768px) {
    width: initial;
    margin-top: 5vh;
    img {
      margin-top: 10vh;
    }
  }
`;

const ImageTitle = styled.div`
  align-items: flex-end;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin: 0px auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;
  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
  @media (max-width: 768px) {
    img {
      max-width: 600px;
      min-width: 200px;
      width: 35vw;
      margin-top: 20vh;
    }
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 10px 22px 0px 30px;
  padding: 5px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);
  img {
    width: 32px;
  }
  &:hover {
    background: rgb(198, 198, 198);
  }
  @media (max-width: 768px) {
    height: 45px;
    padding: 20px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 20px;
    img {
      width: 25px;
    }
  }
`;
const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
  margin-left: 0;
  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const AddList = styled.button`
  margin-top: 0;
  font-size: 40px;
  margin-right: 16px;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(3, 3, 3, 0.26);
  border-radius: 50%;
  border: 2px solid #ffffff;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
    scale: 1.07;
    background-color: #194545;
  }

  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;
  }
`;
const GroupWatch = styled(AddList)``;
const Like = styled(AddList)``;

const Subtitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
  margin-left: 1.8vw;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: rgb(249, 249, 249);
  margin-left: 2vw;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Detail;
