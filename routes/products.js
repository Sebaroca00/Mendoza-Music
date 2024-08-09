const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Joi = require('joi');
const upload = require('../middleware/multer');

// Define el esquema de validación
const productSchema = Joi.object({
  brand: Joi.string().min(1).optional(),
  model: Joi.string().min(1).optional(),
  name: Joi.string().min(1).required(),  // Campo obligatorio
  price: Joi.number().positive().precision(2).optional(),
  description: Joi.string().optional(),
  image: Joi.string().optional()

});

// Crear un producto
router.post('/', async (req, res) => {
  console.log("Request body:", req.body);  // Agrega un mensaje de consola para verificar el cuerpo de la solicitud

  const { error } = productSchema.validate(req.body);
  if (error) {
    console.log("Validation error:", error.details[0].message);  // Agrega un mensaje de consola para depuración
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un producto por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para subir imágenes
router.post('/upload', upload.single('image'), (req, res) => {
  res.status(200).json({ filename: req.file.filename });
});

// Eliminar un producto por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
