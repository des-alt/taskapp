import React, { useCallback, useEffect, useState } from "react";

import "./AllTasksList.css";
import Modal from "./Modal/Modal";

function AllTasksList() {
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [close, setClose] = useState(false);

  const deleteTask = useCallback((id) => {
    console.log(`Лог deleteTask: ${id}`);
  }, []);

  const editTask = useCallback((id) => {
    console.log(`Лог editTask: ${id}`);
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
      <section className="control">
        <h3>All Tasks</h3>
        <section>
          <button>All Tasks</button>
          <button>Search by Title</button>
          <button
            onClick={() => {
              setModal(true);
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
      ></Modal>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h5>{task.title}</h5>
            <span>{task.tags}</span>
            <span>{task.body}</span>
            <section>
              <button onClick={() => editTask(task._id)}>Edit</button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </section>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default AllTasksList;
