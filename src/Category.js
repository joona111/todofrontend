const Category = ({
  filtered,
  handleCompleted,
  handleDelete,
  handleChange,
  task,
  handleAdd,
  category,
}) => {
  return (
    <div className="m-5 p-5 border-custom1 border-2 rounded-md bg-custom2">
      {category}

      <form>
        <input
          id={category}
          onChange={handleChange}
          value={task}
          className=" border-2 rounded-md border-black"
        />
        <button
          onClick={handleAdd}
          className="border-2 border-black rounded-md hover:bg-gray-200"
        >
          {" "}
          add task
        </button>
      </form>

      {filtered.map((x) => {
        let styleButton = ` border border-black rounded-sm  shadow-lg p-2   ${
          x.completed === false
            ? "bg-red-400 hover:bg-red-500"
            : "bg-green-400 hover:bg-green-500"
        }`;
        let style = `border border-black rounded-sm  shadow-lg p-2   ${
          x.completed === false
            ? "bg-red-400 hover:bg-red-500"
            : "bg-green-400 hover:bg-green-500"
        }`;
        return (
          <div key={x.id} className="p-2 flex">
            <p className={style}>
              {x.name + " " + x.completed + " " + x.category}
            </p>
            <p
              onClick={() => handleCompleted(x._id, x.completed)}
              className={style}
            >
              {" "}
              &#10003;
            </p>
            <button className={styleButton} onClick={() => handleDelete(x._id)}>
              X
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Category;
