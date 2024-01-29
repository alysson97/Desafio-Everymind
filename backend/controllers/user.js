import { db } from "../db.js";

export const getUsers = (_, res) => {
  const selectQuery = "SELECT * FROM usuarios";

  db.query(selectQuery, (err, data) => {
    if(err) return res.json(err); 
    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const insertQuery = "INSERT INTO `usuarios` (`id`, `nome`, `codigo`, `descricao`, `preco`) VALUES (NULL, ?, ?, ?, ?)";

  const values = [
    req.body.nome,
    req.body.codigo,
    req.body.descricao,
    req.body.preco,
  ];
  db.query(insertQuery, values, (err) =>{
    if(err){
      console.log("erro na query")
      return res.json(err);}

    console.log("usuario adcionado")
    return res.status(200).json("Usuario criado com sucesso");
  });
};

export const updateUser = (req, res) => {
  const updateQuery = "UPDATE `usuarios` SET `nome` = ?, `codigo` = ?, `descricao` = ?, `preco` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.codigo,
    req.body.descricao,
    req.body.preco,
  ];
  db.query(updateQuery, [...values, req.params.id], (err) =>{
    if(err) return res.json(err);

    return res.status(200).json("Usuario atualizado com sucesso");
  });
};

export const deleteUser = (req, res) => {
  const deleteQuery = "delete FROM `usuarios` WHERE `id` = ?";

  db.query(deleteQuery, [ req.params.id], (err) =>{
    if(err) return res.json(err);

    return res.status(200).json("Usuario deletado com sucesso");
  });
};