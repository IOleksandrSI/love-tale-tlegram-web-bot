import { TitleTypeEnum } from '../types/titleType.enum.ts';
import { TitleEnum } from '../types/titles.enum.ts';
import { IconType } from 'react-icons';

export interface ITitleConfig {
  name: string;
  type: TitleTypeEnum;
  description: string;
  same: TitleEnum,
  icon: IconType;
  cost?: number;
  iconColor: string;
  backgroundColor: string;
}