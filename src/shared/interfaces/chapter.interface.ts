import { ChaptersEnum } from '../types/chapters.enum.ts';
import { StatusTask } from '../types/statusTask.enum.ts';


export interface IChapter {
  type: ChaptersEnum;

  status: StatusTask;
}