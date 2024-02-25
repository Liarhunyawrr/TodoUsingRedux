import { createSlice } from "@reduxjs/toolkit";

const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

const initialState = {
  value: storedTodos,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.value.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.value));
    },
    deleteTodo: (state, action) => {
      let updatedState = state.value.filter((e) => action.payload !== e.id);

      state.value = updatedState;

      localStorage.setItem("todos", JSON.stringify(updatedState));
    },

   
  },
});
export const { addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
