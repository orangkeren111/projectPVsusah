import { Box, Card, Typography, Container, Grid, Grid2, Button, Stack, Dialog, DialogTitle, DialogContent } from '@mui/material';
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
import PortraitIcon from '@mui/icons-material/Portrait';

const playVideo = true;
const data = [];


export default function Home() {
    const { user, login, logout, searchData, profile, setProfile } = useContext(UserContext);
    const [dataHover, setDataHover] = useState(new Array(data.length).fill(false))
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false)
      setProfile(false);
    };
    useEffect(()=>{
      if (profile === true){
        setOpen(true)
      }
    } ,[profile])

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
          <Typography sx={{fontSize:"26px"}}>
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

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{backgroundColor:"black", textAlign:"center"}} >Profile</DialogTitle>
          <DialogContent sx={{backgroundColor:"black", justifyContent:"center", alignItems:"center",minHeight: "200px", minWidth:"360px"}} >
            <PortraitIcon sx={{marginLeft:"116px", width:"82px",height:"82px"}}/>
              <Typography sx={{fontWeight: 'bold'}}>
                Email:
              </Typography>
              <Typography sx={{color:"red", textDecoration: 'underline', mb:"6"}}>
              {user.username}
              </Typography>
              <Typography sx={{fontWeight: 'bold'}}>
                Name:
              </Typography>
              <Typography sx={{color:"red",textDecoration: 'underline', mb:"6"}}>
                {user.name}
              </Typography>
              <Typography sx={{fontWeight: 'bold'}}>
                Subscribe
              </Typography>
              <Typography sx={{color:"red", textDecoration: 'underline', mb:"6"}}>
                {user.subscribed === "" ? "No" : "Yes"}
              </Typography>
          </DialogContent>
        </Dialog>

        <Footer2>

        </Footer2>
        </ThemeProvider>
        
    );
}
