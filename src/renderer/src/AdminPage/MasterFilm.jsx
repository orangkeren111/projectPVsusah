import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { Box, Button, TextField, Stack, FormControl, InputLabel, MenuItem, Select, Dialog, DialogTitle, DialogContent, Grid, Checkbox, ListItemText, Typography, FormControlLabel, Snackbar, Alert } from "@mui/material";


export default function MasterFilm() {
  const [film, setFilm] = useState([]);
  const genre = [
    "Action",
    "Adventure",
    "Crime",
    "Drama",
    "Horror",
    "Music",
    "Musical",
    "Romance",
    "Sci-Fi",
    "Thriller"
  ]
  useEffect(() => {
    window.api.getFilm().then(function (data) {
      setFilm(data);
    });
  }, []);
  let currentYear = parseInt(new Date().getFullYear());
  

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [title, setTitle] = useState("");
  const [released, setReleased] = useState(1900);
  const [desc, setDesc] = useState("");
  const [linkImg, setLinkImg] = useState("");
  const [id, setId] = useState("");
  const [videoId, setVideoId] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  // Handle Checkbox Change
  const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    setSelectedGenres((prev) => 
      checked ? [...prev, value] : prev.filter((genre) => genre !== value)
    );
  };

  function clear() {
    setSelectedGenres([])
    setTitle("")
    setReleased(1900)
    setDesc("")
    setLinkImg("")
    setId("")
    setVideoId("")
  }

  function process() {
  
    
    if (title == "") {
      setErrorMessage("Judul tidak boleh kosong!");
      setOpenErrorSnackbar(true);
      return
    }
    if (released < 1900 || released > currentYear) {
      setErrorMessage(`Tahun rilis harus antara 1900 dan ${currentYear}!`);
      setOpenErrorSnackbar(true);
      return
    }
    if (desc == "") {
      setErrorMessage("Deskripsi tidak boleh kosong!");
      setOpenErrorSnackbar(true);
      return
    }
    if (linkImg == "") {
      setErrorMessage("URL gambar tidak boleh kosong!");
      setOpenErrorSnackbar(true);
      return
    }
    if (videoId == "") {
      setErrorMessage("Video ID tidak boleh kosong!");
      setOpenErrorSnackbar(true);
      return
    }
    if (selectedGenres.length == 0) {
      setErrorMessage("Genre harus dipilih!");
      setOpenErrorSnackbar(true);
      return
    }

    if (id == "") {
      //insert
      let lastFilmId = film.length > 0 ? parseInt(film[film.length - 1].id) : -1;
      lastFilmId+=1;
      const newFilm = {
        id:lastFilmId,
        title:title,
        released:released,
        description:desc,
        image:linkImg,
        videoID:videoId,
        genre: selectedGenres.join(", ")
      }
      const addNewFilm = [...film, newFilm];
      setFilm(addNewFilm)
      window.api.saveFilm(addNewFilm);
      clear()
      setOpenSnackbar(true);
    } else {
      //update
      const newFilm = {
        id:id,
        title:title,
        released:released,
        description:desc,
        image:linkImg,
        videoID:videoId,
        genre: selectedGenres.join(", ")
      }
      const addNewFilm = film.map((f) => f.id == newFilm.id ? newFilm : f);
      setFilm(addNewFilm)
      window.api.saveFilm(addNewFilm);
      clear()
      setOpenSnackbar(true);
    }
  }

  function edit(rowini) {
    setId(rowini.id)
    setTitle(rowini.title)
    setReleased(rowini.released)
    setDesc(rowini.description)
    setLinkImg(rowini.image)
    setVideoId(rowini.videoID)
    setSelectedGenres(rowini.genre.split(", "))
  }
  
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const handleCellClick = (params) => {
    if (params.field === "image") {
      setImageSrc(params.value);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setImageSrc("");
  };
 
  function deleteFilm(id) {
    const newFilm = film.filter((f) => f.id != id);
    setFilm(newFilm)
    window.api.saveFilm(newFilm);
    setOpenDeleteSnackbar(true);
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "string",
      flex: 1
    },
    {
      field: "title",
      headerName: "Title",
      type: "string",
      flex: 2
    },
    {
      field: "released",
      headerName: "Released",
      type: "string",
      flex: 1
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      flex: 3
    },
    {
      field: "image",
      headerName: "Image",
      type: "action",
      flex: 2,
      renderCell: function (params) {
        return (
          <Button variant="contained">See Image</Button>
        );
      }
    },
    {
      field: "videoID",
      headerName: "Video ID",
      type: "string",
      flex: 1
    },
    {
      field: "genre",
      headerName: "Genre",
      type: "string",
      flex: 2
    },
    {
      field:"action",
      headerName:"Action",
      type:"action",
      flex:3,
      renderCell:function (param) {
        return <>
          <Button variant="contained" sx={{backgroundColor:"#F6BE00"}} onClick={() => edit(param.row)}>Edit</Button>
          <Button variant="contained" sx={{backgroundColor:"red", marginLeft:1}} onClick={() => deleteFilm(param.row.id)}>Delete</Button>
        </>
      }
    }
  ];
  




  return <div>
    <h1>Master Film</h1>
    <DataGrid
      columns={columns}
      rows={film}
      initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
      slots={{ toolbar: GridToolbar }}
      onCellClick={handleCellClick}
    />
    <Box sx={{ padding: 2 }}>
      <h2>{id == "" ? "Add Film" : "Edit Film"}</h2>
      <Grid container spacing={2}>
        {/* ID Field - Disabled */}
        <Grid item size={12}>
          <TextField
            fullWidth
            label="ID"
            value={id}
            disabled
            variant="outlined"
          />
        </Grid>

        {/* Title Field */}
        <Grid item size={12}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>

        {/* Released Field */}
        <Grid item size={12}>
          <TextField
            fullWidth
            label="Released"
            variant="outlined"
            type="number"
            inputProps={{
              min: 1900,
              max: 9999,  
              step: 1 
            }}
            value={released}
            onChange={(e) => setReleased(e.target.value)}
          />
        </Grid>

        {/* Description Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Grid>

        {/* Image URL Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Image URL"
            variant="outlined"
            value={linkImg}
            onChange={(e) => setLinkImg(e.target.value)}
          />
        </Grid>

        {/* Video ID Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Video ID"
            value={videoId}
            variant="outlined"
            onChange={(e) => setVideoId(e.target.value)}
          />
        </Grid>

        {/* Genre Field - Multiple Checkboxes */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>Genre</Typography>
          {genre.map((genreItem) => (
            <FormControlLabel
              key={genreItem}
              control={
                <Checkbox
                  checked={selectedGenres.indexOf(genreItem) > -1}
                  onChange={handleGenreChange}
                  value={genreItem}
                  color="primary"
                />
              }
              label={genreItem}
            />
          ))}
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12} container spacing={2} justifyContent="center">
          <Grid item xs={5.75}>
            <Button variant="contained" color="primary" sx={{ width: "100%" }} onClick={process}>
              Process
            </Button>
          </Grid>
          <Grid item xs={5.75}>
            <Button variant="outlined" color="primary" sx={{ width: "100%" }} onClick={clear}>
              Reset
            </Button>
          </Grid>
      </Grid>
      </Grid>
    </Box>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          <img
            src={imageSrc}
            alt="Film Thumbnail"
            style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }}
          />
        </DialogContent>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Proses berhasil!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openDeleteSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenDeleteSnackbar(false)}

      >
        <Alert onClose={() => setOpenDeleteSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Film deleted successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenErrorSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenErrorSnackbar(false)} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
    </Snackbar>
  </div>;
}