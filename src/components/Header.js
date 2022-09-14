import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {auth, provider} from "../firebase.js";
import {signInWithPopup} from "firebase/auth"



//redux
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


//console.log(unstable_HistoryRouter);
import {selectUsername, selectUserEmail, selectUserPhoto, setUserLoginDetails, setSignOutState} from "./user/userSlice";


// require('firebase/auth')

 function Header(props) {




    const dispatch=useDispatch();
    const history=useNavigate();
    const UserName=useSelector(selectUsername);
    const UserPhoto=useSelector(selectUserPhoto);



    useEffect(()=>{

        auth.onAuthStateChanged(async (user)=>{

            if(user){
                setUser(user);
                history("/home");






            }
        })

    },[UserPhoto]);


    const setUser=(user) => {

        dispatch(
        setUserLoginDetails({

            name:user.displayName,
            email:user.email,
            photo:user.photoURL,

        })
        );

    };

    const handleAuth=()=>{

        if(!UserPhoto){
            signInWithPopup(auth,provider).then((result)=>{
                console.log(result);
                setUser(result.user);
                window.onload = function() {
                    if(!window.location.hash) {
                        window.location = window.location + '#loaded';
                        window.location.reload();
                    }
                }




            }).catch((error)=>{

                alert(error.message)
            })

        }
        else if(UserPhoto) {

            auth.signOut().then(()=>{
                dispatch(setSignOutState());
                history("/");


            }).catch((err)=>alert(err.message));
        }

    }

    return (
        <Nav>
            <Logo >
                <img src="/images/logo.svg" alt="Disney+"/>

            </Logo>


            {!UserPhoto ? (  <LoginButton onClick={handleAuth}>Login</LoginButton>
                ):(


                    <>
                            <NavigationMenu>
                            <a href="/home">

                                <img src={"/images/home-icon.svg"} alt="Home"/>

                                <span>HOME</span>
                            </a>

                            <a href={"/search"}>
                                <img src="/images/search-icon.svg" alt="Search" />
                                <span>SEARCH</span>
                            </a>

                            <a href={"watchlist"}>
                                <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
                                <span>WATCHLIST</span>
                            </a>
                            <a href={"originals"}>
                                <img src="/images/original-icon.svg" alt="ORIGINALS" />
                                <span>ORIGINALS</span>
                            </a>
                            <a href={"movies"}>
                                <img src="/images/movie-icon.svg" alt="MOVIES" />
                                <span>MOVIES</span>
                            </a>
                            <a href={"series"}>
                                <img src="/images/series-icon.svg" alt="SERIES" />
                                <span>SERIES</span>
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
};


const Nav=styled.nav`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height:70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #090b13;
      padding:0 30px;
      letter-spacing: 16px;
        z-index: 3;

`;

const Logo=styled.a`
        width: 80px;
        margin-top: 4px;
          padding: 0;
          display: inline-block;
          img{
            display: block;
            width: 100%;
          }
`;

const NavigationMenu=styled.div`
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

const LoginButton=styled.a`
    letter-spacing: 1.4px;
    font-size: 15px;
    text-transform: uppercase;
    padding: 8px 16px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    
  
  &:hover{
    
    background-color: #f9f9f9;
    color: #040714;
    
    
  }
    


`;


const UserImg=styled.img`
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

const DropDown=styled.div`
  position: absolute;
  top:48px;
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

const SignOut=styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  align-items: center;
  justify-content: center;
  ${UserImg}{
    border-radius: 50%;
    transition: all 330ms;
    
    &:hover{
      opacity: 0.75;
      transition: all 250ms;
    }
  }
  
  &:hover{
    ${DropDown}{
      
      opacity: 1;
      transition-duration: 1s;
    }
  }
    
   


`;






export default Header;






