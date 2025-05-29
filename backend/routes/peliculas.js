import express from "express";
import brandController from "../controllers/brandController.js";
import multer from "multer";

const router  = express.Router();

//configurar una carpeta en local que guarde eñ registro de las imagenes subidas

const upload = multer({dest: "public/"})

router.route("/")
    .get(peliculasController.getAllPeliculas)
    .post(upload.single("image"), peliculasController.insertPeliculas)

    router.route("/:id")
    .put(upload.single("image"), peliculasController.putPeliculas)
    .delete(peliculasController.deletebrand);

export default router;