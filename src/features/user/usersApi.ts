import axios from 'axios';
import { ChaptersEnum } from '../../shared/types/chapters.enum.ts';
import { TitleEnum } from '../../shared/types/titles.enum.ts';
import { IUser } from '../../shared/interfaces/user.interface.ts';

// Налаштування базового URL (залежить від вашого бекенду)
const instance = axios.create({
  baseURL: 'https://personal-site.my/api', // або ваш домен
});

// Типи DTO
interface CompleteTaskDto {
  chapter: ChaptersEnum; // або ChaptersEnum
}

interface BuyTitleDto {
  title: TitleEnum; // або TitleEnum
}

interface GetTitleDto {
  title: TitleEnum; // або TitleEnum
}

export async function getUserData(chatId: number): Promise<IUser> {
  const res = await instance.get<IUser>(`/users/${chatId}`);
  return res.data;
}

export async function completeTask(chatId: number, dto: CompleteTaskDto): Promise<IUser> {
  const res = await instance.post<IUser>(`/users/complete/${chatId}`, dto);
  return res.data;
}

export async function buyTitle(chatId: number, dto: BuyTitleDto): Promise<IUser> {
  const res = await instance.post<IUser>(`/users/buy-title/${chatId}`, dto);
  return res.data;
}

export async function getTitle(chatId: number, dto: GetTitleDto): Promise<IUser> {
  const res = await instance.post<IUser>(`/users/get-title/${chatId}`, dto);
  return res.data;
}