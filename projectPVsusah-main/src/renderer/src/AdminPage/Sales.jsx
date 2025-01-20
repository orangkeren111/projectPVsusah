import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { Box, Button, TextField, Stack, FormControl, InputLabel, MenuItem, Select, Dialog, DialogTitle, DialogContent, Grid, Checkbox, ListItemText, Typography, FormControlLabel, Snackbar, Alert, Card, CardContent } from "@mui/material";

export default function Sales() {
  const cost = [
    10,
    25,
    90
  ]
  const type = [
    "1 month",
    "3 month",
    "1 year"
  ]
  const [sales, setSales] = useState([]);
  const [rata, setRata] = useState([]);
  const [mostFrequent, setMostFrequent] = useState([]);
  const [total, setTotal] = useState([]);
  useEffect(() => {
    window.api.getSales().then(function (data) {
      setSales(data);
      const totalCost = data.reduce((sum, item) => sum + (item.cost || 0), 0);
      setTotal(totalCost)
      const averageCost = data.length > 0 ? totalCost / data.length : 0;
      const roundedAvgCost = parseFloat(averageCost.toFixed(2));
      setRata(roundedAvgCost)

      const types = data.map((item) => item.type);
      const uniqueTypes = [...new Set(types)];

      let mostFrequentType = "";
      let maxCount = 0;

      uniqueTypes.forEach((type) => {
        const count = types.filter((t) => t === type).length;
        if (count > maxCount) {
          maxCount = count;
          mostFrequentType = type;
        }
      });
      setMostFrequent(mostFrequentType);
    });
  }, []);
  const columns = [
    {
      field: "id",
      headerName: "ID",
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
      field: "cost",
      headerName: "Cost",
      type: "string",
      flex: 1, 
      valueOptions: cost
    },
    {
      field: "type",
      headerName: "Type",
      type: "string",
      flex: 1,
      valueOptions: type
    },
    {
      field: "date",
      headerName: "Date",
      type: "string",
      flex: 1
    },
    {
      field: "time",
      headerName: "Time",
      type: "string",
      flex: 1
    },
  ]


  return <div>
    <h1>Sales</h1>
    <DataGrid
      columns={columns}
      rows={sales}
      initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
      slots={{ toolbar: GridToolbar }}
    />
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", p: 4 }}>
      <Grid container spacing={3} maxWidth={900}>
        {/* Kartu 1 */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom align="center">
                Detail Sales
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center">
                Rata-rata pendapatan:
              </Typography>
              <Typography variant="h5" color="primary" fontWeight="bold" align="center">
                {rata}$
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Kartu 2 */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom align="center">
                Detail Sales
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center">
                Tipe yang sering dibeli:
              </Typography>
              <Typography variant="h5" color="primary" fontWeight="bold" align="center">
                {mostFrequent}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Kartu 3 */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom align="center">
                Detail Sales
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center">
                Total Pendapatan:
              </Typography>
              <Typography variant="h5" color="primary" fontWeight="bold" align="center">
                {total}$
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </div>;
}