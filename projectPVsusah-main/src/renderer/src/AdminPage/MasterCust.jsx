import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { Box, Button, TextField, Stack, FormControl, InputLabel, MenuItem, Select, Dialog, DialogTitle, DialogContent, Grid, Checkbox, ListItemText, Typography, FormControlLabel, Snackbar, Alert } from "@mui/material";

export default function MasterCust() {
  const d = new Date("2022-3-25");
  const current = new Date();
  console.log(parseInt((current-d)/1000/60/60/24))
  const [cust, setCust] = useState([]);
  useEffect(() => {
    window.api.getCust().then(function (data) {
      const updatedData = data.map((item) => ({
        ...item,
        subscribed: item.subscribed === "" ? "no" : item.subscribed,
      }));
      // const updatedDatas = updatedData.map((item) => ({
      //   ...item,
      //   type: item.type == null ? "" : `${item.type} hari`
      // }))
      function getSelisih(date) {
        const dateBeli = new Date(date);
        const selisih = parseInt((dateBeli-current)/1000/60/60/24)
        if (selisih < 0) {
          return "Expired"
        } else {
          return `${selisih} hari`
        }
        
      }
      const updatedDatas = updatedData.map((item) => ({
        ...item,
        type: item.type == null ? "Belum Membeli" : getSelisih(item.expired_date)
      }))
      setCust(updatedDatas);
    });
  }, []);
  const columns = [
    {
      field: "username",
      headerName: "Username",
      type: "string",
      flex: 1
    },
    {
      field: "name",
      headerName: "Name",
      type: "string",
      flex: 1
    },
    {
      field: "subscribed",
      headerName: "Subscribed",
      type: "string",
      flex: 1
    },
    {
      field:"expired_date",
      headerName: "Expired Date",
      type:"string",
      flex: 1
    },
    {
      field:"type",
      headerName:"Time Left",
      type:"string",
      flex: 1
    }
  ]

  return <div>
    <h1>Master Cust</h1>
    <DataGrid
      columns={columns}
      rows={cust}
      initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
      slots={{ toolbar: GridToolbar }}
      getRowId={(row) => row.username}
    />
  </div>;
}