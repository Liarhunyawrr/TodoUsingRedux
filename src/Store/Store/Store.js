import { configureStore } from '@reduxjs/toolkit'
import todos from "../Slices/TodoSlice"

export const store = configureStore({
    reducer: { todos: todos },
  })