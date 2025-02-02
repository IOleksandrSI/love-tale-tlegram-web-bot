import { ChaptersEnum } from '../types/chapters.enum.ts';
import { FaChessKnight, FaMagic, FaRegQuestionCircle } from 'react-icons/fa';
import { GiBigDiamondRing, GiPuzzle, GiSeedling } from 'react-icons/gi';
import { MdAltRoute } from 'react-icons/md';
import { IconType } from 'react-icons';
import { FC, lazy } from 'react';

const ChessGameWidget = lazy(() => import('../../minigames/1chessGame.widget.tsx'));
const LoveQuestChatWidget = lazy(() => import('../../minigames/2quest.widget.tsx'));
const PuzzleHeartGame = lazy(() => import('../../minigames/4way.widget.tsx'));
const WayWidget = lazy(() => import('../../minigames/4way.widget.tsx'));
const MagicWidget = lazy(() => import('../../minigames/5magic.widget.tsx'));
const GardenChanceWidget = lazy(() => import('../../minigames/6gardenChance.widget.tsx'));
const WeddingProposalWidget = lazy(() => import('../../minigames/7weddingProposition.widget.tsx'));

export const GameConfig: { [key in ChaptersEnum]: {
  type: ChaptersEnum;
  icon: IconType;
  questName: string;
  questDescription: string;
  chapterTitle: string;
  chapterDescription: string;
  chapterDate: string;
  iconColor: string;
  backgroundColor: string;
  Page: FC,
  url: string,
} } = {
  [ChaptersEnum.CHESS_GAME_1]: {
    Page: ChessGameWidget,
    url: '/game/chess-game',
    iconColor: '#333333',
    backgroundColor: '#FFFFFF',
    type: ChaptersEnum.CHESS_GAME_1,
    icon: FaChessKnight,
    questName: 'Шахова битва',
    questDescription: 'Переможи в інтелектуальному двобої, відчуваючи справжню стратегію.',
    chapterDate: '2016',
    chapterTitle: 'Глава 1',
    chapterDescription:
      'У давні часи, коли код і числа в одному королівстві вважали за найвищу магію, *кохання* вирішило обрати два серця для особливої пригоди. Одне серце, талановите в чарівному мистецтві програмування, отримало нагороду – поїхати до табору, де збиралися найобдарованіші юнаки та дівчата.\n' +
      'Саме там, *на східцях старовинної кам’яниці*, воно зустріло інше серце, що сяяло, мов ліхтар у нічній тиші. Їх поєднала фраза: “Вмієш грати в шахи?” – мов чарівне закляття, що відкрило брами дивовижного світу, де двоє тільки почали відчувати іскру потужної сили, ім’я якій *любов*.',
  },
  [ChaptersEnum.QUEST_2]: {
    Page: LoveQuestChatWidget,
    url: '/game/quest',
    iconColor: '#D676D9',
    backgroundColor: '#FFE3F3',
    type: ChaptersEnum.QUEST_2,
    questName: 'Квест-загадки',
    questDescription: 'Знайди всі підказки та розкрий приховану історію, розв’язуючи логічні загадки.',
    icon: FaRegQuestionCircle,
    chapterDate: '2016',
    chapterTitle: 'Глава 2',
    chapterDescription:
      'Промайнуло пів року, і та сама магічна іскра знову заграла в повітрі. Вона подала знак у вигляді простого повідомлення: “Ти мені подобаєшся”. Так кохання вирішило повернутися, мов весняний вітер, що пробуджує квіти після зимової сплячки.\n' +
      'Двоє закоханих почали будувати свій маленький сад – розквітли довгі розмови, вечірні прогулянки, спільні захоплення. Однак у будь-якому саду можуть з’явитися бур’яни, якщо їх вчасно не помітити. У цьому разі бур’яном став друг на ім’я Денис, чиї ревнощі й ультиматуми загрожували молодим паросткам почуттів. Проте кохання завжди шукає шлях вистояти, і воно прагнуло, щоб ці двоє не здавалися.',
  },
  [ChaptersEnum.PUZZLE_3]: {
    Page: PuzzleHeartGame,
    url: '/game/puzzle',
    iconColor: '#3978E3',
    backgroundColor: 'linear-gradient(120deg, #B5EAEA 0%, #E0F9B5 50%, #FFDAC1 100%)',
    type: ChaptersEnum.PUZZLE_3,
    questName: 'Майстер Пазлів',
    questDescription: 'Склади з розрізнених фрагментів цілу картину, довівши свою уважність.',
    icon: GiPuzzle,
    chapterDate: '2016',
    chapterTitle: 'Глава 3',
    chapterDescription:
      'У спробах уберегти ніжні паростки почуттів, закохані звели фортецю зі спогадів і взаємної довіри. Фортеця стояла в мальовничому місці – здавалось, ніякі бурі не зруйнують її стін. Але згодом у глибинах каміння з’явилися маленькі тріщини: ревнощі, недомовки, спогади про третю людину. Іноді достатньо лише однієї необережної фрази або невчасного вчинку, щоби розкол поширився далі.\n' +
      'Так до початку 2022 року фортеця вже трималась із останніх сил. Кохання, що здавалося всесильним, ніби відступило перед черговим викликом. Саме тоді вони й розійшлися, відчуваючи, що стіни більше не витримують. У День закоханих особливо боляче було визнавати цей розрив. Утім, справжня магія любові не зникає назавжди – вона може лише принишкнути, чекаючи слушного часу повернутися.',
  },
  [ChaptersEnum.WAY_4]: {
    Page: WayWidget,
    url: '/game/way',
    iconColor: '#006B5D',
    backgroundColor: '#C3E5E0',
    type: ChaptersEnum.WAY_4,
    questName: 'Шлях Героя',
    questDescription: 'Обери правильні повороти та не потрап у пастку, вирішуючи покрокові переходи.',
    icon: MdAltRoute,
    chapterDate: '20016',
    chapterTitle: 'Глава 4',
    chapterDescription:
      'Ледве кохання похитнулося всередині фортеці, як на королівство обрушилася ще страшніша буря – війна. Люди залишали свої домівки, простір навколо сповнювався небезпекою і смутком. Здавалося, що тіні від пожеж і гармат закривають сонце, а разом із тим – і будь-яку надію.\n' +
      'Та навіть за таких обставин він спробував востаннє розпалити вогник любові: подарував їй день народження, мов казку, прагнучи нагадати про те, що почуття варте бою. Але наступного ранку з’ясувалося: магічна іскра була розірвана поцілунком із іншим, а війна ще більше розкидала їх по різних куточках світу. Улітку 2022 року вони офіційно прощаються. Здавалося, кохання загубилося в темряві…\n',
  },
  [ChaptersEnum.MAGIC_5]: {
    Page: MagicWidget,
    url: '/game/magic',
    iconColor: '#8F38FF',
    backgroundColor: '#E7DDFA',
    type: ChaptersEnum.MAGIC_5,
    questName: 'Магічний ритуал',
    questDescription: 'Опануй закляття та виконай усі таємничі завдання, щоб пробудити внутрішню силу.',
    icon: FaMagic,
    chapterDate: '20016',
    chapterTitle: 'Глава 5',
    chapterDescription:
      'Часом, аби зрозуміти силу любові, потрібно опинитися на дні відчаю. Так і сталося з одним із цих сердець, яке після розлуки й похмурих днів почало шукати шлях угору. Спершу це виглядало майже неможливим: воно загрузло в сумнівах і болю, а зовні вирувала війна, що не давала спокою.\n' +
      'Утім, кохання має свою магію: коли людина знову віднаходить себе, створює власний простір світла, внутрішній вогонь починає світити ще яскравіше. Немов Фенікс, який воскресає з попелу, серце піднялося, відкинувши старі тягарі й вибудувавши навколо себе ауру зцілення. Любов почала повертатися – спочатку як тихий вогник, а потім, можливо, перетвориться на полум’я.\n',
  },
  [ChaptersEnum.GARDEN_CHANCE_6]: {
    Page: GardenChanceWidget,
    url: '/game/garden-chance',
    iconColor: '#228B22',
    backgroundColor: 'linear-gradient(90deg, #BAF2BB 0%, #FFFEB3 100%)',
    type: ChaptersEnum.GARDEN_CHANCE_6,
    questName: 'Сад Надії',
    questDescription: 'Вирости квіти та рослини, плекаючи зерна, доки вони не розквітнуть на повну.',
    icon: GiSeedling,
    chapterDate: '20016',
    chapterTitle: 'Глава 6',
    chapterDescription:
      'Після того, як одне серце відродилося й набуло сили, кохання відчуло, що настає слушний час подати знак іншому. Тепер вони обоє змінилися, стали дорослішими й пильнішими. І саме тоді вона знову з’явилася в його житті – майже так само несподівано, як колись. Слова, яких він не очікував: “Ти досі важливий для мене”. І, попри досвід болю, він відчув, що іскра ще жива.\n' +
      'Тож кохання постало перед вибором: чи знову розквітнути в цих двох душах, чи залишитися лише приємним спогадом? Усе залежало від їхньої здатності пробачити й повірити. І здавалося, що на цей раз вони обидвоє більше цінують можливість бути разом.',
  },
  [ChaptersEnum.WEDDING_PROPOSITION_7]: {
    Page: WeddingProposalWidget,
    url: '/game/wedding-proposition',
    iconColor: '#F9A602',
    backgroundColor: '#FFF7E8',
    type: ChaptersEnum.WEDDING_PROPOSITION_7,
    questName: 'Романтична пропозиція',
    questDescription: 'Пройди шлях від сюрпризу до освідчення, зробивши найважливіший крок у житті.',
    icon: GiBigDiamondRing,
    chapterDate: '20016',
    chapterTitle: 'Глава 7',
    chapterDescription:
      'Нарешті настала мить, коли кохання вирішило здійснити свій найсміливіший крок: вона приїхала без попередження, перетнувши межі страху й невпевненості. Він не одразу впізнав її, та коли зрозумів, – серце затріпотіло, мов птах, що рветься на волю.\n' +
      'Тієї миті всі тіні війни, сумніви й старі образи ніби розтанули в сяйві нового світанку. В їхніх поглядах читалося: якщо почуття витримало стільки викликів, воно гідне того, щоб нарешті поєднати ці серця назавжди. Вони вирішили одружитися, бо зрозуміли: справжня любов – це найбільше диво, яке варто берегти як скарб. Історія, що розпочалася з випадкового питання про шахи, завершується обітницею бути разом довіку.\n',
  },
};