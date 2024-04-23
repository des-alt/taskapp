import React, { useCallback, useEffect, useState } from "react";

import "./AllTasksList.css";
import Modal from "../Modal/Modal";

function AllTasksList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState([]);
  const [modal, setModal] = useState(false);
  const [method, setMethod] = useState(null);
  const [edit, setEdit] = useState(false);

  const deleteTask = useCallback((id) => {
    fetch("/api/tasks/" + id, {
      method: "DELETE",
    }).then(() => console.log(`Deleted task: ${id}`));
  }, []);

  const editTask = useCallback((soloTask) => {
    console.log(`Лог editTask: ${soloTask}`);
    setModal(true);

    setEdit(true);
    setMethod("PUT");
    setTask(soloTask);
  }, []);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((res) => {
        const tasksArray = Object.values(res);
        setTasks(tasksArray);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <section className='control'>
        <h3>All Tasks</h3>
        <section>
          <button>All Tasks</button>
          <button>Search by Title</button>
          <button
            onClick={() => {
              setModal(true);
              setMethod("POST");
            }}
          >
            Add Task
          </button>
        </section>
      </section>
      <Modal
        isOpen={modal}
        onClose={() => {
          setModal(false);
        }}
        Method={method}
        isEdit={edit}
        Task={task}
      ></Modal>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h5>{task.title}</h5>
            <span>{task.tags}</span>
            <span>{task.body}</span>
            <section>
              <button onClick={() => editTask(task)}>Edit</button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </section>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default AllTasksList;
