import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { Box, Button, TextField, Stack, FormControl, InputLabel, MenuItem, Select, Dialog, DialogTitle, DialogContent, Grid, Checkbox, ListItemText, Typography, FormControlLabel, Snackbar, Alert } from "@mui/material";

export default function MasterCust() {
  const [cust, setCust] = useState([]);
  useEffect(() => {
    window.api.getCust().then(function (data) {
      const updatedData = data.map((item) => ({
        ...item,
        subscribed: item.subscribed === "" ? "no" : item.subscribed,
      }));
      setCust(updatedData);
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