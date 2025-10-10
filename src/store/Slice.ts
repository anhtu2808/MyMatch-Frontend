import { createSlice  } from "@reduxjs/toolkit";

interface UserState {
  id: number | null;
  name: string | null;
  email: string | null;
  studentCode: string | null,
  role: string | null,
  token: null,
  campusId: number | null,
  studentId: number | null ,
  isLoaded: boolean;   // ✅ thêm cờ
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  studentCode: null,
  role: null,
  token: null,
  campusId: null,
  studentId: null,
  isLoaded: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, name, email, role, token, campus, studentCode, studentId } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.studentCode = studentCode;
      state.role = role;
      state.token = token;
      state.campusId = campus;
      state.studentId = studentId;
      state.isLoaded = true;   // ✅ thêm dòng này
    },
    setLoaded: (state) => {
      state.isLoaded = true; // ✅ dùng khi API fail
    }
  },
});

export const { setUser, setLoaded } = userSlice.actions;
export default userSlice.reducer;
