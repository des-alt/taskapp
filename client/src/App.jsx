import "./App.css";
import { useState } from "react";
import AllTasksList from "./components/AllTasksList/AllTasksList";
import OneTaskList from "./components/OneTaskList";
import Header from "./components/Header/Header";

function App() {
  const [selectedTask, setSelectedTask] = useState(null);

  

  return (
    <>
      <Header />

      <main className="App">
        <div>
          {selectedTask ? (
            <OneTaskList task={selectedTask} />
          ) : (
            <AllTasksList  />
          )}
        </div>
      </main>
    </>
  );
}

export default App;
