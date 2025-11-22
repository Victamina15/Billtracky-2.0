import express from 'express';
import {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  toggleCategoria,
} from '../controllers/categorias.controller.js';

const router = express.Router();

// GET /api/categorias - Listar todas las categorías
router.get('/', getCategorias);

// GET /api/categorias/:id - Obtener categoría específica
router.get('/:id', getCategoriaById);

// POST /api/categorias - Crear nueva categoría
router.post('/', createCategoria);

// PUT /api/categorias/:id - Actualizar categoría
router.put('/:id', updateCategoria);

// DELETE /api/categorias/:id - Eliminar categoría
router.delete('/:id', deleteCategoria);

// PATCH /api/categorias/:id/toggle - Activar/desactivar
router.patch('/:id/toggle', toggleCategoria);

export default router;
