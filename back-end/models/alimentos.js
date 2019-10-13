const mongoose= require('mongoose');

const alimentosSchema= new mongoose.Schema({
    cantidad: String,
    grupo: String,
    imagen: String,
    medida: String,
    nombre: String,
    oferta: Boolean,
    precio: Number,
    tipoOferta: String,
    valoracion: Number,
    vezesComprado: Number,
});

const Alimento = mongoose.model('alimentos', alimentosSchema);
exports.Alimento = Alimento;