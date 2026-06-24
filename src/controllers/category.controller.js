const { Category } = require('../models');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({ order: [['nombre', 'ASC']] });
        res.json({ success: true, data: categories });
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ success: false, message: 'Error al obtener categorías' });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ success: false, message: 'Nombre es requerido' });
        }

        const category = await Category.create({ nombre });
        res.status(201).json({ success: true, message: 'Categoría creada', data: category });
    } catch (error) {
        console.error('Error al crear categoría:', error);
        res.status(500).json({ success: false, message: 'Error al crear categoría' });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
        }

        await category.update({ nombre: req.body.nombre });
        res.json({ success: true, message: 'Categoría actualizada', data: category });
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        res.status(500).json({ success: false, message: 'Error al actualizar categoría' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
        }

        await category.destroy();
        res.json({ success: true, message: 'Categoría eliminada' });
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).json({ success: false, message: 'Error al eliminar categoría' });
    }
};
