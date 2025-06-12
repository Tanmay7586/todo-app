export const getTasks = async (token) => {
  const res = await fetch('/api/todos', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const createTask = async (task, token) => {
  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(task)
  });
  return res.json();
};

export const updateTask = async (id, updates, token) => {
  const res = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updates)
  });
  return res.json();
};

export const deleteTask = async (id, token) => {
  const res = await fetch(`/api/todos/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};