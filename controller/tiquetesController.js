import Tiquetes from '../models/tiquete.js';

export async function GetAlltiquetes(req, res) {
    try {
        const tiquetes = await Tiquetes.find();
        res.status(200).json(tiquetes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tiquetes', error });
    }
}

export async function GetallById(req, res) {
    const { id } = req.params;
    try {
        const tiquete = await Tiquetes.findById(id);
        if (!tiquete) {
            return res.status(404).json({ message: 'Tiquete no encontrado' });
        }
        res.status(200).json(tiquete);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el tiquete', error });
    }
}

export async function createTiquetes(req, res) {
    const { documento, name, placaVehiculo, origen, destino, valor } = req.body;
    const numeroTiquete = await Tiquetes.getNextNumeroTiquete();

    try {
        const nuevoTiquete = new Tiquetes({
           
            numeroTiquete,
            documento,
            name,
            placaVehiculo,
            origen,
            destino,
            valor
        });

        // Guardar el nuevo tiquete
        await nuevoTiquete.save();

        res.status(201).json({ message: 'Tiquete creado con éxito', nuevoTiquete });
    } catch (error) {
        if (error.code && error.code === 11000) {
            return res.status(400).json({ message: 'Error de clave duplicada', error });
        }
        res.status(500).json({ message: 'Error al crear el tiquete', error });
    }
}
export async function putTiquetes(req, res) {
    const { id } = req.params;
    const { documento, name, placaVehiculo, origen, destino, valor } = req.body;
    try {
        const tiqueteActualizado = await Tiquetes.findByIdAndUpdate(
            id,
            { documento, name, placaVehiculo, origen, destino, valor },
            { new: true }
        );

        if (!tiqueteActualizado) {
            return res.status(404).json({ message: 'Tiquete no encontrado' });
        }
        res.status(200).json({ message: 'Tiquete actualizado con éxito', tiqueteActualizado });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el tiquete', error });
    }
}

export async function deleteTiquete(req, res) {
    const { id } = req.params;
    try {
        const tiqueteEliminado = await Tiquetes.findByIdAndDelete(id);
        if (!tiqueteEliminado) {
            return res.status(404).json({ message: 'Tiquete no encontrado' });
        }
        res.status(200).json({ message: 'Tiquete eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el tiquete', error });
    }
}