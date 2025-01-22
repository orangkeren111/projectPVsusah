import React, { useContext, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Footer2 from '../componets/Footer/Footer';

function Payment() {
  const [subscriptionType, setSubscriptionType] = useState("1 month");
  const [totalCost, setTotalCost] = useState(10);
  const {user, updateSubscribe} = useContext(UserContext)
  const navigate = useNavigate();

  // Pricing data
  const pricing = {
    "1 month": 10,
    "3 month": 25,
    "1 year": 90,
  };

  const handleSubscriptionChange = (event) => {
    const selectedType = event.target.value;
    setSubscriptionType(selectedType);
    setTotalCost(pricing[selectedType]);
  };
  const getCurrDate = ()=>{
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Months are zero-based
    const day = now.getDate();
    
    return (`${year}-${month}-${day}`);
  }
  const getCurrTime = ()=>{
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return (`${hours}:${minutes}:${seconds}`)
  }

  const handleSubscribe = () => {
    updateSubscribe();
    navigate("/")
    const dataNota = {name: user.name, cost: parseFloat(totalCost), type: subscriptionType, date: getCurrDate(), time: getCurrTime()}
    window.api.makeInvoice(dataNota)
  };

  return (
    <>
    <Box sx={{
      paddingTop:"10vh",
      paddingBottom:"10vh",
      backgroundColor:"#620000",
    }}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 400,
        height: 500,
        margin: "auto",
        padding: 4,
        backgroundColor: "#fffaf0",
        borderRadius: 4,
        boxShadow: 3,
        
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Payment Page
      </Typography>

      {/* Buyer's Name */}
      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        value={user.name}
        sx={{ marginBottom: 2 }}
        disabled
      />

      {/* Purchase Type */}
      <TextField
        select
        fullWidth
        label="Purchase Type"
        value={subscriptionType}
        onChange={handleSubscriptionChange}
        variant="outlined"
        sx={{ marginBottom: 2 }}
      >
        {Object.keys(pricing).map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>

      {/* Total Cost */}
      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        Total Cost: ${totalCost}
      </Typography>

      {/* Buttons */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleSubscribe()}
        >
          Subscribe
        </Button>
      </Box>
    </Box>    
    </Box>
      <Footer2></Footer2>
    </>
    
  );
}

export default Payment;
