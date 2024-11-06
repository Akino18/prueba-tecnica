import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function UserList({ users }) {
  // Validar si users es null o undefined, en cuyo caso inicializamos con un array vacío
  const [localUsers, setLocalUsers] = useState(users || []);
  const [searchTerm, setSearchTerm] = useState('');

  // Sincronizar localUsers con la prop users cuando esta cambie
  useEffect(() => {
    // Si users es null o undefined, se usará un array vacío
    setLocalUsers(users || []);
  }, [users]);

  // Filtrar usuarios que coinciden con el término de búsqueda
  const filteredUsers = localUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para eliminar usuario
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/users/${id}`);

      if (response.status === 200) {
        // Eliminar el usuario localmente sin hacer una nueva solicitud a la API
        setLocalUsers(localUsers.filter(user => user.id !== id));
        alert('Usuario eliminado exitosamente');
      }
    } catch (err) {
      console.error(err);
      alert('Hubo un error al eliminar el usuario');
    }
  };

  return (
    <div className="bg-gray-800 p-10">
      <h1 className="text-white text-2xl mb-6">Usuarios</h1>

      {/* Sección de búsqueda */}
      <div className="flex flex-col gap-4 md:flex-row md:gap-6 mb-6">
        <div className="flex items-center gap-3">
          <label htmlFor="search" className="text-white">Buscar usuarios:</label>
          <input
            type="text"
            id="search"
            placeholder="Ingresa nombre o correo"
            value={searchTerm} // Vinculamos el estado de búsqueda al input
            onChange={(e) => setSearchTerm(e.target.value)} // Actualizamos el estado de búsqueda
            className="bg-gray-700 rounded-lg p-2 outline-none text-white"
          />
        </div>
        <button
          className={`bg-gray-700 rounded-lg p-2 w-min ${!searchTerm ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={!searchTerm}
        >
          Buscar
        </button>
        <Link to="/users/create" className="bg-green-700 text-white rounded-lg p-2 w-min">
          Crear
        </Link>
      </div>

      {/* Mensaje si no se encuentran resultados, pero no afecta el diseño */}
      {filteredUsers.length === 0 && (
        <div className="text-white mb-6">
          No se encontraron resultados
        </div>
      )}

      {/* Lista de usuarios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {filteredUsers.map((user) => (
          <div key={user.id} className="col-span-1 flex justify-between items-center bg-gray-700 rounded-lg p-4">
            <div className="">
                <h2 className="text-white text-xl">Nombre: {user.name}</h2>
                <p className="text-white">Correo: {user.email}</p>
            </div>
            <div className="flex gap-3 ">
                <Link to={`/users/${user.id}`} className='bg-yellow-600 text-white rounded-lg p-2 w-min'>Editar</Link>
                <button 
                  className='bg-red-700 text-white rounded-lg p-2 w-min' 
                  onClick={() => deleteUser(user.id)}
                >
                  Eliminar
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
