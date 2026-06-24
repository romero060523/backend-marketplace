require('dotenv').config();
const { sequelize, Category, Product, User } = require('./models');

const categories = [
    { nombre: 'Electrónica' },
    { nombre: 'Ropa' },
    { nombre: 'Hogar' },
    { nombre: 'Deportes' },
    { nombre: 'Libros' },
];

const products = [
    { nombre: 'Audífonos Bluetooth', precio: 89.90, descripcion: 'Audífonos inalámbricos con cancelación de ruido', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', category: 'Electrónica' },
    { nombre: 'Smartwatch Pro', precio: 299.90, descripcion: 'Reloj inteligente con monitor cardíaco y GPS', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', category: 'Electrónica' },
    { nombre: 'Teclado Mecánico RGB', precio: 159.90, descripcion: 'Teclado mecánico con switches Cherry MX y retroiluminación RGB', imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500', category: 'Electrónica' },
    { nombre: 'Cámara Web HD', precio: 129.90, descripcion: 'Cámara web 1080p con micrófono integrado', imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500', category: 'Electrónica' },

    { nombre: 'Polo Algodón Premium', precio: 49.90, descripcion: 'Polo de algodón orgánico, disponible en varios colores', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', category: 'Ropa' },
    { nombre: 'Zapatillas Running', precio: 199.90, descripcion: 'Zapatillas ligeras para correr con amortiguación', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', category: 'Ropa' },
    { nombre: 'Casaca Impermeable', precio: 179.90, descripcion: 'Casaca resistente al agua y al viento', imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500', category: 'Ropa' },

    { nombre: 'Lámpara de Escritorio LED', precio: 69.90, descripcion: 'Lámpara LED con regulador de brillo y temperatura de color', imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab3fe?w=500', category: 'Hogar' },
    { nombre: 'Organizador de Escritorio', precio: 39.90, descripcion: 'Organizador de bambú para escritorio con compartimentos', imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500', category: 'Hogar' },
    { nombre: 'Set de Tazas Cerámicas', precio: 59.90, descripcion: 'Set de 4 tazas de cerámica artesanal', imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500', category: 'Hogar' },

    { nombre: 'Mancuernas Ajustables', precio: 249.90, descripcion: 'Set de mancuernas ajustables de 2 a 20 kg', imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500', category: 'Deportes' },
    { nombre: 'Colchoneta de Yoga', precio: 59.90, descripcion: 'Colchoneta antideslizante de 6mm de grosor', imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500', category: 'Deportes' },
    { nombre: 'Botella Deportiva 1L', precio: 29.90, descripcion: 'Botella térmica de acero inoxidable', imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500', category: 'Deportes' },

    { nombre: 'Clean Code', precio: 79.90, descripcion: 'Robert C. Martin - Guía para escribir código limpio', imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500', category: 'Libros' },
    { nombre: 'JavaScript: The Good Parts', precio: 49.90, descripcion: 'Douglas Crockford - Las mejores partes de JavaScript', imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500', category: 'Libros' },
];

async function seed() {
    try {
        await sequelize.authenticate();
        console.log('Conectado a la base de datos.');

        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados.');

        const createdCategories = {};
        for (const cat of categories) {
            const [record] = await Category.findOrCreate({ where: { nombre: cat.nombre } });
            createdCategories[cat.nombre] = record.id;
            console.log(`Categoría: ${cat.nombre} (id: ${record.id})`);
        }

        for (const prod of products) {
            const { category, ...data } = prod;
            await Product.create({
                ...data,
                categoryId: createdCategories[category],
            });
            console.log(`Producto: ${prod.nombre}`);
        }

        const [admin] = await User.findOrCreate({
            where: { email: 'admin@tecsup.edu.pe' },
            defaults: {
                nombre: 'Admin',
                email: 'admin@tecsup.edu.pe',
                password: 'admin123',
                rol: 'ADMIN',
            },
        });
        console.log(`\nUsuario ADMIN: admin@tecsup.edu.pe / admin123 (id: ${admin.id})`);

        console.log(`\nSeed completado: ${categories.length} categorías, ${products.length} productos.`);
        process.exit(0);
    } catch (error) {
        console.error('Error en seed:', error);
        process.exit(1);
    }
}

seed();
