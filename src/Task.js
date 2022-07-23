import Tasks from "./tasks";

const Task = ({ name }) => {
  return (
    <div className=" k pt-10 justify-center h-screen  flex bg-custom3   ">
      <Tasks selectedTask={name}></Tasks>
    </div>
  );
};
export default Task;
