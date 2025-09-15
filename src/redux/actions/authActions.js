import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch comments from API and add alias dynamically
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/comments");
      const data = await res.json();
      // Add alias (first word of name in uppercase)
      const dataWithAlias = data.map((c) => ({
        ...c,
        alias: c.name.split(" ")[0].toUpperCase(),
      }));
      return dataWithAlias.slice(0, 1000); // limit to 1000
    } catch (error) {
      return rejectWithValue("Failed to fetch comments");
    }
  }
);
