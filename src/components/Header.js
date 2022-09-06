import React from 'react';
import styled from "styled-components";
import {auth, provider} from "../firebase.js";
import {signInWithPopup} from "firebase/auth"



//redux
import {useDispatch,useSelector} from "react-redux";
import { useNavigate} from "react-router-dom";


//console.log(unstable_HistoryRouter);
import {selectUsername, selectUserEmail, selectUserPhoto, setUserLoginDetails} from "./user/userSlice";


// require('firebase/auth')

function Header(props) {
    console.log(useNavigate());


    const dispatch=useDispatch();
    const history=useNavigate();
    const username=useSelector(selectUsername);
    const photo=useSelector(selectUserPhoto);



    const setUser=(user) => {

        setUserLoginDetails({

            name:user.displayName,
            email:user.email,
            photo:user.photoURL,
        }


        )

    }

    const handleAuth=()=>{
       signInWithPopup(auth,provider).then((result)=>{
            console.log(result);
            setUser(result.user);
        }).catch((error)=>{

            alert(error.message)

        })

    };


    return (
        <Nav>
            <Logo >
                <img src="/images/logo.svg" alt="Disney+"/>

            </Logo>

            <NavigationMenu>
                <a href="/home">

                    <img src={"/images/home-icon.svg"} alt="Home"/>

                    <span>Home</span>
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

            <LoginButton onClick={handleAuth}>Login</LoginButton>



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
    padding: 2px 0px;
    position: relative;
    white-space: nowrap;





  &:before{

background-color: rgb(249, 249, 249);
border-radius: 0px 0px 4px 4px;
bottom: -6px;
content: "";
height: 2px;
left: 0px;
opacity: 0;
position: absolute;
right: 0px;
transform-origin: left center;
transform: scaleX(0);
transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
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





export default Header;






// import styled from "styled-components";
//
//
//
//
//
// const Header = (props) => {
//
//
//
//
//
//
//     return (
//         <Nav>
//             <Logo>
//                 <img src="/images/logo.svg" alt="Disney+" />
//             </Logo>
//
//
//
//                     <NavMenu>
//                         <a href="/home">
//                             <img src="/images/home-icon.svg" alt="HOME" />
//                             <span>HOME</span>
//                         </a>
//                         <a>
//                             <img src="/images/search-icon.svg" alt="SEARCH" />
//                             <span>SEARCH</span>
//                         </a>
//                         <a>
//                             <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
//                             <span>WATCHLIST</span>
//                         </a>
//                         <a>
//                             <img src="/images/original-icon.svg" alt="ORIGINALS" />
//                             <span>ORIGINALS</span>
//                         </a>
//                         <a>
//                             <img src="/images/movie-icon.svg" alt="MOVIES" />
//                             <span>MOVIES</span>
//                         </a>
//                         <a>
//                             <img src="/images/series-icon.svg" alt="SERIES" />
//                             <span>SERIES</span>
//                         </a>
//                     </NavMenu>
//
//
//
//         </Nav>
//     );
// };
//
// const Nav = styled.nav`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 70px;
//   background-color: #090b13;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0 36px;
//   letter-spacing: 16px;
//   z-index: 3;
// `;
//
// const Logo = styled.a`
//   padding: 0;
//   width: 80px;
//   margin-top: 4px;
//   max-height: 70px;
//   font-size: 0;
//   display: inline-block;
//   img {
//     display: block;
//     width: 100%;
//   }
// `;
//
// const NavMenu = styled.div`
//   align-items: center;
//   display: flex;
//   flex-flow: row nowrap;
//   height: 100%;
//   justify-content: flex-end;
//   margin: 0px;
//   padding: 0px;
//   position: relative;
//   margin-right: auto;
//   margin-left: 25px;
//   a {
//     display: flex;
//     align-items: center;
//     padding: 0 12px;
//     img {
//       height: 20px;
//       min-width: 20px;
//       width: 20px;
//       z-index: auto;
//     }
//     span {
//       color: rgb(249, 249, 249);
//       font-size: 13px;
//       letter-spacing: 1.42px;
//       line-height: 1.08;
//       padding: 2px 0px;
//       white-space: nowrap;
//       position: relative;
//       &:before {
//         background-color: rgb(249, 249, 249);
//         border-radius: 0px 0px 4px 4px;
//         bottom: -6px;
//         content: "";
//         height: 2px;
//         left: 0px;
//         opacity: 0;
//         position: absolute;
//         right: 0px;
//         transform-origin: left center;
//         transform: scaleX(0);
//         transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
//         visibility: hidden;
//         width: auto;
//       }
//     }
//     &:hover {
//       span:before {
//         transform: scaleX(1.1);
//         visibility: visible;
//         opacity: 1 !important;
//       }
//     }
//   }
//   /* @media (max-width: 768px) {
//     display: none;
//   } */
// `;
//
//
//
//
//
//
//
//
//
//
//
//
// export default Header;