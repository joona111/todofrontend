import { Link } from "react-router-dom";

import Topbar from "./Topbar";

import { useEffect, useState } from "react";
import AddRoute from "./AddRoute";
import Axios from "axios";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    update();
  }, []);
  async function update() {
    let response = await Axios.get(
      "https://todo-backendjoona.herokuapp.com/api/gettasks"
    );

    setTasks(response.data);
  }

  async function deleteTask(id) {
    await axios.delete(
      `https://todo-backendjoona.herokuapp.com/api/deletetask/${id}`
    );
    update();
  }
  async function addTask(event) {
    event.preventDefault();
    await Axios.post(
      "https://todo-backendjoona.herokuapp.com/api/inserttasks",
      {
        name: task,
      }
    );
    update();
    setTask("");
  }
  const handleChange = (event) => {
    event.preventDefault();
    setTask(event.target.value);
  };
  return (
    <div className=" ">
      <Topbar></Topbar>

      <div className="pt-5 p-5 fixed top-30 left-0 h-screen flex-colshadow-md bg-custom2 rounded-md shadow-lg ">
        {tasks.map((task) => {
          return (
            <div key={task.name} className=" flex ">
              <Link to={task.name}>
                <nav className="  flex  border-2 justify-between ml-0 rounded-md shadow-md w-full border-gray-400 m-2 p-2 hover:bg-gray-200">
                  {task.name}
                </nav>
              </Link>
              <button
                onClick={() => deleteTask(task._id)}
                className="flex border-2 justify-between ml-0 rounded-md shadow-md  border-gray-400 m-2 p-2 hover:bg-gray-200 "
              >
                {" "}
                X
              </button>
            </div>
          );
        })}
        <form>
          <input
            onChange={handleChange}
            value={task}
            className=" border-2 rounded-md border-black"
          />
          <button
            onClick={addTask}
            className=" rounded-md hover:bg-gray-200 shadow-md"
          >
            {" "}
            add task
          </button>
        </form>
      </div>

      <AddRoute tasks={tasks}></AddRoute>
    </div>
  );
}

export default App;
