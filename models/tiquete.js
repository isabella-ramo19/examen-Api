import { Schema, model } from 'mongoose';

const tiqueteSchema = new Schema({
  documento: {
    type: Number,
    unique: true,
  },
  numeroTiquete: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
  },
  placaVehiculo: {
    type: String,
  },
  origen: {
    type: String,
  },
  destino: {
    type: String,
  },
  valor: {
    type: Number,
    min: [0, 'El valor no puede ser negativo'],
  },
  impuesto: {
    type: Number,
    min: [0, 'El impuesto no puede ser negativo'],
  },
});

tiqueteSchema.statics.getNextNumeroTiquete = async function () {
  const lastTiquete = await this.findOne().sort({ numeroTiquete: -1 });
  return lastTiquete ? lastTiquete.numeroTiquete + 1 : 1;
};
export default model('Tiquetes', tiqueteSchema);