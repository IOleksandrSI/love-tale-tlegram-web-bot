import { TitleEnum } from '../types/titles.enum.ts';
import { IChapter } from './chapter.interface.ts';
import { ChaptersEnum } from '../types/chapters.enum.ts';


export interface IUser {
  id: number;

  firstName?: string | null;

  userName: string;

  coins: number;

  titles: TitleEnum[];

  chapters: IChapter[];

  availableChapters: ChaptersEnum[];
}