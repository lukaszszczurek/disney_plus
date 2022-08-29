import React from 'react';
import styled from "styled-components";

function Header(props) {
    return (
        <Nav>
            <Logo src="/images/logo.svg" alt="Disney+">

            </Logo>

            <NavigationMenu>
                <a href="/home">
                    <img src={"/images/home-icon.svg"} alt="Home"/>
                    <span>Home</span>
                </a>

            </NavigationMenu>

        </Nav>
    );
}


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
  
      top: 0;
        z-index: 3;
        width: auto;
    


`;

const Logo=styled.img`
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
      margin: 0px;
      padding: 0;
      position: relative;
      margin-right: auto;
      margin-left: 25px;
  
  a{
    display: flex;
    align-items: center;
    padding: 0 12px;
  }
  image{
    height: 15px;
    min-width: 20px;
    width: 15px;
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
   
   
    background-color:  rgb(249,249,249);
    border-radius: 0px 0px 4px 4px;
    bottom: -6px;
    opacity: 0;
    content: "";
    left: 0;
    position: absolute;
    right: 0px;
    height: 2px;
    transform-origin: left center;
    transform: scaleX(0);
    transition: all 250ms cubic-bezier(0.25,0.4,0.4,0.9) 0s;
    visibility: hidden;
    width: auto;


    //background-color: rgb(249, 249, 249);
    //border-radius: 0px 0px 4px 4px;
    //bottom: -6px;
    //content: "";
    //height: 2px;
    //left: 0px;
    //opacity: 0;
    //position: absolute;
    //right: 0px;
    //transform-origin: left center;
    //transform: scaleX(0);
    //transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    //visibility: hidden;
    //width: auto;
    
    
    
    
  }
  }

  
  &:hover{
    span:before{
      transform: scaleX(1);
      visibility: visible;
      opacity: 1 !important;
      
    }
  }
  //@media(max-width: 768px)
  //{
  //  display: none;
  //}


`;

export default Header;