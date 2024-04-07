import React from "react";

const OneTaskList = ({task}) => {
  return (
    <div>
      <div>
        <h2>Task Details</h2>
        <div>
          <p>
            <strong>Title:</strong> {task.title}
          </p>
          <p>
            <strong>Description:</strong> {task.body}
          </p>
          {/* Другие поля задачи */}
        </div>
      </div>
    </div>
  );
};

export default OneTaskList;
