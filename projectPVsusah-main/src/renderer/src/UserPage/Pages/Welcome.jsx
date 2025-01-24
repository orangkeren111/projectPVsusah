import React, { useState } from "react";
import { useEffect } from "react";

import Footer from "../componets/Footer/Footer";

import WelcomePageImage1 from "../images/WelcomePageImage1.png";
import WelcomePageImage2 from "../images/WelcomePageImage2.png";
import WelcomePageImage3 from "../images/WelcomePageImage3.png";
import WelcomePageImage4 from "../images/WelcomePageImage4.png";
import WelcomePageBanner from "../images/WelcomePageBanner.jpeg";

import { Fade } from "react-reveal";
import { Link } from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Box, Button } from "@mui/material";
import AppleIcon from '@mui/icons-material/Apple';
import AdbIcon from '@mui/icons-material/Adb';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Microsoft';

function Welcome() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const image1 = WelcomePageImage1;

    window.api.loadMovie().then((data) => {
      setData(data.slice(0, 4));
    })
  }, []);

  return (
    <div>
      <div
        style={{
          height: "36rem", 
          width: "100%", 
          background: `linear-gradient(0deg, hsl(0deg 0% 0% / 50%) 0%, hsl(0deg 0% 0% / 50%) 35%),url(${WelcomePageBanner})`,
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          backgroundRepeat: "no-repeat", 
          position: "relative", 
          backgroundColor: "#1e293b",
        }}
      >
        <div   
          style={{
            display: "grid",
            placeContent: "center",
            height: "100%",
            justifyItems: "center",
          }}>
          <div     
          style={{
            width: "83.333%",
            textAlign: "center",
          }}>
            <Fade duration={2000}>
              <h1         
              style={{
                marginBottom: "0.75rem",
                fontSize: "1.875rem", 
                fontWeight: 600,
                color: "white",
              }} >
                Your favorite entertainment, anytime you want.
              </h1>
              <h1
                style={{
                  marginBottom: "1rem",
                  fontSize: "1.25rem",
                  fontWeight: 300,
                  color: "#a8a29e",
                }}>
                Stream on any device. No commitment, cancel anytime.
              </h1>
              <h1
                style={{
                  marginBottom: "0.5rem",
                  fontWeight: 300,
                  color: "#a8a29e",
                }}>
                Enter your email to get started now.
              </h1>
              <div 
                style={{
                  display: "flex",
                }}
              >
                <input
                  placeholder="Email Address"
                  style={{
                    height:"rem",
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.25rem",
                  }}
                />
                <Link to={"/signup"}>
                  <button 
                    style={{
                      width:"12rem",
                      padding: "0.5rem 4rem",
                      fontWeight: 700,
                      color: "white",
                      backgroundColor: "#b91c1c",
                      borderRadius: "0.25rem",
                    }}>
                    Get Started
                  </button>
                </Link>
              </div>
            </Fade>
          </div>
        </div>
      </div>


      {/* Section 4 */}
            <section style={{
        backgroundColor: 'black',              
        borderTopWidth: '0.5rem',                  
        borderBottomWidth: '0.5rem',              
        borderTopColor: '#3f3f46',               
        borderBottomColor: '#3f3f46',            
      }}>
        <Fade>
          <div style={{
            display: 'flex', 
            justifyContent: 'center', 
            paddingTop: '2rem',                  
            paddingBottom: '2rem',               
          }}>
            <div style={{
              display: 'flex', 
              alignItems: 'center', 
              width: '75%'                        
            }}>
              <div>
                <h1 style={{            
                  marginBottom: '1.5rem',                        
                  fontWeight: '600',                         
                  color: 'white',                  
                  marginTop: '0',                  
                  textAlign: 'left',               
                  marginLeft: '2rem',              
                  fontSize: '3rem',      
                            
                }}>
                  We’re compatible.
                </h1>
                <h1 style={{
                  margin: '1rem',                             
                  color: '#a1a1aa',                
                  fontWeight: '300',               
                  fontSize: '1.25rem',             
                  width: '75%',                   
                  marginLeft: '2rem',            
                  textAlign: 'left',              
                }}>
                  Stream Filmkan from just about any phone, tablet, smart TV, gaming consoles, or PC.
                </h1>
                <div style={{marginLeft:"24px"}}>
                  <AppleIcon sx={{color:"white", fontSize:"45px"}}></AppleIcon>
                  <AdbIcon sx={{color:"white",fontSize:"45px"}}></AdbIcon>
                  <GoogleIcon sx={{color:"white",fontSize:"45px"}}></GoogleIcon>
                  <MicrosoftIcon sx={{color:"white",fontSize:"45px"}}></MicrosoftIcon>
                </div>
              </div>
              <div style={{
                display: 'flex', 
                justifyContent: 'center',
              }}>
                <img src={WelcomePageImage3} alt="Welcome" />
              </div>
            </div>
          </div>
        </Fade>
      </section>


      {/* Section 5 */}
      <section className="bg-black">
        <Fade>
          <div style={{
            display: 'flex', 
            justifyContent: 'center', 
            paddingTop: '2rem',                  
            paddingBottom: '2rem',               
          }}>
            <h1 style={{
              margin: '1rem',                  
              textAlign: 'center',             
              color: 'white',                
              fontWeight: '800',               
              fontSize: '2rem',             
              width: '75%',                   
              marginLeft: '2rem', 
            }}>Playing now on Filmkan</h1>
          </div>

          <div style={{
              display: 'flex', 
              flexWrap: 'wrap',   
              justifyContent:"center", 
              gap: '1rem',  
              width:'100vw',    
            }}>
            {data.map((d, index) => (
              <Card key={index} sx={{ maxWidth: 720, m: 0.5, backgroundColor:"black", border:"2px solid red"}}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={d.image}
                    sx={{
                      width:330,
                      height:144,
                      objectFit:"cover",
                    }}
                  />
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: "white", mb:0}}>
                      {d.title}
                    </Typography>
                  <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                  <Typography gutterBottom component="div" sx={{ color: "white", fontSize:"16px" }}>
                      {d.genre}
                    </Typography>
                    <Typography gutterBottom component="div" sx={{ color: "white", fontSize:"12px" }}>
                      {d.released}
                    </Typography>
                  </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
  
          </div>
          <div
          style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
            variant="contained" 
            color="error"
            size="large" 
            sx={{mt:2}}
            onClick={() => window.location.href = '/Signin'}>
              See What's On
            </Button>
          </div>
        </Fade>
      </section>

      {/* Section 6 */}
      <section></section>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
}

export default Welcome;
