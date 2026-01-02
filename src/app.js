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
app.use("/auth", require("./routes/auth.routes"));
app.use("/banner", require("./routes/banner.routes"));
app.use("/informasi", require("./routes/informasi.routes"));
app.use("/iklan", require("./routes/iklan.routes"));
app.use("/sambutan", require("./routes/sambutan.routes"));
app.use("/data-sekolah", require("./routes/dataSekolah.routes"));
app.use("/prestasi", require("./routes/prestasi.routes"));
app.use("/ekskul", require("./routes/ekskul.routes"));
app.use("/berita", require("./routes/berita.routes"));
app.use("/galeri-foto", require("./routes/galeriFoto.routes"));
app.use("/galeri-video", require("./routes/galeriVideo.routes"));
app.use("/kuesioner", require("./routes/kuesioner.routes"));
app.use("/saran", require("./routes/saran.routes"));
app.use("/media-sosial", require("./routes/mediaSosial.routes"));



module.exports = app;
