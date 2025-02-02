import { FC, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  HStack,
  Alert,
} from '@chakra-ui/react';
import { useColorModeValue } from '../components/color-mode.tsx';
import { ProgressRoot, ProgressBar } from '../components/progress.tsx';
import { useAppDispatch, useAppSelector } from '../shared/hooks/redux.hooks.ts';
import { doCompleteTask } from '../features/user/userSlice.ts';
import { ChaptersEnum } from '../shared/types/chapters.enum.ts';

/**
 * Структура кроку (етапу) гри.
 */
interface GameStep {
  id: number;
  title: string;
  description: string;
  options: {
    text: string;
    // Зміни показників
    hopeDelta: number;
    trustDelta: number;
    heartacheDelta: number;
    outcome: string;
  }[];
}

const WayWidget: FC = () => {
  // Зберігаємо три показники: Надію, Довіру та Серцевий біль.
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user);
  const [hope, setHope] = useState(50);
  const [trust, setTrust] = useState(50);
  const [heartache, setHeartache] = useState(0);

  // Номер поточного кроку (0,1,2)
  const [currentStep, setCurrentStep] = useState(0);

  // Текст результату останнього вибору
  const [outcomeText, setOutcomeText] = useState('');

  // Прапорець “чи завершена гра”
  const [isFinished, setIsFinished] = useState(false);

  // Колір фону залежно від режиму (light/dark)
  const bg = useColorModeValue('gray.100', 'gray.700');

  /**
   * Масив із кроками гри.
   */
  const steps: GameStep[] = [
    {
      id: 1,
      title: 'Крок 1: Тривожний ранок після свята',
      description: `
Учора він влаштував для тебе незабутній вечір на честь твого дня народження: 
свічки, музика, подарунки. Здавалося, нічого не може зіпсувати ці щирі миті. 
Але сьогодні зранку ти відчуваєш дивну напругу: 
очі в нього сумні, а на душі важкість, ніби він щось приховує. 
Ти здогадуєшся, що справа в тому випадковому поцілунку з іншим… 
Як поведешся тепер?
    `,
      options: [
        {
          text: 'Сама заговорити про цей поцілунок і спробувати прояснити все',
          hopeDelta: +2,
          trustDelta: +3,
          heartacheDelta: 0,
          outcome:
            'Ти проявляєш ініціативу, щоб не залишати простір для недомовок. Він слухає, хоч і болісно, але в очах з’являється іскорка розуміння.',
        },
        {
          text: 'Вдавати, що нічого не сталося, сподіваючись, що він забуде',
          hopeDelta: -2,
          trustDelta: -3,
          heartacheDelta: +2,
          outcome:
            'Ти уникаєш теми, та бачиш, як його погляд щоразу повертається до цієї рани. Мовчання стає тягарем для обох.',
        },
      ],
    },
    {
      id: 2,
      title: 'Крок 2: Зізнання і перші сумніви',
      description: `
Він нарешті питає про поцілунок: «Що це означало для тебе?». 
Тепер тобі доводиться прямо відповідати. У душі змішується сором, легка образа, 
а також страх його реакції. Ваше кохання стоїть перед випробуванням недовірою. 
Що вирішиш?
    `,
      options: [
        {
          text: 'Заспокоїти його, пояснити, що це не мало жодної глибокої емоції',
          hopeDelta: +1,
          trustDelta: +4,
          heartacheDelta: -1,
          outcome:
            'Ти визнаєш помилковість свого вчинку, намагаєшся повернути усе у звичне русло. Він трохи розслабляється, але тінь сумніву лишається.',
        },
        {
          text: 'Поставити зустрічне запитання: чи він сам колись не вагається?',
          hopeDelta: -1,
          trustDelta: -3,
          heartacheDelta: +2,
          outcome:
            'Ти переходиш в оборону, намагаючись знайти в його діях щось подібне. Він відчуває несправедливість і біль наростає.',
        },
        {
          text: 'Попросити часу, щоб розібратися в собі, не даючи йому чіткої відповіді',
          hopeDelta: 0,
          trustDelta: -1,
          heartacheDelta: +1,
          outcome:
            'Ти відчуваєш внутрішню розгубленість і відкладаєш розмову на потім. Невідомість стає бар’єром між вами.',
        },
      ],
    },
    {
      id: 3,
      title: 'Крок 3: Початок війни',
      description: `
Країну застала війна. Новини про обстріли і небезпеку накочуються мов хвилі. 
На фоні цього ти відчуваєш, що ваші особисті негаразди вже не здаються такими 
великими, але все ж залишаються невирішеними. 
Якщо раніше можна було просто відвернутись і піти, 
то тепер страх за власне життя і життя близьких бере гору.
    `,
      options: [
        {
          text: 'Відкласти всі сварки й об’єднатися, шукаючи шляхи евакуації разом',
          hopeDelta: +3,
          trustDelta: +5,
          heartacheDelta: -2,
          outcome:
            'Ти проявляєш солідарність, розуміючи, що зараз потрібна взаємна підтримка. Ваше кохання отримує шанс ще поборотися.',
        },
        {
          text: 'Вирішити діяти самостійно: зібрати речі й тікати будь-якою ціною',
          hopeDelta: -2,
          trustDelta: -4,
          heartacheDelta: +3,
          outcome:
            'Ти обираєш інстинкт самозбереження, не дуже переймаючись його планами. Він відчуває відсторонення й розрив посилюється.',
        },
      ],
    },
    {
      id: 4,
      title: 'Крок 4: Дилема: лишатися чи виїхати?',
      description: `
Ситуація ускладнюється. Ти дізнаєшся, що в нього є ідея лишитися волонтерити чи 
допомагати в обороні міста. Саме в цей момент ти бачиш, 
що ваші погляди можуть розійтися остаточно. 
Чи підтримаєш його план, чи наполягатимеш на виїзді?
    `,
      options: [
        {
          text: 'Підтримати його, сказати: «Якщо ти лишаєшся, я теж із тобою»',
          hopeDelta: +4,
          trustDelta: +3,
          heartacheDelta: -1,
          outcome:
            'Ти готова розділити з ним цей ризик. У ваші стосунки повертається відчуття спільної мети.',
        },
        {
          text: 'Закликати його не ризикувати й піти з тобою',
          hopeDelta: +1,
          trustDelta: +2,
          heartacheDelta: +1,
          outcome:
            'Ти показуєш, що турбуєшся про його життя, але він вагається, чи зможе залишити рідний дім. Напруга зростає.',
        },
        {
          text: 'Прийняти рішення їхати самій, а його вибір хай буде його справою',
          hopeDelta: -3,
          trustDelta: -4,
          heartacheDelta: +2,
          outcome:
            'Ти більше не хочеш сперечатися, приймаєш власне рішення. Прірва між вами починає збільшуватися.',
        },
      ],
    },
    {
      id: 5,
      title: 'Крок 5: Страх і сердечний біль',
      description: `
Минає кілька тижнів. Новини невтішні, небезпека зростає. 
Ти помічаєш, що він теж виснажений і невпевнений. 
У ваших стосунках досі болить тема того поцілунку — 
ніби маленька колючка, що час від часу нагадує про себе. 
Як поводишся, коли гіркота знову випливає у розмовах?
    `,
      options: [
        {
          text: 'Замість обвинувачень, ти намагаєшся розвіяти його сумніви, визнаючи власні помилки',
          hopeDelta: +3,
          trustDelta: +4,
          heartacheDelta: -1,
          outcome:
            'Ти робиш крок до примирення. Хоча обом боляче, але щирість відкриває шлях для відновлення довіри.',
        },
        {
          text: 'Зриваєшся й дорікаєш, що він теж не ідеальний',
          hopeDelta: -1,
          trustDelta: -3,
          heartacheDelta: +2,
          outcome:
            'Ваша розмова перетворюється на обмін старими образами. Почуття стають слабшими, а біль сильнішим.',
        },
      ],
    },
    {
      id: 6,
      title: 'Крок 6: Офіційне рішення про розрив (Літо 2022)',
      description: `
На дворі вже літо 2022-го. Події війни тривають, але ви одночасно 
зрозуміли, що втомилися від взаємних підозр, напруження і тривог. 
Постає думка: можливо, краще на якийсь час відпустити одне одного. 
Ви домовляєтеся, що офіційно «розходитеся». 
Що скажеш чи зробиш у цей момент?
    `,
      options: [
        {
          text: 'Сказати йому, що все ще маєш теплі почуття, але потрібен час',
          hopeDelta: +2,
          trustDelta: +3,
          heartacheDelta: +0,
          outcome:
            'Ти залишаєш двері привідкритими, визнаючи, що почуття не зникли, але зараз вони обтяжені обставинами.',
        },
        {
          text: 'Зробити вигляд, що тобі байдуже й ти легко можеш жити без нього',
          hopeDelta: -3,
          trustDelta: -4,
          heartacheDelta: +3,
          outcome:
            'Ти приховуєш справжні емоції за маскою байдужості. Він також замикається в собі, відчуваючи втрату.',
        },
        {
          text: 'Поділитися з ним, що ця розлука може бути шансом подумати, як усе виправити',
          hopeDelta: +3,
          trustDelta: +4,
          heartacheDelta: -1,
          outcome:
            'Ти називаєш це «перервою» замість «кінець». Він на мить бачить надію, що це не остаточна крапка.',
        },
      ],
    },
    {
      id: 7,
      title: 'Крок 7: Фінальне прощання чи новий початок?',
      description: `
Остання розмова перед тим, як ваші дороги остаточно розійдуться. 
Він дивиться на тебе з сумом, а тобі болить у грудях від думки, 
що все могло бути інакше. Попри ваші розбіжності та війну, 
чи хочеш ти залишити маленький вогник надії? 
Або ж готова обірвати зв’язок остаточно?
    `,
      options: [
        {
          text: 'Сказати йому: «Я завжди буду поруч, якщо ти покличеш»',
          hopeDelta: +5,
          trustDelta: +5,
          heartacheDelta: -2,
          outcome:
            'Ти даєш шанс майбутньому. У його очах мерехтить невимовна подяка, а твоє серце відчуває полегкість.',
        },
        {
          text: 'Попрощатися, не зачиняючи дверей, але без чітких обіцянок',
          hopeDelta: +1,
          trustDelta: +2,
          heartacheDelta: 0,
          outcome:
            'Ти залишаєшся чесною: не обіцяєш нічого, бо сама не знаєш, що чекає попереду. Проте між вами лишається повага.',
        },
        {
          text: 'Рішуче відвернутися і піти, без жодного слова',
          hopeDelta: -5,
          trustDelta: -5,
          heartacheDelta: +5,
          outcome:
            'Твої сльози змішані з образою. Ви розходитеся, так і не промовивши того, що могло б усе змінити.',
        },
      ],
    },
  ];

  /**
   * Обробляє вибір на поточному кроці.
   */
  const handleChoice = (
    hopeDelta: number,
    trustDelta: number,
    heartacheDelta: number,
    outcome: string
  ) => {
    setHope(clampValue(hope + hopeDelta, 0, 100));
    setTrust(clampValue(trust + trustDelta, 0, 100));
    setHeartache(clampValue(heartache + heartacheDelta, 0, 100));
    setOutcomeText(outcome);
  };

  /**
   * Перехід до наступного кроку або завершення.
   */
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setOutcomeText('');
    } else {
      setIsFinished(true);
    }
  };

  /**
   * Фінальний текст, що підсумовує історію.
   */
  const getFinalSummary = () => {
    let summary = '';

    // Якщо серцевий біль (heartache) дуже високий
    if (heartache >= 70) {
      summary +=
        'Емоційна рана виявилась надто глибокою. Наразі ваші шляхи справді розійшлися, залишивши слід суму й тихої туги. ';
    } else if (heartache >= 30) {
      summary +=
        'У серці залишилося відчутне щеміння, але воно не поглинуло тебе повністю. Є шанс, що з часом біль перетвориться на мудрість. ';
    } else {
      summary +=
        'Тобі вдалося зберегти чимало світла всередині, і навіть переживши складні моменти, ти не дав(-ла) болю повністю перемогти любов. ';
    }

    // Якщо довіра (trust) дуже висока
    if (trust >= 70) {
      summary +=
        'У ваших стосунках залишилося чимало взаєморозуміння, навіть попри негаразди. Можливо, у майбутньому на вас чекає нова сторінка... ';
    } else if (trust >= 30) {
      summary +=
        'Довіра суттєво хитнулася, та все ж є підстави сподіватися, що колись ваші дороги зможуть перетнутися без образ. ';
    } else {
      summary +=
        'Довіра сильно зруйнована; зараз ви стоїте на порозі цілковито різних шляхів. ';
    }

    // Якщо надія (hope) висока
    if (hope >= 70) {
      summary +=
        'Твоє серце зберегло силу й оптимізм. Навіть у темряві ти бачиш нові можливості й готовий(-а) повірити в щось краще.';
    } else if (hope >= 30) {
      summary +=
        'Ти почуваєшся втомлено. Проте іскорка надії не згасла остаточно і може знову яскраво спалахнути, якщо дати їй час. ';
    } else {
      summary +=
        'Наразі ти майже зневірив(-ла)ся. Але час загоює навіть найглибші рани — можливо, одного дня промінь світла повернеться у твоє життя.';
    }

    return summary;
  };

  /**
   * Скидає стан гри, якщо користувач захоче почати заново.
   */
  const handleReset = () => {
    setHope(50);
    setTrust(50);
    setHeartache(0);
    setCurrentStep(0);
    setOutcomeText('');
    setIsFinished(false);
  };

  /**
   * Викликаємо зовнішній onComplete() для переходу до іншої частини подарунка / наступної глави.
   */
  const handleFinish = async () => {
    if (id)
      await dispatch(doCompleteTask({ chatId: id ,chapter: ChaptersEnum.WAY_4 }))
  };

  /**
   * Маленька утилітна функція, щоб зберігати значення в межах 0..100.
   */
  function clampValue(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(value, max));
  }

  // Поточний крок
  const currentGameStep = steps[currentStep];

  return (
    <Box
      bg={bg}
      p={5}
      rounded="md"
      shadow="md"
      maxW="650px"
      margin="0 auto"
    >
      <Heading as="h3" size="lg" mb={3} textAlign="center">
        Випробування війною (Глава 4)
      </Heading>

      {!isFinished && (
        <>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            {currentGameStep.title}
          </Text>
          <Text fontSize="md" mb={4} whiteSpace="pre-line">
            {currentGameStep.description}
          </Text>

          {/* Показники (Надія, Довіра, Серцевий біль) */}
          <HStack mb={4} p={4} align="flex-start">
            <Box>
              <Text fontWeight="semibold">Надія: {hope}/100</Text>
              <ProgressRoot value={hope} maxW="180px">
                <ProgressBar />
              </ProgressRoot>
            </Box>

            <Box>
              <Text fontWeight="semibold">Довіра: {trust}/100</Text>
              <ProgressRoot value={trust} maxW="180px">
                <ProgressBar />
              </ProgressRoot>
            </Box>

            <Box>
              <Text fontWeight="semibold">Серцевий біль: {heartache}/100</Text>
              <ProgressRoot value={heartache} maxW="180px">
                <ProgressBar />
              </ProgressRoot>
            </Box>
          </HStack>

          {/* Варіанти вибору */}
          <VStack p={3} mb={3} align="stretch">
            {currentGameStep.options.map((option, idx) => (
              <Button
                key={idx}
                onClick={() =>
                  handleChoice(
                    option.hopeDelta,
                    option.trustDelta,
                    option.heartacheDelta,
                    option.outcome
                  )
                }
                colorScheme="blue"
                variant="outline"
                style={{ backgroundColor: '#0895c2', color: 'white' }}
              >
                {option.text}
              </Button>
            ))}
          </VStack>

          {/* Відображення результату вибору */}
          {outcomeText && (
            <Alert.Root status="info" variant="subtle" rounded="md" mb={3}>
              <Alert.Indicator />
              <Alert.Content flex="1">
                <Alert.Title>Результат дії:</Alert.Title>
                <Alert.Description>{outcomeText}</Alert.Description>
              </Alert.Content>
            </Alert.Root>
          )}

          {/* Кнопка "Наступний крок" або "Завершити" */}
          <HStack p={4}>
            <Button
              style={{ backgroundColor: '#0895c2' }}
              variant="outline"
              onClick={handleNextStep}
              disabled={!outcomeText}
            >
              {currentStep < steps.length - 1
                ? 'Наступний крок'
                : 'Завершити главу'}
            </Button>

            <Button variant="outline" style={{ backgroundColor: 'rgb(26, 26, 26)', color: 'white' }}  onClick={handleReset}>
              Скинути все
            </Button>
          </HStack>
        </>
      )}

      {/* Фінал гри (підсумок) */}
      {isFinished && (
        <>
          <Alert.Root status="success" variant="solid" mb={4}>
            <Alert.Indicator />
            <Alert.Content flex="1">
              <Alert.Title>Підсумок історії:</Alert.Title>
              <Alert.Description whiteSpace="pre-line">
                {getFinalSummary()}
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>

          <HStack p={4}>
            <Button colorScheme="pink" style={{ backgroundColor: 'rgb(26, 26, 26)', color: 'white' }} onClick={handleFinish}>
              Продовжити далі
            </Button>
            <Button variant="outline" style={{ backgroundColor: 'rgb(26, 26, 26)', color: 'white' }} onClick={handleReset}>
              Пройти заново
            </Button>
          </HStack>
        </>
      )}
    </Box>
  );
};

export default WayWidget;