import React, { useEffect, useState } from 'react';
import type { Square } from 'chess.js';
import { Chess, Color } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Alert, Icon, IconButton } from '@chakra-ui/react';
import { GoHeartFill } from 'react-icons/go';
import { SlActionUndo } from 'react-icons/sl';
import Steps from '../components/custom/custtomSteps.tsx';
import { useAppDispatch, useAppSelector } from '../shared/hooks/redux.hooks.ts';
import { ChaptersEnum } from '../shared/types/chapters.enum.ts';
import { doCompleteTask } from '../features/user/userSlice.ts';


// ---------------------------------------------------------------------
// Налаштування сценарію
// ---------------------------------------------------------------------
interface DebutStep {
  white: string;       // основний (правильний) хід білих
  black: string;       // хід чорних у відповідь
  whiteAlts?: string[];
  blackAlts?: string;
}

const mainLine: DebutStep[] = [
  {
    white: "Nf3",
    whiteAlts: ["d4"],
    black: "d5",
    blackAlts: "Nf6",
  },
  {
    white: "g3",
    whiteAlts: ["c4"],
    black: "Nf6",
    blackAlts: "g6",
  },
  {
    white: "Bg2",
    black: "c6",
    blackAlts: "e6",
  },
  {
    white: "O-O",
    black: "Bf5",
    blackAlts: "e6",
  },
  {
    white: "d3",
    whiteAlts: ["d4"],
    black: "e6",
    blackAlts: "Nbd7",
  },
  {
    white: "Nbd2",
    whiteAlts: ["Nc3"],
    black: "Be7",
    blackAlts: "Bd6",
  },
  {
    white: "Re1",
    whiteAlts: ["c4", "b3"],
    black: "h6",
    blackAlts: "O-O",
  },
  {
    white: "e4",
    whiteAlts: ["c4"],
    black: "dxe4",
    blackAlts: "O-O",
  },
];

const mainColor: Color = 'w';

const setupBoard: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const ERROR_TITLE = 'Нажаль неправильно :(';
const ERROR_DESCRIPTION: string[] = [
  'Ти сильна, мов королева. Спробуй ще раз — впевнена, наступний хід буде кращим!',
  'У любові та шахах можна помилятись, але головне – не зупинятися. Спробуй знову!',
  'Навіть серце втрачає ритм іноді. Не переймайся, зроби інший хід!',
  'Ти, мов ніжна троянда, яка лише розквітає. Зроби крок уперед і спробуй іншу стежину!',
  'У кожної історії бувають маленькі помилки. Перечитай свій наступний розділ і ходи далі!',
  'Кожна принцеса іноді робить крок назад, щоб підкорити весь палац. Зроби нову спробу!',
  'Твоє серце веде за собою, але у шахах воно інколи потребує паузи. Подумай спокійно — і вперед!',
  'Цей хід виявився невдалим. Проте, як вірний лицар, ти знову можеш підняти меч і боротися!',
  'Ходи шахів подібні до кроків у коханні: помилившись, не соромся почати знову',
  'В любві, як і у грі, шлях до перемоги може бути довгим. Одне невеличке відхилення — і ти ще сильніше!',
];

const ALTERNATIVE_TITLE = 'Хороший хід) але він альтернатива';
const ALTERNATIVE_DESCRIPTION: string[] = [
  'Це як несподіваний поцілунок: не за планом, зате приємно! Хочеш повернутись до основного?',
  'Гарний вчинок, хоча не зовсім те, що ми планували. Хочеш спробувати інший?',
  'Твоє серце вирішило інакше — і це теж чудово. Але, може, варто глянути на головний варіант?',
  'Цей сюрприз вартий уваги. Проте за основним сценарієм може бути ще цікавіше!',
  'Ти обрала власний шлях, мов легкий вітер у полі. Однак у нас є й інший сценарій, спробуєш?',
  'Приємна несподіванка, мов нова історія. Можливо, повернутися до основного шляху?',
  'Кожна троянда особлива, як і твій альтернативний хід. Але головна лінія ще чекає!',
  'Твоє романтичне серце зробило поворот. Хочеш побачити, що було б за основним планом?',
  'Іноді в коханні ми відхиляємось від запланованого. Хочеш повернутись до головної ідеї?',
  'Альтернатива може бути солодкою, мов полуничний десерт. Однак давай поглянемо й на «класичний» вибір.',
];

const SUCCESS_TITLE = 'Умнічкаааа :))';
const SUCCESS_DESCRIPTION: string[] = [
  'Ти справжня королева цієї дошки! Продовжуй у тому ж дусі!',
  'Як гарно ти розставила свої думки, мов квіти у букеті. Чудовий хід!',
  'Це було неперевершено, мов перший весняний промінчик. Ти молодець!',
  'Твій крок ніжний і впевнений одночасно. Мені подобається такий стиль!',
  'Як сонце освітлює ранок, так і ти осяяла цю партію своїм блискучим ходом!',
  'Твоє рішення — це поєднання розуму та натхнення. Крок просто казковий!',
  'Ти, мов справжня майстриня, вибрала ідеальний маршрут у грі й у серці!',
  'Так тримати! З таким ходом ти підкорюєш не лише дошку, а й моє серце!',
  'Твій правильний хід нагадує ніжний дотик: делікатний, але неймовірно потужний.',
  'Немов промінь любові торкнувся цієї дошки. Ти граєш чудово, йдеш до перемоги!',
];

const INFO_TEXT = 'Механіка: оберіть правильний дебют, де білий слон швидко опиняється на великій діагоналі (g2). Не лякайтеся, дебют не дуже складний, та вимагає уважності й трішки романтики в душі!\n' +
  '\tНагорода: +50 монет, титул “Рицар шахів”.\n' +
  '\n' +
  '\tНехай любов до шахів стане місточком до справжніх почуттів. Твоє завдання – пройти всі кроки: від першого натхненного “Nf3” до впевненої рокіровки, і довести, що навіть у шаховому світі є місце для теплоти та ніжності.\n' +
  '\n' +
  '\tСпробуй зробити перший хід – хай ця іскра спалахне яскраво, мов весняне сонце!';

// ---------------------------------------------------------------------
// Компонент
// ---------------------------------------------------------------------
export default function ChessGameWidget() {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user);
  const [game, setGame] = useState(new Chess(setupBoard));

  // Який крок (з масиву mainLine) зараз відпрацьовуємо
  const [stepIndex, setStepIndex] = useState<number>(0);

  const [isLockedGame, setIsLockedGame] = useState<boolean>(false);

  // Стан для "click-to-move"
  const [moveFrom, setMoveFrom] = useState<Square | ''>('');
  const [optionSquares, setOptionSquares] = useState<Record<string, React.CSSProperties>>({});

  // Повідомлення для юзера
  const [message, setMessage] = useState<string>('Зробіть 1-й хід: e4');
  const [messageDescription, setMessageDescription] = useState<string>('');
  const [messageState, setMessageState] = useState<'info' | 'warning' | 'success' | 'error' | 'neutral' | null>(null);

  const [levels, setLevels] = useState<number>(0);

  useEffect(() => {
    setAlertStatus('start');
  }, []);

  useEffect(() => {
    if (['success', null].includes(messageState)) {
      setLevels(stepIndex);
    } else {
      setLevels(Math.max(0, stepIndex - 1));
    }

  }, [stepIndex]);

  function setAlertStatus(state: 'info' | 'success' | 'error' | 'finish' | 'start' | null): void {
    switch (state) {
      case 'info':
        setMessage(ALTERNATIVE_TITLE);
        setMessageDescription(ALTERNATIVE_DESCRIPTION[Math.floor(Math.random() * ALTERNATIVE_DESCRIPTION.length)]);
        setMessageState(state);
        break;
      case 'error':
        setMessage(ERROR_TITLE);
        setMessageDescription(ERROR_DESCRIPTION[Math.floor(Math.random() * ERROR_DESCRIPTION.length)]);
        setMessageState(state);
        break;
      case 'success':
        setMessage(SUCCESS_TITLE);
        setMessageDescription(SUCCESS_DESCRIPTION[Math.floor(Math.random() * SUCCESS_DESCRIPTION.length)]);
        setMessageState(state);
        break;
      case 'finish':
        setMessage('Перемогаа))');
        setMessageDescription('Вітаю кохана ти впоралася з цим завданням очікуй подальші))!');
        setMessageState('success');
        break;
      case 'start':
        setMessage('Міні-гра: “Перший хід”');
        setMessageDescription(INFO_TEXT);
        setMessageState('info');
        break;
      default:
        setMessage('');
        setMessageDescription('');
        setMessageState(null);
        break;
    }
  }

  // ---------------------------------------------------------------------
  // Допоміжні функції
  // ---------------------------------------------------------------------
  function safeGameMutate(fn: (draft: Chess) => void) {
    setGame((prev) => {
      const clone = new Chess();
      clone.loadPgn(prev.pgn());
      fn(clone);
      return clone;
    });
  }

  /**
   * Зробити хід (SAN-нотація), не перевіряючи легальність (припускаємо, що move коректний).
   * Після цього оновлюємо стан game.
   */
  function doMove(moveSan: string) {
    safeGameMutate((draft) => {
      draft.move(moveSan);
    });
  }

  /**
   * Повернути останні (n) ходів
   */
  function undoMoves(count: number) {
    safeGameMutate((draft) => {
      for (let i = 0; i < count; i++) {
        draft.undo();
      }
    });
    setStepIndex(Math.max(stepIndex - 1, 0));
  }

  /**
   * Показати можливі ходи з певного square (підсвітка).
   */
  function showMoveOptions(square: Square) {
    const moves = game.moves({
      square,
      verbose: true,
    });
    if (moves.length === 0) {
      setOptionSquares({});
      return;
    }
    const newSquares: Record<string, React.CSSProperties> = {};
    moves.forEach((m) => {
      newSquares[m.to] = {
        background:
          game.get(m.to) && game.get(m.to)?.color !== game.get(square)?.color
            ? 'radial-gradient(circle, rgba(0,0,0,.2) 80%, transparent 80%)'
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%',
      };
    });
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)',
    };
    setOptionSquares(newSquares);
  }

  /**
   * Якщо крок зроблено правильно (збігається з mainLine[stepIndex].white):
   *  - застосовуємо цей хід
   *  - показуємо повідомлення "Хід правильний"
   *  - чорні роблять свій хід (mainLine[stepIndex].black)
   *  - переходимо до наступного кроку
   */
  function handleCorrectMove(moveSan: string) {
    // Застосувати хід білих
    doMove(moveSan);

    // Через невеликий таймаут робимо хід чорних і переходимо далі
    setTimeout(async () => {
      const blackMove = mainLine[stepIndex].black;
      doMove(blackMove);

      // Наступний крок
      const nextIndex = stepIndex + 1;
      setStepIndex(nextIndex);
      if (nextIndex < mainLine.length) {
        setAlertStatus('success');
      } else {
        setAlertStatus('finish');
        setIsLockedGame(true);
        if (id)
          await dispatch(doCompleteTask({ chatId: id ,chapter: ChaptersEnum.CHESS_GAME_1 }))
      }
    }, 500);
  }

  /**
   * Якщо хід альтернативний (але не основний):
   *  - застосовуємо цей хід
   *  - чорні роблять "найкращу" відповідь (умовно), пояснюємо, що це була альтернатива
   *  - пропонуємо кнопкою "Undo" повернутися
   */
  function handleAlternativeMove(moveSan: string) {
    // Білий хід
    doMove(moveSan);
    // Чорний хід — припустімо, все одно з mainLine[stepIndex].black
    const blackMove = mainLine[stepIndex].blackAlts || mainLine[stepIndex].black;
    doMove(blackMove);

    const nextIndex = stepIndex + 1;
    setStepIndex(nextIndex);

    setAlertStatus('info');
    setIsLockedGame(true);
  }

  /**
   * Якщо хід поганий:
   *  - застосовуємо його (білих),
   *  - чорні роблять найкращу відповідь (blackMove),
   *  - пояснюємо, чому це погано
   *  - пропонуємо "Undo"
   */
  function handleBadMove(moveSan: string) {
    doMove(moveSan);

    const nextIndex = stepIndex + 1;
    setStepIndex(nextIndex);

    setAlertStatus('error');
    setIsLockedGame(true);
  }

  /**
   * Логіка click-to-move:
   *  1. Якщо moveFrom порожній — обираємо клітинку звідки
   *  2. Інакше намагаємося зробити хід
   */
  function onSquareClick(square: Square) {
    if (isLockedGame) {
      return;
    }
    if (moveFrom) {
      const movesFrom = game.moves({
        square: moveFrom,
        verbose: true,
      });

      const foundMove = movesFrom.find(m => m.to === square);
      if (!foundMove) {
        // Ходу немає, тож не викликаємо game.move, уникаємо винятку
        setOptionSquares({});
        setMoveFrom('');
        return;
      }

      // move.san — короткий запис "e4", "Nf3" тощо
      const userMove = foundMove.san;

      // Порівняємо з mainLine
      if (stepIndex < mainLine.length) {
        const correct = mainLine[stepIndex].white;
        const alts = mainLine[stepIndex].whiteAlts || [];
        if (userMove === correct) {
          // Правильний хід
          handleCorrectMove(userMove);
        } else if (alts.includes(userMove)) {
          // Альтернативний хід
          handleAlternativeMove(userMove);
        } else {
          // Поганий хід
          handleBadMove(userMove);
        }
      } else {
        // Вже завершили всі кроки mainLine,
        // але людина ще щось ходить — для прикладу, приймаємо?
        handleBadMove(userMove);
      }

      setOptionSquares({});
      setMoveFrom('');
    } else {
      // Перший клік: обираємо фігуру (якщо є)
      const clickedPiece = game.get(square);
      if (!clickedPiece || clickedPiece.color !== 'w') {
        // Для прикладу, не дозволяти ходити чорними або порожнім
        return;
      }
      // Зберігаємо звідки ходимо
      setMoveFrom(square);
      showMoveOptions(square);
      setAlertStatus(null);
    }
  }

  /**
   * Кнопка “Undo Move” — відкотити 2 ходи (якщо білі та чорні вже походили),
   * або 1 хід (якщо встиг лише білий) — залежить від ваших бажань.
   */
  function onUndo() {
    if (messageState === 'success')
      return;
    // Спробуємо відкрутити 2 ходи (хід білих і чорних)
    const countMoves = game.turn() === mainColor ? 2 : 1;
    undoMoves(countMoves);
    setOptionSquares({});
    setMoveFrom('');
    setAlertStatus(null);
    setIsLockedGame(false);
  }

  return (
    <div style={{ margin: '20px' }}>

      <div style={{
        marginBottom: '10px',
        display: 'flex',
      }}>
        <IconButton variant="outline" style={{
          marginRight: '10px',
          backgroundColor: 'rgb(26, 26, 26)',
        }} onClick={onUndo}><Icon color={'white'} as={SlActionUndo} /></IconButton>
        {messageState ? <Alert.Root status={messageState} onClick={onUndo} style={{
            display: 'inline-flex',
            width: '100%',
          }} variant="solid">
            <Alert.Indicator>
              <Icon as={GoHeartFill} />
            </Alert.Indicator>
            <Alert.Content>
              <Alert.Title>{message}</Alert.Title>
              <Alert.Description style={{ whiteSpace: 'pre-line' }}>
                {messageDescription}
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
          : <></>}
      </div>

      <Chessboard
        position={game.fen()}
        arePiecesDraggable={false}
        onSquareClick={onSquareClick}
        customSquareStyles={optionSquares}
      />

      <Steps step={levels} config={mainLine.map((m, i) => ({ title: i < levels ? m.white : '???' }))} />

    </div>
  );
}