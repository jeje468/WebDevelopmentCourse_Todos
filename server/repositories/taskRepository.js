import postgres from "postgres";

const sql = postgres();

const create = async (todoId, task) => {
  const result = await sql`
    INSERT INTO todo_tasks (todo_id, description, is_done)
    VALUES (${todoId}, ${task.description}, ${task.is_done})
    RETURNING *`;

  return result[0];
};

const deleteById = async (id) => {
  const result = await sql`
    DELETE FROM todo_tasks
    WHERE id = ${id}
    RETURNING *`;

  return result[0];
};

const findAll = async (todoId) => {
  if (typeof todoId !== "undefined" && todoId !== null) {
    return await sql`
      SELECT * FROM todo_tasks
      WHERE todo_id = ${todoId}
    `;
  }

  // return all tasks when no todoId provided (admin use)
  return await sql`
    SELECT * FROM todo_tasks
    ORDER BY id
  `;
};

const findById = async (id) => {
  const result = await sql`
    SELECT * FROM todo_tasks
    WHERE id = ${id}`;

  return result[0];
};

const updateById = async (id, task) => {
  const result = await sql`
    UPDATE todo_tasks
    SET
      description = ${task.description},
      is_done = ${task.is_done}
    WHERE id = ${id}
    RETURNING *`;

  return result[0];
};

export { create, deleteById, findAll, findById, updateById };