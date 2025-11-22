import { query } from '../config/database.js';
import { z } from 'zod';

// Schema de validación para categorías
const CategoriaSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido').max(50, 'Máximo 50 caracteres'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Color hexadecimal inválido'),
  descripcion: z.string().max(200, 'Máximo 200 caracteres').optional(),
});

// GET /api/categorias - Obtener todas las categorías
export const getCategorias = async (req, res, next) => {
  try {
    const { activo } = req.query;

    let sql = 'SELECT * FROM categorias WHERE 1=1';
    const params = [];

    if (activo !== undefined) {
      params.push(activo === 'true');
      sql += ` AND activo = $${params.length}`;
    }

    sql += ' ORDER BY nombre ASC';

    const result = await query(sql, params);

    // Incluir "Todos" como opción por defecto
    const categorias = [
      { id: 'todos', nombre: 'Todos', color: '#6B7280', activo: true },
      ...result.rows,
    ];

    res.json({
      success: true,
      data: categorias,
      count: result.rows.length,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/categorias/:id - Obtener categoría por ID
export const getCategoriaById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT * FROM categorias WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Categoría no encontrada',
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

// POST /api/categorias - Crear nueva categoría
export const createCategoria = async (req, res, next) => {
  try {
    // Validar datos con Zod
    const validatedData = CategoriaSchema.parse(req.body);

    const result = await query(
      `INSERT INTO categorias (nombre, color, descripcion)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [
        validatedData.nombre,
        validatedData.color,
        validatedData.descripcion || null,
      ]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Categoría creada exitosamente',
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

// PUT /api/categorias/:id - Actualizar categoría
export const updateCategoria = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validatedData = CategoriaSchema.partial().parse(req.body);

    // Construir query dinámica
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.entries(validatedData).forEach(([key, value]) => {
      fields.push(`${key} = $${paramCount}`);
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
    const sql = `UPDATE categorias SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;

    const result = await query(sql, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Categoría no encontrada',
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
      message: 'Categoría actualizada exitosamente',
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

// DELETE /api/categorias/:id - Eliminar categoría
export const deleteCategoria = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'DELETE FROM categorias WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Categoría no encontrada',
      });
    }

    res.json({
      success: true,
      message: 'Categoría eliminada exitosamente',
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/categorias/:id/toggle - Activar/desactivar categoría
export const toggleCategoria = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'UPDATE categorias SET activo = NOT activo WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Categoría no encontrada',
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
      message: `Categoría ${result.rows[0].activo ? 'activada' : 'desactivada'} exitosamente`,
    });
  } catch (error) {
    next(error);
  }
};
