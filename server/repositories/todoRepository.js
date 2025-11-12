import postgres from "postgres";

const sql = postgres();

const create = async (userId, todo) => {
  const result = await sql`INSERT INTO todos (user_id, name, created_at)
    VALUES (${userId}, ${todo.name}, NOW())
    RETURNING *`;

  return result[0];
};

const deleteById = async (id, userId) => {
  const result = await sql`DELETE FROM todos
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING *`;

  return result[0];
};

const findAll = async (userId) => {
  if (typeof userId !== "undefined" && userId !== null) {
    return await sql`
      SELECT * FROM todos
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;
  }

  // return all todos when no userId provided (admin use)
  return await sql`
    SELECT * FROM todos
    ORDER BY created_at DESC
  `;
};

const findById = async (id, userId) => {
  const result = await sql`SELECT * FROM todos
    WHERE id = ${id} AND user_id = ${userId}`;

  return result[0];
};

const updateById = async (id, todo, userId) => {
  const result = await sql`UPDATE todos
    SET name = ${todo.name}, created_at = ${todo.created_at}
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING *`;

  return result[0];
};

export { create, deleteById, findAll, findById, updateById };