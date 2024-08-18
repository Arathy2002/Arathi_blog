import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    Title: "",
    content: "",
    img_url: "",
  });

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // const addData = () => {
  //   axios
  //     .post("http://localhost:3001/add", inputs)
  //     .then((res) => {
  //       alert(res.data.message);
  //       navigate("/");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const addData = () => {
    // Check if we're updating or adding new data
    if (inputs._id) {
      // Updating existing employee data
      axios
        .put(`http://localhost:3001/update/${inputs._id}`, inputs)
        .then((response) => {
          console.log("Data successfully updated:", response.data);
          navigate("/");
        })
        .catch((error) => {
          console.error("There was an error updating the data!", error);
        });
    } else {
      axios
        .post("http://localhost:3001/add", inputs)
        .then((response) => {
          console.log("Data successfully added:", response.data);
          navigate("/");
        })
        .catch((error) => {
          console.error("There was an error adding the data!", error);
        });
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "600px",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Title"
            onChange={inputHandler}
            name="Title"
            value={inputs.Title}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Content"
            onChange={inputHandler}
            name="content"
            value={inputs.content}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Image URL"
            onChange={inputHandler}
            name="img_url"
            value={inputs.img_url}
            fullWidth
          />
          <Button variant="contained" color="secondary" onClick={addData}>
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Add;
