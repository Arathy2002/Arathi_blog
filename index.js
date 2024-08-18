const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());
require("./connection"); // Ensure your MongoDB connection file is correct and functional

const BlogModel = require('./Model'); // Ensure the Model is correctly defined

app.post("/add", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const newBlog = new BlogModel(req.body);
    const result = await newBlog.save();
    res.status(201).send({ message: "Added successfully", data: result });
  } catch (error) {
    console.error("Error adding:", error);
    res.status(500).send({ message: "Failed to add", error: error.message });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const updatedData = req.body;

    const updated = await BlogModel.findByIdAndUpdate(blogId, updatedData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).send({ message: "Blog not found" });
    }

    res.status(200).send(updated);
  } catch (error) {
    console.error("Error updating:", error);
    res.status(500).send({ message: "Error updating", error: error.message });
  }
});

app.get("/get", async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.status(200).send(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send({ message: "Error fetching blogs", error: error.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await BlogModel.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    res.status(200).send({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting:", error);
    res.status(500).send({ message: "Error deleting blog", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
