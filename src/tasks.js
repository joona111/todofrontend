import { useEffect, useState } from "react";
import Axios from "axios";
import Category from "./Category";

const Tasks = ({ selectedTask }) => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [currentCategory, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  let filtered = todos.filter((x) => x.selectedTask === selectedTask);

  let filteredCategories = categories.map((x) => {
    if (x.task === selectedTask) {
      return x.name;
    }
  });
  async function update() {
    let response = await Axios.get(
      "https://todo-backendjoona.herokuapp.com/api/get"
    );
    let categoryResponse = await Axios.get(
      "https://todo-backendjoona.herokuapp.com/api/getcategories"
    );

    setCategories(categoryResponse.data);
    console.log(categories);
    setTodos(response.data);
  }

  useEffect(() => {
    update();
  }, []);
  async function handleCompleted(id, completed) {
    let bool = true;
    if (completed === true) {
      bool = false;
    } else {
      bool = true;
    }

    await Axios.put(
      `https://todo-backendjoona.herokuapp.com/api/update/${id}`,
      {
        completed: bool,
      }
    );

    update();
  }

  async function handleDelete(id) {
    await Axios.delete(
      `https://todo-backendjoona.herokuapp.com/api/deletetodo/${id}`
    );

    update();
  }
  async function handleAdd(event) {
    event.preventDefault();

    await Axios.post("https://todo-backendjoona.herokuapp.com/api/newtodo", {
      name: task,
      selectedTask: selectedTask,
      category: currentCategory,
    });
    update();

    setTask("");
  }
  const handleChange = (event) => {
    event.preventDefault();
    setTask(event.target.value);

    setCategory(event.target.id);
    update();
  };

  const addCategory = (event) => {
    event.preventDefault();

    Axios.post("https://todo-backendjoona.herokuapp.com/api/newcategory", {
      name: currentCategory,
      task: selectedTask,
    });
    update();
  };
  const handleCategory = (event) => {
    event.preventDefault();

    setCategory(event.target.value);
  };

  return (
    <div>
      <form className="flex justify-start">
        <input
          className="border border-black"
          value={currentCategory}
          onChange={handleCategory}
        ></input>
        <p className=" font-bold m-2">{selectedTask} </p>
        <button onClick={addCategory}> add category</button>
      </form>

      <div className="flex">
        {filteredCategories.map((category) => {
          if (category === undefined) return <></>;
          return (
            <div>
              <Category
                filtered={filtered.filter((x) => x.category === category)}
                handleCompleted={handleCompleted}
                handleDelete={handleDelete}
                handleChange={handleChange}
                task={task}
                handleAdd={handleAdd}
                category={category}
              ></Category>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;
