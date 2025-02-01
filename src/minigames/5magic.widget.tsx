import { useState, FC } from 'react';

/** Тип для ключів */
type ScoreKey = "calm" | "confidence" | "dreams" | "forgiveness";

/** Тип для об'єкта з балами */
type Scores = Record<ScoreKey, number>;

export interface IMagicWidget {
  submit?: () => Promise<void>
}

/**
 * ГОЛОВНИЙ КОМПОНЕНТ "MagicWidget"
 * ---------------------------------
 * Містить усю логіку переходів між "екранами" (Welcome, HallOfCalmness, ...)
 * та фінального екрану (FinalScreen).
 */
export const MagicWidget: FC<IMagicWidget> = ({ submit }) => {
  // Стан, що зберігає поточний "екран" (0..5)
  const [stage, setStage] = useState<number>(0);

  // Стан, який містить "бали" за різними критеріями
  const [scores, setScores] = useState<Scores>({
    calm: 0,
    confidence: 0,
    dreams: 0,
    forgiveness: 0,
  });

  // Перехід на наступний "екран"
  const nextStage = async () => {
    setStage((prev) => prev + 1);
    if (stage && stage === 4 && submit) {
      await submit();
    }
  };

  // Функція для оновлення балів
  const updateScores = (type: ScoreKey, amount: number) => {
    setScores((prev) => ({ ...prev, [type]: prev[type] + amount }));
  };

  // Обчислення відсотка прогресу (усього 6 стадій: stage=0..5)
  const progressPercent = (stage / 5) * 100;

  // Inline-стилі для контейнерів
  const containerStyle: React.CSSProperties = {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f8f8f8",
    padding: "16px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    color: "#151515",
  };

  const contentStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "480px",
    backgroundColor: "white",
    borderRadius: "6px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    padding: "16px",
    textAlign: "center",
    color: "#151515",
  };

  const progressBarContainerStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#e0e0e0",
    height: "8px",
    borderRadius: "4px",
    marginBottom: "16px",
    color: "#151515",
  };

  const progressBarStyle: React.CSSProperties = {
    width: `${progressPercent}%`,
    backgroundColor: "#ff90b3", // Ніжно-рожевий
    height: "100%",
    color: "#151515",
    borderRadius: "4px",
  };

  return (
    <div style={containerStyle}>
      <div style={{ width: "100%", maxWidth: "680px" }}>
        {/* Прогрес-бар */}
        <div style={progressBarContainerStyle}>
          <div style={progressBarStyle} />
        </div>

        {/* Основний контейнер із контентом */}
        <div style={contentStyle}>
          {stage === 0 && <WelcomeScreen onNext={nextStage} />}
          {stage === 1 && (
            <HallOfCalmness onNext={nextStage} updateScores={updateScores} />
          )}
          {stage === 2 && (
            <HallOfConfidence onNext={nextStage} updateScores={updateScores} />
          )}
          {stage === 3 && (
            <HallOfDreams onNext={nextStage} updateScores={updateScores} />
          )}
          {stage === 4 && (
            <HallOfForgiveness onNext={nextStage} updateScores={updateScores} />
          )}
          {stage === 5 && <FinalScreen scores={scores} />}
        </div>
      </div>
    </div>
  );
};

/* -----------------------------------------------------------------------------
   КОМПОНЕНТИ ЕКРАНІВ (Welcome, HallOfCalmness, ...)
   -----------------------------------------------------------------------------*/

/** Пропси для екрану, де потрібен onNext і updateScores */
interface HallProps {
  onNext: () => void;
  updateScores: (type: ScoreKey, amount: number) => void;
}

/** Пропси для фінального екрану */
interface FinalProps {
  scores: Scores;
}

/** Привітальний екран */
const WelcomeScreen: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <h2 style={{ marginBottom: "12px" }}>Вітаю, люба Наречено!</h2>
      <p style={{ marginBottom: "16px" }}>
        Я – Кохання, і сьогодні звертаюся до тебе від імені твоєї коханої людини.
        Запрошую тебе у невеличку подорож, яка допоможе відновити твоє серце
        після всіх випробувань. Нехай цей шлях покаже тобі твою справжню силу.
      </p>
      <button
        style={buttonStyle("#ff70a0")}
        onClick={onNext}
      >
        Розпочати пригоди
      </button>
    </div>
  );
};

/** Зала Спокою */
const HallOfCalmness: React.FC<HallProps> = ({ onNext, updateScores }) => {
  const [step, setStep] = useState(0);

  const nextLocal = () => setStep((prev) => prev + 1);

  return (
    <div style={{ marginBottom: "16px" }}>
      {step === 0 && (
        <div>
          <h3>Зала Спокою</h3>
          <p style={{ marginBottom: "16px" }}>
            Вона допоможе тобі зняти тривогу й відчути внутрішню гармонію. Уяви,
            що тут літають білі хмарки, які символізують зайві переживання.
          </p>
          <button
            style={buttonStyle("#5981f3")}
            onClick={() => {
              updateScores("calm", 5);
              nextLocal();
            }}
          >
            Розвіяти хмарки тривоги
          </button>
        </div>
      )}

      {step === 1 && (
        <div>
          <p style={{ marginBottom: "16px" }}>
            Відчуваєш, як стає легше? Обери для себе один із методів розслаблення:
          </p>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
            <button
              style={buttonStyle("transparent", "#5981f3")}
              onClick={() => {
                updateScores("calm", 10);
                nextLocal();
              }}
            >
              Дихальна вправа
            </button>
            <button
              style={buttonStyle("transparent", "#5981f3")}
              onClick={() => {
                updateScores("calm", 7);
                nextLocal();
              }}
            >
              Спокійна музика
            </button>
            <button
              style={buttonStyle("transparent", "#5981f3")}
              onClick={() => {
                updateScores("calm", 8);
                nextLocal();
              }}
            >
              Теплі слова підтримки
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p style={{ marginBottom: "16px" }}>
            Прекрасно! Ти успішно заспокоїлася і готова йти далі.
          </p>
          <button style={buttonStyle("#ff70a0")} onClick={onNext}>
            Далі
          </button>
        </div>
      )}
    </div>
  );
};

/** Зала Впевненості */
const HallOfConfidence: React.FC<HallProps> = ({ onNext, updateScores }) => {
  const [step, setStep] = useState(0);

  const nextLocal = () => setStep((prev) => prev + 1);

  return (
    <div style={{ marginBottom: "16px" }}>
      {step === 0 && (
        <div>
          <h3>Зала Впевненості</h3>
          <p style={{ marginBottom: "16px" }}>
            Подивися у чарівне дзеркало. Згадай, які чудові якості ти маєш.
          </p>
          <button
            style={buttonStyle("#9b59b6")}
            onClick={() => {
              updateScores("confidence", 5);
              nextLocal();
            }}
          >
            Назвати свої сильні сторони
          </button>
        </div>
      )}

      {step === 1 && (
        <div>
          <p style={{ marginBottom: "16px" }}>
            Тепер почуй “Голос сумніву”, який намагається тебе знецінити. Як
            відповіси?
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              style={buttonStyle("transparent", "#9b59b6")}
              onClick={() => {
                updateScores("confidence", 10);
                nextLocal();
              }}
            >
              Спокійний контраргумент
            </button>
            <button
              style={buttonStyle("transparent", "#9b59b6")}
              onClick={() => {
                updateScores("confidence", 8);
                nextLocal();
              }}
            >
              Мотивувальна фраза
            </button>
            <button
              style={buttonStyle("transparent", "#9b59b6")}
              onClick={() => {
                updateScores("confidence", 6);
                nextLocal();
              }}
            >
              Гумористичний жарт
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p style={{ marginBottom: "16px" }}>
            Твої сумніви відступили! Час іти далі.
          </p>
          <button style={buttonStyle("#ff70a0")} onClick={onNext}>
            Далі
          </button>
        </div>
      )}
    </div>
  );
};

/** Зала Мрій */
const HallOfDreams: React.FC<HallProps> = ({ onNext, updateScores }) => {
  const [step, setStep] = useState(0);

  const nextLocal = () => setStep((prev) => prev + 1);

  return (
    <div style={{ marginBottom: "16px" }}>
      {step === 0 && (
        <div>
          <h3>Зала Мрій</h3>
          <p style={{ marginBottom: "16px" }}>
            Згадай про свої бажання, про те, що надихає. Уяви чарівне “Колесо
            Мрій”, яке тобі треба оживити.
          </p>
          <button
            style={buttonStyle("#FFA300")}
            onClick={() => {
              updateScores("dreams", 5);
              nextLocal();
            }}
          >
            Повернути фарби мріям
          </button>
        </div>
      )}

      {step === 1 && (
        <div>
          <p style={{ marginBottom: "16px" }}>
            Тепер захисти свої мрії від тіней сумнівів, щоб вони не згасли!
          </p>
          <button
            style={buttonStyle("#FFA300")}
            onClick={() => {
              updateScores("dreams", 10);
              nextLocal();
            }}
          >
            Відганяти тіні
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <p style={{ marginBottom: "16px" }}>
            Чудово! Твої мрії залишилися яскравими. Прямуй далі!
          </p>
          <button style={buttonStyle("#ff70a0")} onClick={onNext}>
            Далі
          </button>
        </div>
      )}
    </div>
  );
};

/** Зала Прощення */
const HallOfForgiveness: React.FC<HallProps> = ({ onNext, updateScores }) => {
  const [step, setStep] = useState(0);

  const nextLocal = () => setStep((prev) => prev + 1);

  return (
    <div style={{ marginBottom: "16px" }}>
      {step === 0 && (
        <div>
          <h3>Зала Прощення</h3>
          <p style={{ marginBottom: "16px" }}>
            Уяви важкий мішок із камінцями образ і болю. Скинь їх у прірву,
            щоби звільнити своє серце.
          </p>
          <button
            style={buttonStyle("#1abc9c")}
            onClick={() => {
              updateScores("forgiveness", 10);
              nextLocal();
            }}
          >
            Позбутися “каменів”
          </button>
        </div>
      )}

      {step === 1 && (
        <div>
          <p style={{ marginBottom: "16px" }}>
            Кому ти хочеш пробачити насамперед?
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              style={buttonStyle("transparent", "#1abc9c")}
              onClick={() => {
                updateScores("forgiveness", 10);
                nextLocal();
              }}
            >
              Собі
            </button>
            <button
              style={buttonStyle("transparent", "#1abc9c")}
              onClick={() => {
                updateScores("forgiveness", 10);
                nextLocal();
              }}
            >
              Тій людині, яка завдала болю
            </button>
            <button
              style={buttonStyle("transparent", "#1abc9c")}
              onClick={() => {
                updateScores("forgiveness", 10);
                nextLocal();
              }}
            >
              Обом (і собі, і їй)
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p style={{ marginBottom: "16px" }}>
            Твоє серце звільнене від важкої ноші. Тепер можна рухатися далі.
          </p>
          <button style={buttonStyle("#ff70a0")} onClick={onNext}>
            Далі
          </button>
        </div>
      )}
    </div>
  );
};

/** Фінальний екран */
const FinalScreen: React.FC<FinalProps> = ({ scores }) => {
  // Підрахунок загального балу
  const totalScore =
    scores.calm + scores.confidence + scores.dreams + scores.forgiveness;

  let finalMessage = "";
  if (totalScore < 40) {
    finalMessage =
      "Ти зробила перші кроки до відновлення. Не спиняйся, усе тільки починається!";
  } else if (totalScore < 70) {
    finalMessage =
      "Ти відчула у собі силу! Залікувавши рани, ти стаєш дедалі міцнішою.";
  } else {
    finalMessage =
      "Ти, мов Фенікс, відродилася з попелу! І нехай ця сила веде тебе далі.";
  }

  return (
    <div style={{ marginBottom: "16px" }}>
      <h3 style={{ marginBottom: "12px" }}>Вітаю, люба Наречено!</h3>
      <p style={{ marginBottom: "16px" }}>
        Ти пройшла всі Зали та зробила важливий крок назустріч власному щастю.
      </p>
      <p style={{ marginBottom: "16px" }}>
        Твій підсумковий бал: <strong>{totalScore}</strong>
      </p>
      <p style={{ marginBottom: "16px" }}>{finalMessage}</p>
      <p style={{ marginBottom: "16px", fontWeight: "bold", color: "#ff70a0" }}>
        “Я, Кохання, і твій наречений вдячні тобі за те, що ти є. Хай це
        переродження стане початком нового етапу нашого спільного щастя!”
      </p>
      <button
        style={buttonStyle("#ff70a0")}
        onClick={() => window.location.reload()}
      >
        Пройти ще раз
      </button>
    </div>
  );
};

/*
  Додаткова допоміжна функція для стилізації кнопок.
  Можна адаптувати кольори/градієнти за потреби.
*/
function buttonStyle(
  bgColor: string = "#ccc",
  borderColor: string = "transparent"
): React.CSSProperties {
  return {
    backgroundColor: bgColor,
    color: "#151515",
    border: borderColor !== "transparent" ? `1px solid ${borderColor}` : "none",
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  };
}