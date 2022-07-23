import Task from "./Task";
import { Route, Routes } from "react-router-dom";
const AddRoute = ({ tasks }) => {
  let arr = [];
  return (
    <Routes>
      {
        (arr = tasks.map((task) => {
          return (
            <Route
              key={task}
              path={`/${task.name}`}
              element={<Task name={task.name} />}
            ></Route>
          );
        }))
      }
    </Routes>
  );
};

export default AddRoute;
