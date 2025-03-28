import {
  AttendanceFormState,
  AttendancePayload,
  AttendanceState,
} from "@/types/attandance";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: AttendanceState = {
  employees: [],
  attendanceRecords: [],
  attendanceState: {
    selectedEmployee: null,
    showModal: false,
    date: "",
    checkIn: "",
    checkOut: "",
    breakTime: "",
    manualWorkingHours: "",
    status: "",
    loading: false,
  },
  loading: false,
  error: null,
};

export const fetchEmployees = createAsyncThunk(
  "attendance/fetchEmployees",
  async () => {
    const response = await axios.get("/api/employee");
    return response.data;
  }
);

export const submitAttendance = createAsyncThunk(
  "attendance/submitAttendance",
  async (payload: AttendancePayload) => {
    const response = await axios.post("/api/attendance", payload);
    return response.data;
  }
);
export const fetchAttendance = createAsyncThunk(
  "attendance/fetchAttendance",
  async () => {
    const response = await axios.get("/api/attendance");
    return response.data;
  }
);
export const fetchAttendanceById = createAsyncThunk(
  "attendance/fetchAttendanceById",
  async (employeeId: string) => {
    const response = await axios.get(`/api/attendance`, {
      params: { employeeId },
    });
    return response.data.filter(
      (record: { employeeId: string }) => record.employeeId === employeeId
    );
  }
);
const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setAttendanceState: (
      state,
      action: PayloadAction<Partial<AttendanceFormState>>
    ) => {
      state.attendanceState = { ...state.attendanceState, ...action.payload };
    },
    resetAttendanceState: (state) => {
      state.attendanceState = initialState.attendanceState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      })

      .addCase(submitAttendance.pending, (state) => {
        state.attendanceState.loading = true;
      })
      .addCase(submitAttendance.fulfilled, (state) => {
        state.attendanceState.loading = false;
        state.attendanceState = initialState.attendanceState;
      })
      .addCase(submitAttendance.rejected, (state, action) => {
        state.attendanceState.loading = false;
        state.error = action.error.message ?? "Failed to submit attendance";
      })

      .addCase(fetchAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecords = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Failed to fetch attendance records";
      })

      .addCase(fetchAttendanceById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAttendanceById.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecords = action.payload;
      })
      .addCase(fetchAttendanceById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Failed to fetch attendance records";
      });
  },
});

export const { setAttendanceState, resetAttendanceState } =
  attendanceSlice.actions;
export default attendanceSlice.reducer;
