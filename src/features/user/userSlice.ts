import { TitleEnum } from '../../shared/types/titles.enum.ts';
import { IChapter } from '../../shared/interfaces/chapter.interface.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../shared/interfaces/user.interface.ts';
import { buyTitle, completeTask, getTitle, getUserData } from './usersApi.ts';
import { ChaptersEnum } from '../../shared/types/chapters.enum.ts';

export interface IUserState {
  id: number | null;
  firstName: string | null;
  userName: string;
  coins: number;
  titles: TitleEnum[];
  chapters: IChapter[];
  availableChapters: ChaptersEnum[];
  loading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  id: null,
  firstName: null,
  userName: '',
  coins: 0,
  titles: [],
  chapters: [],
  availableChapters: [],
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk('user/fetchUser',
  async (chatId: number) => {
    return getUserData(chatId);
  });

export const doCompleteTask = createAsyncThunk('user/completeTask',
  async ({
           chatId,
           chapter,
         }: { chatId: number; chapter: ChaptersEnum }) => {
    return completeTask(chatId, { chapter });
  });

export const doBuyTitle = createAsyncThunk('user/buyTitle',
  async ({
           chatId,
           title,
         }: { chatId: number; title: TitleEnum }) => {
    return buyTitle(chatId, { title });
  });

export const doGetTitle = createAsyncThunk('user/getTitle',
  async ({
           chatId,
           title,
         }: { chatId: number; title: TitleEnum }) => {
    return getTitle(chatId, { title });
  });

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Звичайні (синхронні) ред'юсери
  },
  extraReducers: (builder) => {
    // fetchUser
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.id = action.payload.id;
      state.firstName = action.payload.firstName || null;
      state.userName = action.payload.userName;
      state.coins = action.payload.coins;
      state.titles = action.payload.titles;
      state.chapters = action.payload.chapters;
      state.availableChapters = action.payload.availableChapters;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Помилка завантаження користувача';
    });

    // completeTask
    builder.addCase(doCompleteTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(doCompleteTask.fulfilled, (state, action) => {
      state.loading = false;
      state.id = action.payload.id;
      state.firstName = action.payload.firstName || null;
      state.userName = action.payload.userName;
      state.coins = action.payload.coins;
      state.titles = action.payload.titles;
      state.chapters = action.payload.chapters;
      state.availableChapters = action.payload.availableChapters;
    });
    builder.addCase(doCompleteTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Помилка completeTask';
    });

    // buyTitle
    builder.addCase(doBuyTitle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(doBuyTitle.fulfilled, (state, action: { payload: IUser }) => {
      state.loading = false;
      state.id = action.payload.id;
      state.firstName = action.payload.firstName || null;
      state.userName = action.payload.userName;
      state.coins = action.payload.coins;
      state.titles = action.payload.titles;
      state.chapters = action.payload.chapters;
      state.availableChapters = action.payload.availableChapters;
    });
    builder.addCase(doBuyTitle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Помилка buyTitle';
    });

    // getTitle
    builder.addCase(doGetTitle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(doGetTitle.fulfilled, (state, action: { payload: IUser }) => {
      state.loading = false;
      state.id = action.payload.id;
      state.firstName = action.payload.firstName || null;
      state.userName = action.payload.userName;
      state.coins = action.payload.coins;
      state.titles = action.payload.titles;
      state.chapters = action.payload.chapters;
      state.availableChapters = action.payload.availableChapters;
    });
    builder.addCase(doGetTitle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Помилка getTitle';
    });
  },
});

export const userReducer = userSlice.reducer;