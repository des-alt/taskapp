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
    <div className="App">
      <div>
        <Header />
        {selectedTask ? (
          <OneTaskList task={selectedTask} />
        ) : (
          <AllTasksList tasks={state} />
        )}
      </div>

      {/* <div>
        {state.map((item) => (
          <ul className="ul" key={item.title}>
            <AllTasksList key={item.title} {...item} />
            
          </ul>
        ))}
      </div> */}
    </div>
  );
}

export default App;
