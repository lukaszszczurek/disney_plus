import React, { useEffect, useState } from "react";
import styled from "styled-components";
import db, { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";

//redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectUsername,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "./user/userSlice";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  setUserDataDetails,
  signOutProcessDataReset,
} from "./user/UserDataAccess";

function Header(props) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const UserName = useSelector(selectUsername);
  const UserPhoto = useSelector(selectUserPhoto);

  // dispatch user data

  function userDataAccessLogic(user) {
    let isActuallyNotLogged = true;
    console.log("##1: " + isActuallyNotLogged);

    //  setActuallyNotLogged(true);
    onSnapshot(collection(db, "userData"), (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (user.uid === doc.id) {
          isActuallyNotLogged = false;

          dispatch(
            setUserDataDetails({
              id: doc.id,
              liked: doc.data().liked,
              watchList: doc.data().watchList,
            })
          );

          return;
        }
      });

      if (isActuallyNotLogged) {
        console.log("XDDDWWE");
        setDoc(doc(db, "userData", user.uid), {
          liked: [],
          watchList: [],
        });

        dispatch(
          setUserDataDetails({
            id: user.uid,
            liked: [],
            watchList: [],
          })
        );
      }
    });
  }

  const setData = (user) => {
    onSnapshot(collection(db, "userData"), (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (user.uid === doc.id) {
          dispatch(
            setUserDataDetails({
              id: doc.id,
              liked: doc.data().liked,
              watchList: doc.data().watchList,
            })
          );
        }
      });
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        setData(user);
      }
    });
    // deleteDoc(doc(collection(db,'userData', 'jFNaI6Sfzee59Z5u8kkA4wLHgmQ2')))
  }, []);

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  const handleAuth = () => {
    if (!UserPhoto) {
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result);
          setUser(result.user);
          userDataAccessLogic(result.user);

          // setActuallyNotLogged = false;

          history("/home");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (UserPhoto) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          dispatch(signOutProcessDataReset());
          history("/");
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>

      {!UserPhoto ? (
        <LoginButton onClick={handleAuth}>Login</LoginButton>
      ) : (
        <>
          <NavigationMenu>
            <a href="/home">
              <img src={"/images/home-icon.svg"} alt="Home" />

              <span>HOME</span>
            </a>

            <a href="/search">
              <img src="/images/search-icon.svg" alt="Search" />
              <span>SEARCH</span>
            </a>

            <a href={"/watchlist"}>
              <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </a>
            <a href={"/ratings"}>
              <img src="/images/original-icon.svg" alt="ORIGINALS" />
              <span>RATINGS</span>
            </a>

            <a href={"/about"}>
              <img src="/images/series-icon.svg" alt="SERIES" />
              <span>ABOUT</span>
            </a>
          </NavigationMenu>

          <SignOut>
            <UserImg src={UserPhoto} alt={UserName} />
            <DropDown>
              <span onClick={handleAuth}>Sing Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #090b13;
  padding: 0 30px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  width: 80px;
  margin-top: 4px;
  padding: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

const NavigationMenu = styled.div`
      display: flex;
      align-items: center;
      flex-flow: nowrap;
      height: 100%;
     

      padding: 0;
      position: relative;
      margin-right: auto;
      margin-left: 25px;

  a{
    display: flex;
    align-items: center;
    padding: 0 12px;

    img{

      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
  



  


  span{
    color: rgb(249,249,249);
    font-size: 13px;

    letter-spacing: 1.4px;
    line-height: 1px;
    padding: 2px 0;
    position: relative;
    white-space: nowrap;





  &:before{

background-color: rgb(249, 249, 249);
border-radius: 0 0 4px 4px;
bottom: -6px;
content: "";
height: 2px;
left: 0;
opacity: 0;
position: absolute;
right: 0;
transform-origin: left center;
transform: scaleX(0);
transition: all 550ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
visibility: hidden;
width: auto;


   



      }
  }


  &:hover{
    span:before{
      transform: scaleX(1.1);
      visibility: visible;
      opacity: 1 !important;

    }
  }
`;
// @media(max-width: 768px)
// {
//  display: none;
// }

const LoginButton = styled.a`
  letter-spacing: 1.4px;
  font-size: 15px;
  text-transform: uppercase;
  padding: 8px 16px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;

  &:hover {
    background-color: #f9f9f9;
    color: #040714;
  }
`;

const UserImg = styled.img`
  height: 100%;
  //  transition: all 250ms;
  //
  //
  //  border-radius: 50%;
  //  //transition: all 250ms;
  //
  //
  //&:hover{
  //
  //    height: 85%;
  //    transition: all 250ms;
  //
  //  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  align-items: center;
  letter-spacing: 1px;
  font-size: 12px;
  width: 70px;
  opacity: 0;
  cursor: pointer;
  text-align: center;
  border-radius: 4px;
  border: 1px solid rgba(151, 151, 151, 0.34);
  box-shadow: rgb(0 0 0 / 50%) 0 0 18px 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  align-items: center;
  justify-content: center;
  ${UserImg} {
    border-radius: 50%;
    transition: all 330ms;

    &:hover {
      opacity: 0.75;
      transition: all 250ms;
    }
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import db, { auth, provider } from "../firebase.js";
// import { signInWithPopup} from "firebase/auth";
// import {deleteDoc} from 'firebase/firestore';
//
// //redux
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
//
// import {
//   selectUsername,
//   selectUserPhoto,
//   setUserLoginDetails,
//   setSignOutState,
//   selectLoggedStatus
// } from "./user/userSlice";
// import {
//   collection,
//   doc,
//   onSnapshot,
//   setDoc,
// } from "firebase/firestore";
// import {
//   setUserDataDetails,
// } from "./user/UserDataAccess";
//
// function Header(props) {
//   let [isActuallyNotLogged, setActuallyNotLogged] = useState(true);
//   const dispatch = useDispatch();
//   const history = useNavigate();
//   const UserName = useSelector(selectUsername);
//   const UserPhoto = useSelector(selectUserPhoto);
//
//   // dispatch user data
//
//   const userDataAccessLogic = (userID) => {
//      if (UserPhoto) {
//        console.log("photoIs")}
//      else {
//        console.log("no photo")}
//     if(1>0){
//       console.log("QWERTY...")
//       const docUser = doc.collection(db,'userData',userID)
//       dispatch(setUserDataDetails({
//           id:userID,
//           liked:docUser.data().liked,
//           watchList:docUser.data().watchList,
//
//       }))
//       console.log("QWERTY...END")
//
//     }
//
//     console.log("IDSTART: " + userID)
//     console.log("WWW")
//     setActuallyNotLogged(true);
//     console.log("XDDD#1: " + isActuallyNotLogged)
//
//
//     onSnapshot(collection(db, "userData"), (snapshot) => {
//       console.log("XDDD##: " + isActuallyNotLogged)
//
//       console.log("GG")
//       snapshot.docs.forEach((doc) => {
//         if (userID === doc.id) {
//           console.log(" idUser"+ userID + " idoc" + doc.id)
//           console.log("QQ")
//           setActuallyNotLogged(false);
//           dispatch(
//             setUserDataDetails({
//               id: doc.id,
//               liked: doc.data().liked,
//               watchList: doc.data().watchList,
//             })
//           );
//         }
//       });
//     });
//     console.log("PREW")
//     console.log("XDDD#3: " + isActuallyNotLogged)
//     if (isActuallyNotLogged === true) {
//       console.log("HEY")
//       // adding new user data
//       setDoc(doc(db, "userData", userID), {
//         liked: [""],
//         watchList: [""],
//       });
//
//       dispatch( setUserDataDetails({
//         id:userID,
//         liked:[""],
//         watchList:[""],
//       }))
//
//
//       console.log("HEyTwo")
//
//       setActuallyNotLogged(false);
//     }
//   };
//
//   useEffect(() => {
//     auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         setUser(user);
//         userDataAccessLogic(user.id);
//
//       }
//     });
//    // deleteDoc(doc(db, 'userData', 'zpAVblxJCUbc3yreNIFgordEnTS2'));
//     console.log("UDAL: " + isActuallyNotLogged)
//   }, []);
//
//   useEffect(() => {});
//
//   const setUser = (user) => {
//     dispatch(
//       setUserLoginDetails({
//         name: user.displayName,
//         email: user.email,
//         photo: user.photoURL,
//
//       })
//     );
//
//   };
//
//
//   const handleAuth = () => {
//     if (!UserPhoto) {
//       signInWithPopup(auth, provider)
//         .then((result) => {
//           console.log(result);
//           setUser(result.user);
//           userDataAccessLogic(result.user.uid);
//
//
//           setActuallyNotLogged = false;
//
//           history("/home");
//         })
//         .catch((error) => {
//           alert(error.message);
//         });
//     } else if (UserPhoto) {
//       auth
//         .signOut()
//         .then(() => {
//           dispatch(setSignOutState());
//           history("/")
//
//         })
//         .catch((err) => alert(err.message));
//     }
//   };
//
//   return (
//     <Nav>
//       <Logo>
//         <img src="/images/logo.svg" alt="Disney+" />
//       </Logo>
//
//       {!UserPhoto ? (
//         <LoginButton onClick={handleAuth}>Login</LoginButton>
//       ) : (
//         <>
//           <NavigationMenu>
//             <a href="/home">
//               <img src={"/images/home-icon.svg"} alt="Home" />
//
//               <span>HOME</span>
//             </a>
//
//             <a href="/search">
//               <img src="/images/search-icon.svg" alt="Search" />
//               <span>SEARCH</span>
//             </a>
//
//             <a href={"/watchlist"}>
//               <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
//               <span>WATCHLIST</span>
//             </a>
//             <a href={"/ratings"}>
//               <img src="/images/original-icon.svg" alt="ORIGINALS" />
//               <span>RATINGS</span>
//             </a>
//
//             <a href={"/about"}>
//               <img src="/images/series-icon.svg" alt="SERIES" />
//               <span>ABOUT</span>
//             </a>
//           </NavigationMenu>
//
//           <SignOut>
//             <UserImg src={UserPhoto} alt={UserName} />
//             <DropDown>
//               <span onClick={handleAuth}>Sing Out</span>
//             </DropDown>
//           </SignOut>
//         </>
//       )}
//     </Nav>
//   );
// }
//
// const Nav = styled.nav`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 70px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background-color: #090b13;
//   padding: 0 30px;
//   letter-spacing: 16px;
//   z-index: 3;
// `;
//
// const Logo = styled.a`
//   width: 80px;
//   margin-top: 4px;
//   padding: 0;
//   display: inline-block;
//   img {
//     display: block;
//     width: 100%;
//   }
// `;
//
// const NavigationMenu = styled.div`
//       display: flex;
//       align-items: center;
//       flex-flow: nowrap;
//       height: 100%;
//
//
//       padding: 0;
//       position: relative;
//       margin-right: auto;
//       margin-left: 25px;
//
//   a{
//     display: flex;
//     align-items: center;
//     padding: 0 12px;
//
//     img{
//
//       height: 20px;
//       min-width: 20px;
//       width: 20px;
//       z-index: auto;
//     }
//
//
//
//
//
//
//
//   span{
//     color: rgb(249,249,249);
//     font-size: 13px;
//
//     letter-spacing: 1.4px;
//     line-height: 1px;
//     padding: 2px 0;
//     position: relative;
//     white-space: nowrap;
//
//
//
//
//
//   &:before{
//
// background-color: rgb(249, 249, 249);
// border-radius: 0 0 4px 4px;
// bottom: -6px;
// content: "";
// height: 2px;
// left: 0;
// opacity: 0;
// position: absolute;
// right: 0;
// transform-origin: left center;
// transform: scaleX(0);
// transition: all 550ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
// visibility: hidden;
// width: auto;
//
//
//
//
//
//
//       }
//   }
//
//
//   &:hover{
//     span:before{
//       transform: scaleX(1.1);
//       visibility: visible;
//       opacity: 1 !important;
//
//     }
//   }
// `;
// // @media(max-width: 768px)
// // {
// //  display: none;
// // }
//
// const LoginButton = styled.a`
//   letter-spacing: 1.4px;
//   font-size: 15px;
//   text-transform: uppercase;
//   padding: 8px 16px;
//   border: 1px solid #f9f9f9;
//   border-radius: 4px;
//
//   &:hover {
//     background-color: #f9f9f9;
//     color: #040714;
//   }
// `;
//
// const UserImg = styled.img`
//   height: 100%;
//   //  transition: all 250ms;
//   //
//   //
//   //  border-radius: 50%;
//   //  //transition: all 250ms;
//   //
//   //
//   //&:hover{
//   //
//   //    height: 85%;
//   //    transition: all 250ms;
//   //
//   //  }
// `;
//
// const DropDown = styled.div`
//   position: absolute;
//   top: 48px;
//   right: 0;
//   align-items: center;
//   letter-spacing: 1px;
//   font-size: 12px;
//   width: 70px;
//   opacity: 0;
//   cursor: pointer;
//   text-align: center;
//   border-radius: 4px;
//   border: 1px solid rgba(151, 151, 151, 0.34);
//   box-shadow: rgb(0 0 0 / 50%) 0 0 18px 0;
// `;
//
// const SignOut = styled.div`
//   position: relative;
//   height: 48px;
//   width: 48px;
//   align-items: center;
//   justify-content: center;
//   ${UserImg} {
//     border-radius: 50%;
//     transition: all 330ms;
//
//     &:hover {
//       opacity: 0.75;
//       transition: all 250ms;
//     }
//   }
//
//   &:hover {
//     ${DropDown} {
//       opacity: 1;
//       transition-duration: 1s;
//     }
//   }
// `;
//
// export default Header;
