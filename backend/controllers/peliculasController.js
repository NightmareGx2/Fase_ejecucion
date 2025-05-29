import peliculasModel from "../models/peliculas.js";
import {v2 as cloudinary} from "cloudinary";
import { config } from "../config.js";


cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
})

const peliculasController = {};

peliculasController.getAllPeliculas = async (req,res)=>{
    const peliculas = await peliculasModel.find()
    res.json(peliculas)

}


peliculasController.insertPeliculas = async (req, res)=>{
    const {name, year, slogan} = req.body
    let imageURL = "";

if(req.file){
const result = await cloudinary.uploader.upload(
    req.file.path,
    {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"]
    }
)

imageURL = result.secure_url
}

const newPeliculas = new peliculasModel({name, year, slogan,  image: imageURL})
newBrand.save()

res.json({message: "brand saved"})
};

peliculasController.putPeliculas = async (req, res) => {
    const {name, year, slogan} = req.body;
    let imageURL = "";

    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "public",
            allowed_formats: ["jpg", "png", "jpeg"],
        })
        imageURL = result.secure_url;
    }

    //actualizar el registro en la base de datos
    await brandModel.findByIdAndUpdate(req.params.id,
    {name, year, slogan, image: imageURL }, {new: true}
    );

    res.json({message: "brand saved"});
}

peliculaController.deletePelicula = async (req, res) => {
    const deletebrand = await brandModel.findByIdAndDelete(req.params.id);
      if (!deletebrand) {
        return res.status(404).json({ message: "brand dont find" });
      }
      res.json({ message: "brand deleted" });
    };
    


export default brandController;