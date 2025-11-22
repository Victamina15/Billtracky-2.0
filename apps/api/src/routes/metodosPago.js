import express from 'express';
import {
  getMetodosPago,
  getMetodoPagoById,
  createMetodoPago,
  updateMetodoPago,
  deleteMetodoPago,
  toggleMetodoPago,
} from '../controllers/metodosPago.controller.js';

const router = express.Router();

// GET /api/metodos-pago - Listar todos los métodos de pago
router.get('/', getMetodosPago);

// GET /api/metodos-pago/:id - Obtener método de pago específico
router.get('/:id', getMetodoPagoById);

// POST /api/metodos-pago - Crear nuevo método de pago
router.post('/', createMetodoPago);

// PUT /api/metodos-pago/:id - Actualizar método de pago
router.put('/:id', updateMetodoPago);

// DELETE /api/metodos-pago/:id - Eliminar método de pago
router.delete('/:id', deleteMetodoPago);

// PATCH /api/metodos-pago/:id/toggle - Activar/desactivar
router.patch('/:id/toggle', toggleMetodoPago);

export default router;
