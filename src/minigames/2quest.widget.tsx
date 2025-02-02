import { useState } from "react";
import {
  Box,
  VStack,
  Button,
  Text,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from '../shared/hooks/redux.hooks.ts';
import { doCompleteTask } from '../features/user/userSlice.ts';
import { ChaptersEnum } from '../shared/types/chapters.enum.ts';

/** Тип одного варіанта вибору */
interface Choice {
  id: string;
  label: string;
  nextStepId: number; // -1, якщо це фінал
  endingId?: string;
}

/** Тип кроку (сцени) */
interface Step {
  id: number;
  title: string;
  description: string; // Текст від імені Кохання
  choices: Choice[];
}

/** Тип фіналу */
interface Ending {
  id: string;
  title: string;
  description: string;
}

/** Тип повідомлення (чат) */
interface ChatMessage {
  role: "kohana" | "user";
  content: string;
}

/** 8 кроків */
const STEPS: Step[] = [
  {
    id: 1,
    title: "Березень 2017: Початок почуттів",
    description: `
Я — Кохання, щойно розквітла між вами.
Ви наважилися зустрічатися, проте відчуваю в тобі
легкий сумнів: чи щирий він?

Чого мені нашепотіти тобі на цьому етапі?
    `,
    choices: [
      {
        id: "A",
        label: "Довіритися йому, насолоджуватися романтикою весни",
        nextStepId: 2,
      },
      {
        id: "B",
        label: "Бути стриманою, поки не станеш певна",
        nextStepId: 2,
      },
    ],
  },
  {
    id: 2,
    title: "Квітень 2017: Перші сумніви",
    description: `
Минає кілька тижнів. Ти помічаєш, що він поводиться трохи дивно,
а його друг Денис має на нього сильний вплив.
Як реагувати на таку поведінку?
    `,
    choices: [
      {
        id: "A",
        label: "Обговорити з ним усе прямо, не тягнути",
        nextStepId: 3,
      },
      {
        id: "B",
        label: "Спостерігати мовчки, поки що не втручатися",
        nextStepId: 3,
      },
      {
        id: "C",
        label: "Уже зараз почати сумніватися в доцільності стосунків",
        nextStepId: 3,
      },
    ],
  },
  {
    id: 3,
    title: "Травень 2017: Ультиматум Дениса",
    description: `
Друг хлопця, Денис, вимагає: "Обирай: або я, або вона".
Такі слова впливають і на твоє сприйняття:
чому хлопець вагається між тобою і другом?
Як я, Кохання, маю тобі допомогти?
    `,
    choices: [
      {
        id: "A",
        label: "Вимагай від нього пояснень, хай покаже пріоритети",
        nextStepId: 4,
      },
      {
        id: "B",
        label: "Залиш йому час, можливо, він сам усе владнає",
        nextStepId: 4,
      },
      {
        id: "C",
        label: "Приготуватися до гіршого: може, краще піти?",
        nextStepId: 4,
      },
    ],
  },
  {
    id: 4,
    title: "Кінець серпня 2017: Викриття переписки",
    description: `
Ти дізнаєшся, що на початку він порівнював тебе з іншою дівчиною.
Це боляче вражає, народжується недовіра.
Як діяти з такою образою?
    `,
    choices: [
      {
        id: "A",
        label: "Поговорити, спробувати зрозуміти його мотиви",
        nextStepId: 5,
      },
      {
        id: "B",
        label: "Закритися, тримати образу в собі",
        nextStepId: 5,
      },
      {
        id: "C",
        label: "Влаштувати йому скандал, дати волю гніву",
        nextStepId: 5,
      },
    ],
  },
  {
    id: 5,
    title: "Вересень 2017: Зростає відстань",
    description: `
Він намагається загладити провину, та ти відчуваєш холод.
Денис лишається поруч, натякає, що він "краще розуміє" тебе.
Що далі?
    `,
    choices: [
      {
        id: "A",
        label: "Дати шанс, поговорити й розставити всі крапки",
        nextStepId: 6,
      },
      {
        id: "B",
        label: "Віддалятися, не приймаючи його спроб",
        nextStepId: 6,
      },
    ],
  },
  {
    id: 6,
    title: "Жовтень 2017: Можливість примирення",
    description: `
Він намагається відновити стосунки,
але твоя довіра підірвана. Денис же виглядає надійним.
Як я, Кохання, можу підказати тобі в цій ситуації?
    `,
    choices: [
      {
        id: "A",
        label: "Слухати його вибачення, дати хоч маленький шанс",
        nextStepId: 7,
      },
      {
        id: "B",
        label: "Звернутися по підтримку до Дениса: він здається кращим",
        nextStepId: 7,
      },
      {
        id: "C",
        label: "Вже все: розійтися, щоб не мучитись",
        nextStepId: -1,
        endingId: "END_BREAKUP",
      },
    ],
  },
  {
    id: 7,
    title: "Листопад 2017: Передостанній вибір",
    description: `
Час минає, і або ви знайдете вихід, або це кінець.
Денис майже переконав тебе, що з ним буде краще,
але хлопець каже: "Довірся ще раз". Що ж обрати?
    `,
    choices: [
      {
        id: "A",
        label: "Подумати над прощенням, дати шанс відновити довіру",
        nextStepId: 8,
      },
      {
        id: "B",
        label: "Швидше відійти до Дениса, схоже, він тебе не зрадить",
        nextStepId: 8,
      },
      {
        id: "C",
        label: "Можливо, краще бути самій, без них обох",
        nextStepId: -1,
        endingId: "END_SOLO",
      },
    ],
  },
  {
    id: 8,
    title: "Листопад 2017: Фінальний крок",
    description: `
Ось і розв'язка. Ти маєш прийняти остаточне рішення.
Вибачити йому й почати все з чистого аркуша?
Піти до Дениса, який видається надійнішим?
Чи взагалі зупинити всі ці драми й пожити самій?
    `,
    choices: [
      {
        id: "A",
        label: "Простити й відновити стосунки",
        nextStepId: -1,
        endingId: "END_FORGIVE",
      },
      {
        id: "B",
        label: "Іти до Дениса: він гарний варіант",
        nextStepId: -1,
        endingId: "END_GO_TO_DENIS",
      },
      {
        id: "C",
        label: "Все залишити: час побути незалежною",
        nextStepId: -1,
        endingId: "END_SOLO",
      },
    ],
  },
];

/** 4 Фінали */
const ENDINGS: Ending[] = [
  {
    id: "END_FORGIVE",
    title: "Фінал: Прощення",
    description: `
Ти вирішуєш дати йому шанс, пробачити ті помилки.
Кохання відчуває легкість: можливо,
це початок нової, міцнішої історії.
    `,
  },
  {
    id: "END_BREAKUP",
    title: "Фінал: Розрив",
    description: `
Ти припиняєш ці стосунки, втомившись від ревнощів
і непорозумінь. Кохання, однак, не зникає,
а лише чекає, коли твоє серце знову буде готове.
    `,
  },
  {
    id: "END_GO_TO_DENIS",
    title: "Фінал: Поруч із Денисом",
    description: `
Ти зважуєш усе й вирішуєш, що Денис зараз здається надійнішим.
Ти робиш крок йдеш до нього, залишаючи колишнього коханого з його помилками.
Однак я, Кохання, відчуваю, що ваш зв’язок із ним іще не зник повністю:
іноді, щоб почати все спочатку, потрібно відійти й дати часу залікувати рани.
Хто знає, можливо, невидима нитка між вами в майбутньому знову з’єднає ваші серця —
коли ви обоє будете готові до нового розділу.
    `,
  },
  {
    id: "END_SOLO",
    title: "Фінал: Незалежний шлях",
    description: `
Ти вирішуєш пожити самостійно, дати собі час
зцілитися й віднайти внутрішній спокій.
Кохання завжди поруч, коли ти будеш готова
до нових відкриттів і стосунків.
    `,
  },
];

function getEndingId(chosenPath: string[]): string {
  // Приклад:
  // Порахуємо, скільки разів зустрічаються A/B/C:
  const countA = chosenPath.filter((ch) => ch === "A").length;
  const countB = chosenPath.filter((ch) => ch === "B").length;
  const countC = chosenPath.filter((ch) => ch === "C").length;

  // Умовна логіка:
  // - Якщо A переважає => END_FORGIVE
  // - Якщо C > A => END_BREAKUP (якщо більше "C" ніж "A")
  // - Якщо B більше 3 => END_GO_TO_DENIS
  // - Інакше => END_SOLO
  // Це лише приклад! Змініть під свої потреби.
  if (countA > countB && countA > countC) {
    return "END_FORGIVE";
  } else if (countC > 3) {
    return "END_BREAKUP";
  } else if (countB >= 4) {
    return "END_GO_TO_DENIS";
  } else {
    return "END_SOLO";
  }
}

/**
 * LoveQuestChatWidget:
 * Віджет із 8 кроками й 4 фіналами, без дублювання першого повідомлення.
 */
function LoveQuestChatWidget () {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user);
  // Поточний крок: починаємо з 1
  const [currentStepId, setCurrentStepId] = useState<number>(1);
  // Обрані варіанти (на випадок, якщо знадобиться)
  const [chosenPath, setChosenPath] = useState<string[]>([]);
  // Якщо є фінал
  const [finalId, setFinalId] = useState<string | null>(null);

  // “Повідомлення” в чаті
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // При ініціалізації:
    // Знайдемо крок 1, одразу додамо повідомлення від Кохання
    const first = STEPS.find((s) => s.id === 1);
    return first
      ? [
        {
          role: "kohana" as const,
          content: `**${first.title}**\n\n${first.description.trim()}`,
        },
      ]
      : [];
  });

  /** Додаємо повідомлення від Кохання */
  const pushKohanaMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "kohana", content: text },
    ]);
  };

  /** Додаємо повідомлення від користувача */
  const pushUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
    ]);
  };

  /** Обробка вибору */
  const handleChoice = async (choiceId: string, label: string, nextStepId: number) => {
    // Додаємо повідомлення від user
    pushUserMessage(label);
    // Записуємо вибір
    setChosenPath(prev => [...prev, choiceId]);

    // Якщо nextStepId = -1 => фінал, але *не* вказано endingId
    if (nextStepId === -1) {
      // Обчислити фінал самостійно
      const final = getEndingId([...chosenPath, choiceId]);
      setFinalId(final);
      setCurrentStepId(-1);

      // Шукаємо у списку ENDINGS
      const endData = ENDINGS.find(e => e.id === final);
      if (endData) {
        pushKohanaMessage(`**${endData.title}**\n\n${endData.description.trim()}`);
      }
      if (id)
        await dispatch(doCompleteTask({ chatId: id ,chapter: ChaptersEnum.QUEST_2 }))
      return;
    }

    // Якщо продовжуємо гру
    setFinalId(null);
    setCurrentStepId(nextStepId);

    const step = STEPS.find(s => s.id === nextStepId);
    if (step) {
      pushKohanaMessage(`**${step.title}**\n\n${step.description.trim()}`);
    }
  };

  // Актуальний крок, якщо не фінал
  const currentStep = STEPS.find((s) => s.id === currentStepId);

  return (
    <Box
      backgroundColor="gray.100"
      boxShadow="md"
      borderRadius="md"
      p={4}
      fontSize="sm"
    >
      <Text fontWeight="bold" color="black" textAlign="center" mb={2}>
        LoveQuest 2017 (Widget)
      </Text>

      {/* "Чатове" поле */}
      <VStack
        align="stretch"
        maxH="380px"
        overflowY="auto"
        mb={3}
        bg="white"
        p={2}
        borderRadius="md"
      >
        {messages.map((msg, index) => {
          const isKohana = msg.role === "kohana";
          return (
            <Box
              key={index}
              alignSelf={isKohana ? "flex-start" : "flex-end"}
              bg={isKohana ? "blue.50" : "green.50"}
              color="black"
              p={3}
              borderRadius="md"
              maxW="80%"
              whiteSpace="pre-wrap"
            >
              <Text
                fontSize="sm"
                // Підтримка мінімального markdown:
                dangerouslySetInnerHTML={{ __html: msg.content }}
              />
            </Box>
          );
        })}
      </VStack>

      {/* Якщо не фінал, кнопки вибору */}
      {finalId === null && currentStep && (
        <VStack align="center">
          {currentStep.choices.map((c) => (
            <Button
              key={c.id}
              style={{ backgroundColor: '#0895c2' }}
              whiteSpace="normal"
              wordBreak="break-word"
              textAlign="center"
              maxW="300px"
              p="33px"
              onClick={() =>
                handleChoice(c.id, c.label, c.nextStepId)
              }
            >
              {c.id}. {c.label}
            </Button>
          ))}
        </VStack>
      )}

      {/* Якщо фінал – кнопка "Перезапустити" */}
      {finalId !== null && (
        <Box textAlign="center" mt={3}>
          <Button
            size="sm"
            color="white"
            style={{ backgroundColor: 'rgb(26, 26, 26)' }}
            onClick={() => {
              // Скидаємо стани
              setChosenPath([]);
              setFinalId(null);
              setCurrentStepId(1);
              // Відновлюємо початкове повідомлення
              const first = STEPS.find((s) => s.id === 1);
              if (first) {
                setMessages([
                  {
                    role: "kohana",
                    content: `**${first.title}**\n\n${first.description.trim()}`,
                  },
                ]);
              }
            }}
          >
            Перезапустити
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default LoveQuestChatWidget;