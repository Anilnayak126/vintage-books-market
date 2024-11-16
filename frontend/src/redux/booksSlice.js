import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/manage_p/books/";

// Fetch all books with filters and pagination
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ page = 1, search, minPrice, maxPrice }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      if (search) params.append("search", search);
      if (minPrice) params.append("min_price", minPrice);
      if (maxPrice) params.append("max_price", maxPrice);

      const response = await axios.get(`${API_URL}?${params.toString()}`);

      console.log(response);
      

      if (!response.data.count) {
        throw new Error("Missing count in API response");
      }

      const totalPages = Math.ceil(response.data.count / 9); 
      return {
        books: response.data.results,
        totalPages,
        currentPage: page,
      };
    } catch (error) {
      console.error("Error fetching books:", error.message);
      return rejectWithValue(error.response?.data || "Failed to fetch books.");
    }
  }
);

// Create a new book
export const createBook = createAsyncThunk(
  "books/createBook",
  async (bookData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}create/`, bookData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create book.");
    }
  }
);

// Fetch book details by ID
export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch book details.");
    }
  }
);

// Fetch books specific to the authenticated user
export const fetchUserBooks = createAsyncThunk(
  "books/fetchUserBooks",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/manage_p/user/books/?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return {
        books: response.data.results,
        totalPages: Math.ceil(response.data.count / 3), 
        currentPage: page,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user books.");
    }
  }
);

// Update an existing book
export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, bookData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/manage_p/user/books/${id}/`,
        bookData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update book.");
    }
  }
);

// Delete a book
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/manage_p/user/books/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete book.");
    }
  }
);

// Books Slice
const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [], // All books
    userBooks: [], // Books created by the authenticated user
    bookDetails: null, // Details of a single book
    totalPages: 1, // Total pages for pagination
    currentPage: 1, // Current page
    isLoading: false,
    error: null,
    createStatus: "idle",
    updateStatus: "idle",
    deleteStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all books
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload.books;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create a book
      .addCase(createBook.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.books.push(action.payload);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload;
      })
      // Fetch book by ID
      .addCase(fetchBookById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookDetails = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch user books
      .addCase(fetchUserBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userBooks = action.payload.books;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchUserBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update a book
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex((book) => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      // Delete a book
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
      });
  },
});

export default booksSlice.reducer;
