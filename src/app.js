require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API MIM School running 🚀");
});

// ROUTES
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/banner", require("./routes/banner.routes"));
app.use("/api/informasi", require("./routes/informasi.routes"));
app.use("/api/iklan", require("./routes/iklan.routes"));
app.use("/api/sambutan", require("./routes/sambutan.routes"));
app.use("/api/data-sekolah", require("./routes/dataSekolah.routes"));
app.use("/api/prestasi", require("./routes/prestasi.routes"));
app.use("/api/ekskul", require("./routes/ekskul.routes"));
app.use("/api/berita", require("./routes/berita.routes"));
app.use("/api/galeri-foto", require("./routes/galeriFoto.routes"));
app.use("/api/galeri-video", require("./routes/galeriVideo.routes"));
app.use("/api/kuesioner", require("./routes/kuesioner.routes"));
app.use("/api/saran", require("./routes/saran.routes"));
app.use("/api/media-sosial", require("./routes/mediaSosial.routes"));



module.exports = app;
