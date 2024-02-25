import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo } from "../Store/Slices/TodoSlice";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { MdEdit, MdDeleteForever } from "react-icons/md";
const Todo = () => {
  const btnRef = useRef(null);
  const inpRef = useRef(null);
  const todos = useSelector((state) => state.todos.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && document.activeElement === inpRef.current) {
        btnRef.current.click();
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);
  const [todo, settodo] = useState({
    id: uuidv4(),

    dets: "",
  });

  const delTodo = (val) => {
    dispatch(deleteTodo(val));
    toast("❌ Todo Is Deleted");
  };
  const edit = (e) => {
    settodo({ ...todo, dets: e.dets });

    dispatch(deleteTodo(e.id));
  };
  const add = () => {
    if (todo.dets.length < 3) {
      toast.error("Todo should be at least 3 characters long");
    } else if (todos.some((item) => item.dets === todo.dets)) {
      toast.error("Todo Already Existed");
    } else {
      dispatch(addTodo(todo));
      toast.success("New Todo Add");
      settodo({ id: uuidv4(), dets: "" });
    }
  };

  const [checkedTodos, setCheckedTodos] = useState(() => {
    const storedCheckedTodos = localStorage.getItem("checkedTodos");
    return storedCheckedTodos ? JSON.parse(storedCheckedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("checkedTodos", JSON.stringify(checkedTodos));
  }, [checkedTodos]);

  const handleCheckboxChange = (e) => {
    setCheckedTodos((prev) =>
      prev.some((item) => item.id === e.id)
        ? prev.filter((item) => item.id !== e.id)
        : [...prev, e]
    );
  };
  return (
    <div className="bg-[#111] text-white ">
      <h1 className="text-center text-4xl font-semibold py-6">📝 TODO LIST</h1>
      <div className="">
        <div className="border border-1 border-[#242424] rounded-lg sm:flex-col m-3 p-4 items-center justify-center flex">
          <input
            ref={inpRef}
            placeholder="Add Todo"
            required
            className="w-[500px]  rounded-2xl py-3 sm:w-auto px-4 bg-transparent border-2 border-gray-700 focus:border-[#fa0060] focus:outline-none"
            value={todo.dets}
            onChange={(e) => settodo({ ...todo, dets: e.target.value })}
            type="text"
          />{" "}
          <br />
          <button
            id="add"
            ref={btnRef}
            onClick={add}
            className="border-2 border-gray-700   px-4 py-3 uppercase rounded-2xl hover:border-[#fa0060] sm:m-0  m-5"
          >
            {" "}
            add{" "}
          </button>
        </div>
        <div className="border  border-1 border-[#242424] rounded-lg m-2   my-12">
          {todos.length === 0 ? (
            <p className="text-center my-5">List Is Empty...</p>
          ) : (
            todos.map((e, i) => (
              <div
                className="border-[#242424] border rounded-lg p-2 py-4 flex  justify-between items-center m-3"
                key={i}
              >
                <p
                  className={`text-xl capitalize rwed flex items-center mr-6 break-all font-semibold ${
                    checkedTodos.some((item) => item.id === e.id)
                      ? "text-[#fa0060] line-through"
                      : ""
                  }`}
                >
                  <div className="pt-[20px]">
                    <label
                      className="checkbox-btn"
                      htmlFor={`checkbox-${e.id}`}
                    >
                      <input
                        onChange={() => handleCheckboxChange(e)}
                        checked={checkedTodos.some((item) => item.id === e.id)}
                        id={`checkbox-${e.id}`}
                        type="checkbox"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <label
                    style={{ userSelect: "none" }}
                    htmlFor={`checkbox-${e.id}`}
                    className="checkbox-label  cursor-pointer"
                  >
                    {e.dets}
                  </label>
                </p>

                <div className=" sm:flex sm:flex-col ">
                  <button
                    onClick={() => delTodo(e.id)}
                    className="border-2 border-gray-700 my-4  px-4 py-3 uppercase rounded-2xl hover:border-[#fa0060]  mx-5"
                  >
                    <MdDeleteForever />
                  </button>
                  {checkedTodos.some((item) => item.id === e.id) ? (
                    ""
                  ) : (
                    <button
                      onClick={() => edit(e)}
                      className="border-2 border-gray-700   px-4 py-3 uppercase rounded-2xl hover:border-[#fa0060]  mx-5"
                    >
                      <MdEdit />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
