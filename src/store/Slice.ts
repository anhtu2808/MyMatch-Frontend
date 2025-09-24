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
    },
    // clearUser: (state) => {
    //   state.id = 0 || null;
    //   state.name = "";
    //   state.email = "";
    //   state.role = "";
    //   state.token = null;
    // },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
