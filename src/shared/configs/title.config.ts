import { TitleTypeEnum } from '../types/titleType.enum.ts';
import { TitleEnum } from '../types/titles.enum.ts';
import { FaBookOpen, FaChessKnight, FaCrown, FaHatWizard, FaHeart, FaHeartbeat, FaLightbulb, FaMagic, FaPhoenixFramework, FaRegQuestionCircle, FaShieldAlt } from 'react-icons/fa';
import { IoImages } from 'react-icons/io5';
import { PiCloudMoonFill } from 'react-icons/pi';
import { MdAltRoute, MdSunny } from 'react-icons/md';
import { GiBigDiamondRing, GiPuzzle, GiSeedling } from 'react-icons/gi';
import { SiRedragon } from 'react-icons/si';
import { ITitleConfig } from '../interfaces/titleConfig.interface.ts';

export const TitleConfig: { [key in TitleEnum]: ITitleConfig } = {
  [TitleEnum.CHESS_KNIGHT]: {
    name: 'Рицар Шахів',
    type: TitleTypeEnum.GAME,
    description: 'Той, хто сміливо робить хід, думаючи на кілька кроків уперед.',
    same: TitleEnum.CHESS_KNIGHT,
    icon: FaChessKnight,
    iconColor: '#333333',
    backgroundColor: '#FFFFFF',
  },

  [TitleEnum.QUEST_PRINCESS]: {
    name: 'Принцеса Квесту',
    type: TitleTypeEnum.GAME,
    description: 'Володарка пригод, що уміє розгадувати найзаплутаніші загадки.',
    icon: FaRegQuestionCircle,
    same: TitleEnum.QUEST_PRINCESS,
    iconColor: '#D676D9',
    backgroundColor: '#FFE3F3',
  },

  [TitleEnum.PUZZLE_MASTER]: {
    name: 'Пазл-Майстер',
    type: TitleTypeEnum.GAME,
    description: 'Геній деталізації, що вміє скласти навіть найскладніший пазл.',
    icon: GiPuzzle,
    same: TitleEnum.PUZZLE_MASTER,
    iconColor: '#3978E3',
    backgroundColor: 'linear-gradient(120deg,  0%, #E0F9B5 50%, #FFDAC1 100%)',
  },

  [TitleEnum.WAY_LORD]: {
    name: 'Володар Шляху',
    type: TitleTypeEnum.GAME,
    description: 'Мандрівник, що завжди знайде правильний маршрут.',
    icon: MdAltRoute,
    same: TitleEnum.WAY_LORD,
    iconColor: '#006B5D',
    backgroundColor: '#C3E5E0',
  },

  [TitleEnum.MAGICIAN]: {
    name: 'Маг Чудес',
    type: TitleTypeEnum.GAME,
    description: 'Таємничий володар заклять, здатний віднайти магію в буденному світі.',
    icon: FaMagic,
    same: TitleEnum.MAGICIAN,
    iconColor: '#8F38FF',
    backgroundColor: '#E7DDFA',
  },

  [TitleEnum.GARDEN_KEEPER]: {
    name: 'Садівник Долі',
    type: TitleTypeEnum.GAME,
    description: 'Той, хто плекає зерна надії й перетворює їх на квітучий сад.',
    icon: GiSeedling,
    same: TitleEnum.GARDEN_KEEPER,
    iconColor: '#228B22',
    backgroundColor: 'linear-gradient(90deg, #BAF2BB 0%, #FFFEB3 100%)',
  },

  [TitleEnum.WEDDING_PROPHET]: {
    name: 'Весільний Провидець',
    type: TitleTypeEnum.GAME,
    description: 'Той, хто бачить майбутнє щастя і не боїться зробити найважливіший крок.',
    icon: GiBigDiamondRing,
    same: TitleEnum.WEDDING_PROPHET,
    iconColor: '#F9A602',
    backgroundColor: '#FFF7E8',
  },

  // === ДОДАТКОВІ ІГРОВІ ТИТУЛИ (ЗА ОСОБЛИВІ ДОСЯГНЕННЯ) ===

  [TitleEnum.PHOENIX]: {
    name: 'Фенікс',
    type: TitleTypeEnum.GAME,
    description: 'Той, хто воскресає з попелу минулих поразок, стаючи сильнішим.',
    icon: FaPhoenixFramework,
    same: TitleEnum.PHOENIX,
    iconColor: '#FF4500',
    backgroundColor: 'linear-gradient(45deg, #FF8345 0%, #FF3C3C 100%)',
  },

  [TitleEnum.UNBROKEN]: {
    name: 'Незламний',
    type: TitleTypeEnum.GAME,
    description: 'Дух, що не підкоряється перешкодам і завжди продовжує боротьбу.',
    icon: FaShieldAlt,
    same: TitleEnum.UNBROKEN,
    iconColor: '#4B4B4B',
    backgroundColor: '#D6D6D6',
  },

  [TitleEnum.LOVE_WARRIOR]: {
    name: 'Любов-Воїн',
    type: TitleTypeEnum.GAME,
    description: 'Боєць, що не відступає перед жодним випробуванням на шляху до кохання.',
    icon: FaHeart,
    same: TitleEnum.LOVE_WARRIOR,
    iconColor: '#E8287E',
    backgroundColor: '#FFF0F6',
  },

  // === ТИТУЛИ З МАГАЗИНУ (SHOP) ===

  [TitleEnum.ROMANCE_OVERLORD]: {
    name: 'Повелителька Романтики',
    type: TitleTypeEnum.SHOP,
    cost: 80,
    description: 'Завжди випромінює шарм і надихає інших на романтичні вчинки.',
    icon: FaCrown,
    same: TitleEnum.ROMANCE_OVERLORD,
    iconColor: '#C81F68',
    backgroundColor: '#FFEAF2',
  },

  [TitleEnum.ROMANCE_MAGE]: {
    name: 'Маг Романтики',
    type: TitleTypeEnum.SHOP,
    description: 'Майстер любовних заклять, що перетворює буденність на казкову історію.',
    cost: 90,
    icon: FaHatWizard,
    same: TitleEnum.ROMANCE_MAGE,
    iconColor: '#A61FEB',
    backgroundColor: '#FFEAF2',
  },

  [TitleEnum.HEARTBEAT_OF_LOVE]: {
    name: 'Серцебиття Любові',
    type: TitleTypeEnum.SHOP,
    cost: 100,
    description: 'Її пристрасть відчувається в кожному повідомленні – ніби відлуння двох сердець.',
    icon: FaHeartbeat,
    same: TitleEnum.HEARTBEAT_OF_LOVE,
    iconColor: '#FF1E56',
    backgroundColor: '#FFF0F5',
  },

  [TitleEnum.ADVENTURE_MASTER]: {
    name: 'Володарка Пригод',
    type: TitleTypeEnum.SHOP,
    cost: 70,
    description: 'Авантюрист, що обожнює квести й ніколи не боїться пірнути в незвідане.',
    icon: SiRedragon,
    same: TitleEnum.ADVENTURE_MASTER,
    iconColor: '#1C9EB3',
    backgroundColor: '#D8F1F6',
  },

  [TitleEnum.LIGHT_HEART]: {
    name: 'Серце Світла',
    type: TitleTypeEnum.SHOP,
    cost: 50,
    description: 'Завжди несе промінчик добра й ділиться ним з оточенням.',
    icon: FaLightbulb,
    same: TitleEnum.LIGHT_HEART,
    iconColor: '#FFD700',
    backgroundColor: '#FFFBE6',
  },

  [TitleEnum.SOUL_GUARDIAN]: {
    name: 'Страж Душі',
    type: TitleTypeEnum.SHOP,
    cost: 75,
    description: 'Охоронець найцінніших почуттів, що піклується про тепло у стосунках.',
    icon: FaLightbulb,
    same: TitleEnum.SOUL_GUARDIAN,
    iconColor: '#4E78A0',
    backgroundColor: '#E7F2FB',
  },

  [TitleEnum.SUNNY_BEAM]: {
    name: 'Радісний Сонячний Промінь',
    type: TitleTypeEnum.SHOP,
    cost: 40,
    description: 'Її настрій здатен освіжити навіть найпохмуріший день.',
    icon: MdSunny,
    same: TitleEnum.SUNNY_BEAM,
    iconColor: '#FFB400',
    backgroundColor: '#FFF7D1',
  },

  [TitleEnum.DREAM_WEAVER]: {
    name: 'Повелитель Мрій',
    type: TitleTypeEnum.SHOP,
    cost: 60,
    description: 'Той, хто не соромиться мріяти й перетворює ідеї на реальність.',
    icon: PiCloudMoonFill,
    same: TitleEnum.DREAM_WEAVER,
    iconColor: '#3C5A99',
    backgroundColor: '#EDEFFD',
  },

  [TitleEnum.MEMORY_ARCHITECT]: {
    name: 'Архітектор Спогадів',
    type: TitleTypeEnum.SHOP,
    cost: 85,
    description: 'Уміє будувати найяскравіші миттєвості й зберігати їх у серці назавжди.',
    icon: IoImages,
    same: TitleEnum.MEMORY_ARCHITECT,
    iconColor: '#8B5CF6',
    backgroundColor: '#F3E8FF',
  },

  [TitleEnum.TALE_HERO]: {
    name: 'Герої  Казки',
    type: TitleTypeEnum.SHOP,
    cost: 120,
    description: 'Живуть в світі, де кожен крок – нова сторінка казкової історії кохання.',
    icon: FaBookOpen,
    same: TitleEnum.TALE_HERO,
    iconColor: '#8e36f5',
    backgroundColor: '#FFF5D8',
  },
}