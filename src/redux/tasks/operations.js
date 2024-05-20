import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.baseURL = "https://goit-task-manager.herokuapp.com/";
// axios.defaults.baseURL = "https://66200f043bf790e070aee15f.mockapi.io/";
// axios.defaults.baseURL = "https://connections-api.herokuapp.com/";
// GET @ /tasks
export const fetchTasks = createAsyncThunk("tasks/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/contacts");
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// POST @ /tasks
export const addTask = createAsyncThunk("contacts/addTask", async (text, thunkAPI) => {
  try {
    const response = await axios.post("/contacts", { text });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

// DELETE @ /tasks/:id
export const deleteTask = createAsyncThunk("contacts/deleteTask", async (taskId, thunkAPI) => {
  try {
    const response = await axios.delete(`/contacts/${taskId}`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
