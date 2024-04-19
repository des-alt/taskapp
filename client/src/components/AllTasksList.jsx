import React from "react";

import "./AllTasksList.css";

function AllTasksList({ tasks, onEdit, onDelete, onView }) {
  return (
    <div>
      <section className="control">
        <h>All Tasks</h>
        <input type="search" name="" id="" />
      </section>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h5>{task.title}</h5>
            <span>{task.body}</span>
            <section>
              <button onClick={() => onEdit(task.id)}>Edit</button>
              <button onClick={() => onDelete(task.id)}>Delete</button>
            </section>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default AllTasksList;
