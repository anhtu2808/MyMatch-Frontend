import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
import { getProfileAPI } from "../features/profile/apis";

interface UserState {
  id: number | null;
  name: string | null;
  email: string | null;
  studentCode: string | null,
  role: string | null,
  token: null,
  campusId: number | null,
  studentId: number | null ,
  wallet: number | null,
  isLoaded: boolean; 
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
  wallet: null,
  isLoaded: false
};

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async () => {
    const response = await getProfileAPI();
    return response.result; // Dữ liệu này sẽ là "action.payload"
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, name, email, role, token, campus, studentCode, studentId, wallet } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.studentCode = studentCode;
      state.role = role;
      state.token = token;
      state.campusId = campus;
      state.studentId = studentId;
      state.wallet = wallet;
      state.isLoaded = true;  
    },
    setLoaded: (state) => {
      state.isLoaded = true; 
    },
  },
  // 3. THÊM EXTRA REDUCERS ĐỂ XỬ LÝ THUNK
  extraReducers: (builder) => {
    // Khi fetchUserProfile chạy thành công:
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      // action.payload chính là "response.result" từ Thunk
      const payload = {
        id: action.payload?.id,
        studentId: action.payload?.student?.id,
        email: action.payload?.email,
        name: action.payload?.username,
        campus: action.payload?.student?.campus?.id,
        studentCode: action.payload?.student?.studentCode,
        role: action.payload?.role,
        token: action.payload?.token,
        wallet: action.payload?.wallet?.coin // Cập nhật wallet (coin)
      };
      // Tái sử dụng reducer 'setUser' của bạn để cập nhật state
      userSlice.caseReducers.setUser(state, { payload, type: "user/setUser" });
    });
    // Xử lý khi Thunk thất bại (để app không bị treo)
    builder.addCase(fetchUserProfile.rejected, (state) => {
        state.isLoaded = true;
    });
     // Xử lý khi Thunk đang chạy (để app không bị treo)
     builder.addCase(fetchUserProfile.pending, (state) => {
      // Bạn có thể thêm state.loading = true ở đây nếu muốn
  });
  },
});

export const { setUser, setLoaded } = userSlice.actions;
export default userSlice.reducer;
