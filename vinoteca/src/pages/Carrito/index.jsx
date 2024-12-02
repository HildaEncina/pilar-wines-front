
import { useSelector } from 'react-redux'; 
import CardProducto from '../../componente/CardProducto'; // Asegúrate de que la ruta sea correcta
import PropTypes from 'prop-types'; // Importa PropTypes
import './carrito-styles.scss'; // Estilos opcionales

const Carrito = () => {
    // Suponiendo que tienes el carrito en tu estado de Redux
    const { productos, montoTotal } = useSelector(state => state.carrito); // Cambia esto según tu estructura de Redux

    if (!productos || productos.length === 0) {
        return <div>No hay productos en el carrito.</div>;
    }

    return (
        <div className="carrito">
            <h2>Productos en el carrito</h2>
            <div className="carrito-lista">
            {productos.map(producto => {
    if (!producto.fotos || !Array.isArray(producto.fotos)) {
        producto.fotos = []; // O asigna un valor por defecto
    }
    return (
        <CardProducto
            key={producto.id}
            id={producto.id}
            marca={producto.marca}
            tipo={producto.tipo}
            cosecha={producto.cosecha}
            precio={producto.precio}
            fotos={producto.fotos}
        />
    );
})}
            </div>
            <div className="monto-total">
                <h3>Monto Total: ${montoTotal}</h3>
            </div>
        </div>
    );
};

// Definición de PropTypes
Carrito.propTypes = {
    productos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            marca: PropTypes.string.isRequired,
            tipo: PropTypes.string.isRequired,
            cosecha: PropTypes.string.isRequired,
            precio: PropTypes.number.isRequired,
            fotos: PropTypes.arrayOf(PropTypes.string).isRequired,
        })
    ).isRequired,
    montoTotal: PropTypes.number.isRequired,
};

export default Carrito;
