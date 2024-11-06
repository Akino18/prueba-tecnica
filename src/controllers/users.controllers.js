import { pool } from '../db.js';

  export const getUsers = async (req, res) => {
  
      const { id } = req.params;
      const {rows} =await pool.query('SELECT * FROM user_management');
  
  
      res.json(rows)
  };

  export const getUser = async(req, res) => {

    const { id } = req.params;
    const {rows} =await pool.query('SELECT * FROM user_management WHERE id = $1', [id]);
  
    if(rows.length === 0){
      return res.status(404).json({message: "Usuario no encontrado"});
    }
  
    res.json(rows[0])
  }

  export const createUser =async (req, res)  => {

    try {
        const data = req.body;
        console.log(data);
        const {rows} = await pool.query('INSERT INTO user_management (name, email) VALUES ($1, $2) RETURNING *', [data.name, data.email]);

        return res.json(rows[0]);
    } catch (error) {
        console.log(error);

        if (error.code === '23505') {
            return res.status(409).json({message: "El email ya existe",code: error.code});
        }

        return res.status(500).json({message: "Error al crear usuario"});
    }

    
   
}

export const updatedUser =  async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    console.log(data);
    if (!data.name || !data.email) {
      return res.status(400).json({ message: "El nombre y el correo son requeridos" });
    }
    try {
      const { rows } = await pool.query('UPDATE user_management SET name = $1, email = $2 WHERE id = $3 RETURNING *', [data.name, data.email, id]);
      if (rows.length === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.status(200).send(rows[0]);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const { rows, rowCount } = await pool.query('DELETE FROM user_management WHERE id = $1 RETURNING *', [id]);
    if (rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
  
}
  