import { query } from '../config/database.js';
import { z } from 'zod';

// Schema de validación para métodos de pago
const MetodoPagoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido').max(50, 'Máximo 50 caracteres'),
  tipo: z.enum(['efectivo', 'tarjeta', 'transferencia', 'credito', 'otro'], {
    errorMap: () => ({ message: 'Tipo inválido' }),
  }),
  requiereReferencia: z.boolean().default(false),
  icono: z.string().optional(),
  comision: z.number().min(0).max(100).optional(), // porcentaje
});

// GET /api/metodos-pago - Obtener todos los métodos de pago
export const getMetodosPago = async (req, res, next) => {
  try {
    const { activo } = req.query;

    let sql = 'SELECT * FROM metodos_pago WHERE 1=1';
    const params = [];

    if (activo !== undefined) {
      params.push(activo === 'true');
      sql += ` AND activo = $${params.length}`;
    }

    sql += ' ORDER BY nombre ASC';

    const result = await query(sql, params);

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/metodos-pago/:id - Obtener método de pago por ID
export const getMetodoPagoById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT * FROM metodos_pago WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Método de pago no encontrado',
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/metodos-pago - Crear nuevo método de pago
export const createMetodoPago = async (req, res, next) => {
  try {
    // Validar datos con Zod
    const validatedData = MetodoPagoSchema.parse(req.body);

    const result = await query(
      `INSERT INTO metodos_pago (nombre, tipo, requiere_referencia, icono, comision)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        validatedData.nombre,
        validatedData.tipo,
        validatedData.requiereReferencia || false,
        validatedData.icono || null,
        validatedData.comision || 0,
      ]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Método de pago creado exitosamente',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Error de validación',
        details: error.errors,
      });
    }
    next(error);
  }
};

// PUT /api/metodos-pago/:id - Actualizar método de pago
export const updateMetodoPago = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validatedData = MetodoPagoSchema.partial().parse(req.body);

    // Construir query dinámica
    const fields = [];
    const values = [];
    let paramCount = 1;

    // Mapear campos camelCase a snake_case
    const fieldMapping = {
      requiereReferencia: 'requiere_referencia',
    };

    Object.entries(validatedData).forEach(([key, value]) => {
      const dbField = fieldMapping[key] || key;
      fields.push(`${dbField} = $${paramCount}`);
      values.push(value);
      paramCount++;
    });

    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No se proporcionaron campos para actualizar',
      });
    }

    values.push(id);
    const sql = `UPDATE metodos_pago SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;

    const result = await query(sql, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Método de pago no encontrado',
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
      message: 'Método de pago actualizado exitosamente',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Error de validación',
        details: error.errors,
      });
    }
    next(error);
  }
};

// DELETE /api/metodos-pago/:id - Eliminar método de pago
export const deleteMetodoPago = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'DELETE FROM metodos_pago WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Método de pago no encontrado',
      });
    }

    res.json({
      success: true,
      message: 'Método de pago eliminado exitosamente',
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/metodos-pago/:id/toggle - Activar/desactivar método de pago
export const toggleMetodoPago = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'UPDATE metodos_pago SET activo = NOT activo WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Método de pago no encontrado',
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
      message: `Método de pago ${result.rows[0].activo ? 'activado' : 'desactivado'} exitosamente`,
    });
  } catch (error) {
    next(error);
  }
};
