import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function AddUser() {
  // Definir los estados para los valores del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Manejar los cambios en los campos del formulario
  const handleNombreChange = (event) => setNombre(event.target.value);
  const handleCorreoChange = (event) => setCorreo(event.target.value);

  // Función para manejar el envío del formulario
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
      // Aquí se hace la solicitud POST a tu API REST
      const response = await axios.post('http://localhost:3000/users', userData);

      // Si la solicitud es exitosa, puedes manejar la respuesta aquí
      if (response.status === 200) {
        alert('Usuario creado exitosamente');
        // Redirigir o limpiar el formulario, por ejemplo
        navigate('/');
      }
    } catch (err) {
      // Manejo de errores
      

      if(err.response.status === 409){
        setError('El correo ya existe')
      }
      else{
        setError('Hubo un problema al crear el usuario');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-10 m-auto max-w-96 h-auto">
      <form className="flex flex-col gap-10 items-center" onSubmit={handleSubmit}>
        <h1 className="text-white text-2xl">Crear usuario</h1>

        {/* Campo Nombre */}
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={handleNombreChange}
          className="bg-gray-700 rounded-lg p-2 w-min outline-none text-white"
        />

        {/* Campo Correo */}
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={handleCorreoChange}
          className="bg-gray-700 rounded-lg p-2 w-min outline-none text-white"
        />

        {/* Mensaje de error */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Botones */}
        <div className="flex gap-3 justify-center">
          <button
            type="submit"
            className="bg-green-700 text-white rounded-lg p-2 w-min"
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear'}
          </button>
          <Link to="/" className="bg-red-700 text-white rounded-lg p-2 w-min">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}