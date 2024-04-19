import "./App.css";
import { useEffect, useState } from "react";
import AllTasksList from "./components/AllTasksList";
import OneTaskList from "./components/OneTaskList";
import Header from "./components/Header";

function App() {
  const [state, setState] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((res) => {
        const tasksArray = Object.values(res);
        setState(tasksArray);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />

      <main className="App">
        <div>
          {selectedTask ? (
            <OneTaskList task={selectedTask} />
          ) : (
            <AllTasksList tasks={state} />
          )}
        </div>
      </main>
    </>
  );
}

export default App;
