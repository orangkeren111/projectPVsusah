import { Box, Card, Typography, Container, Grid, Grid2, Button, Stack } from '@mui/material';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


const drawerWidth = 180;
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import WelcomePageBanner from "../images/WelcomePageBanner.jpeg";
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from "react";
import { UserContext } from '../Context/UserContext';
import Footer2 from '../componets/Footer/Footer';
import zIndex from '@mui/material/styles/zIndex';
import Carousel from "../componets/Carousel/Carousel" 

const playVideo = true;
const data = [];

export default function Home() {
    const { user, login, logout, searchData } = useContext(UserContext);
    const [dataHover, setDataHover] = useState(new Array(data.length).fill(false))
    const navigate = useNavigate();

    useEffect(()=>{
      setDataHover(new Array(searchData.length).fill(false))
    }, [searchData])

    const handleVideoClick = (id) => {
      {user.subscribed!=""?(
        navigate(`/play/${id}`)
      ):(
        navigate(`/payment`)
      )}
      
    };
    
    const theme = createTheme({
      palette: {
          text: {
              primary: '#ffffff',
              secondary: '#ffffff',
          },
      },
      typography: {
          allVariants: {
              color: 'white', 
          },
      },
      components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#212121', 
                },
            },
        },
      
        MuiMenu: {
          styleOverrides: {
            paper: {
              color: '#ffffff', 
              backgroundColor: '#333333', 
            },
          },
        },
        MuiMenuItem: {
          styleOverrides: {
            root: {
              backgroundColor: '#333333',
              color: '#ffffff',
            },
          },
        },
      },
    });
    
    
    const handleHover = (index)=>{
      if (playVideo){
        let dataTemp = [...dataHover];
        dataTemp[index] = true;
        setDataHover(dataTemp)
      }
      
    }
    const handleExitHover = ()=>{
      setDataHover(new Array(searchData.length).fill(false))
    }

    return (
      <ThemeProvider theme={theme}>
            <CssBaseline />
        <Box sx={{ backgroundColor:'black'}}>
        
        <Carousel>
        </Carousel>

        <Box sx={{ marginTop: 4, padding: 3 }}>
          <Typography sx={{fontSize:"32px"}}>
            Top Pick For You 💕
          </Typography>
        <Grid
            container spacing={3} justifyContent="center"
        >
          {searchData.map((d, index)=>(
            <Grid item xs={3} sm={3} md={3} key={d.title}>
              <Card 
              sx={{ maxWidth: 300, transition: 'background-color 0.3s ease, transform 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#333333',
                          border:"2px solid red",
                          transform: 'scale(1.05)',}}} 
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleExitHover()}
                onClick={() => handleVideoClick(d.id)}>
                  {dataHover[index] ? (                  
                  <>
                    <CardMedia component="img" 
                      sx={{height:'20vh', borderBottom:"3px solid red"}} 
                      width="max" image={d.image}  />
                      <CardContent>
                        <Typography variant="h2" sx={{fontSize:'1.4vw'}}>{d.title}</Typography>
                        {/* <Typography variant='body1' sx={{fontSize:'1.25vw'}}>{d.released}</Typography> */}
                          <Box sx={{display:'flex', justifyContent:'space-between'}}>
                            <Typography variant="body3" sx={{ color: 'text.secondary', fontSize:'1vw' }}>
                                {d.genre} - {d.released}
                            </Typography>
                          </Box>  
                      </CardContent>
                  </>
                    ) : (
                      <CardMedia component="img" 
                      sx={{height:'20vh', borderBottom:"3px solid red"}} 
                      width="max" image={d.image}  />
                    )}
              </Card>
            </Grid>
          ))}  
        </Grid>
        </Box>
        </Box>
        <Footer2></Footer2>
        </ThemeProvider>
        
    );
}
