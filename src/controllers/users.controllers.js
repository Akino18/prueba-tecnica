import { pool } from '../db.js';

  export const getUsers = async (req, res) => {
  
      const { id } = req.params;
      const {rows} =await pool.query('SELECT * FROM users');
  
  
      res.json(rows)
  };

  export const getUser = async(req, res) => {

    const { id } = req.params;
    const {rows} =await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  
    if(rows.length === 0){
      return res.status(404).json({message: "Usuario no encontrado"});
    }
  
    res.json(rows[0])
  }

  export const createUser =async (req, res)  => {

    try {
        const data = req.body;

        const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [data.name, data.email, data.password]);

        return res.json(result);
    } catch (error) {
        console.log(error);

        if (error.code === '23505') {
            return res.status(409).json({message: "El email ya existe"});
        }
        return res.status(500).json({message: "Error al crear usuario"});
    }

    
   
}

export const updatedUser =  async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    console.log("estos son los datos que se envian");
    console.log(data);
    const {rows} = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [data.name, data.email, id]);
    res.send(rows[0]);
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const {rows,rowCount} =await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    
    if(rowCount === 0){
      return res.status(404).json({message: "Usuario no encontrado"});
    }

    return res.sendStatus(204);
  
}
  