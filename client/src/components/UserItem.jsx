import { useParams, useNavigate } from 'react-router-dom';  // Importar useNavigate
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Asegúrate de importar axios

export function UserItem() {
    const [user, setUser] = useState({ name: '', email: '' }); // Inicializar con objeto vacío
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const { id } = useParams(); // Usamos destructuración para obtener el id de los params
    const navigate = useNavigate(); // Inicializamos el hook useNavigate para redirigir

    // Manejar los cambios en los campos del formulario
    const handleNombreChange = (event) => setNombre(event.target.value);
    const handleCorreoChange = (event) => setCorreo(event.target.value);

    // Cargar los datos del usuario desde la API cuando el componente se monta
    useEffect(() => {
        setLoading(true); // Indicamos que estamos cargando los datos
        fetch(`http://localhost:3000/users/${id}`)
            .then(res => res.json())
            .then(data => {
                setUser(data); // Cargamos los datos del usuario
                setNombre(data.name); // Pre-cargar los campos con los datos actuales
                setCorreo(data.email);
            })
            .catch(error => {
                setError('Hubo un problema al cargar los datos');
                console.error(error);
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        // Datos que se enviarán a la API
        const userData = {
            name: nombre,
            email: correo
        };

        try {
            // Hacemos una solicitud PUT a la API para actualizar el usuario
            const response = await axios.put(`http://localhost:3000/users/${id}`, userData);

            // Si la solicitud es exitosa, podemos hacer algo, por ejemplo:
            if (response.status === 200) {
                alert('Usuario actualizado exitosamente');
                // Redirigir a la página principal después de actualizar el usuario
                navigate('/'); // Redirigir a la ruta principal
            }
        } catch (err) {
            // Manejo de errores
            if (err.response && err.response.status === 409) {
                setError('El correo ya existe');
            } else {
                setError('Hubo un problema al actualizar el usuario');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 p-10 m-auto max-w-96 h-auto">
            <form className="flex flex-col gap-10 items-center" onSubmit={handleSubmit}>
                <h1 className="text-white text-2xl">Editar usuario</h1>

                {/* Campo Nombre */}
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre} // Usamos el estado de 'nombre' para vincularlo al input
                    onChange={handleNombreChange}
                    className="bg-gray-700 rounded-lg p-2 w-min outline-none text-white"
                />

                {/* Campo Correo */}
                <input
                    type="email"
                    placeholder="Correo"
                    value={correo} // Usamos el estado de 'correo' para vincularlo al input
                    onChange={handleCorreoChange}
                    className="bg-gray-700 rounded-lg p-2 w-min outline-none text-white"
                />

                {/* Mensaje de error */}
                {error && <p className="text-red-500">{error}</p>}

                {/* Botones */}
                <div className="flex gap-3 justify-center">
                    <button
                        type="submit"
                        className="bg-yellow-600 text-white rounded-lg p-2 w-min"
                        disabled={loading}
                    >
                        {loading ? 'Actualizando...' : 'Actualizar'}
                    </button>
                    <Link to="/" className="bg-red-700 text-white rounded-lg p-2 w-min">
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}
