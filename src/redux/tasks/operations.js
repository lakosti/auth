import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.baseURL = "https://goit-task-manager.herokuapp.com/";
axios.defaults.baseURL = "https://66200f043bf790e070aee15f.mockapi.io/";
// GET @ /tasks
export const fetchTasks = createAsyncThunk("tasks/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/tasks");
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// POST @ /tasks
export const addTask = createAsyncThunk("tasks/addTask", async (text, thunkAPI) => {
  try {
    const response = await axios.post("/tasks", { text });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

// DELETE @ /tasks/:id
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (taskId, thunkAPI) => {
  try {
    const response = await axios.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
