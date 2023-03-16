import styled from "styled-components";


const Login=(props)=>
{
    return(
     <Container>
         <Content>

             <ContAction>
                 <ConstActionImg src="/images/cta-disney-hulu-removebg-preview.png" alt=" " />

                 <SignUp onClick={()=>{alert("Login first")}}>GET THERE</SignUp>

                 <Description>

                     Get Primer Access to How to train dragon for an additional fee with Disney+
                     subscription. As of 2/2/1950, the price of Disney+ and the Disney Bundle will increase
                     by $1
                 </Description>
                 <ConstActionImg2 src="/images/cta-logo-two.png" alt =""/>


             </ContAction>

             <BgImage/>

         </Content>
     </Container>
    );
}
const Container=styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
  
    


`;


const Content=styled.div`
    margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;

const BgImage=styled.div`
  height: 100%;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("/images/login-background.jpg");
  position: absolute;
  top:0;
  right:0;
  left: 0;
  z-index: -1;
  

`;

const ContAction=styled.div`
  max-width: 650px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto 2vw;
  transition-timing-function: ease-out;
  transition: opacity 0.2s;
  width: 100%;

`;

const ConstActionImg=styled.img`
    margin-bottom: 12px;
    max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;
  
 

`;

const SignUp=styled.a`
    font-weight: bold;
  color:#f9f9f9;
  background-color: #0063e5;
  margin-bottom: 12px;
  width: 100%;
  letter-spacing: 1.5px;
  font-size: 18px;
  padding: 16.5px 0;
  border: 1px solid transparent;
  border-radius: 10px;
  
  &:hover{
    background-color: #0483ee ;
    
  }

`;

const Description=styled.p`
    color: hsla(0,0%,95.3%,1);
    font-size: 11px;
    margin: 0 0 24px;
    line-height: 1.5;
    letter-spacing: 1.5px;


`;

const  ConstActionImg2=styled.img`
  margin-bottom: 20px;
  max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;



`;


export default Login;