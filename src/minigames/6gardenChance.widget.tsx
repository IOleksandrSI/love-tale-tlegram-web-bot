import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  HStack,
  Alert,
  useDisclosure,
} from "@chakra-ui/react";
import { doCompleteTask } from '../features/user/userSlice.ts';
import { ChaptersEnum } from '../shared/types/chapters.enum.ts';
import { useAppDispatch, useAppSelector } from '../shared/hooks/redux.hooks.ts';

/**
 * Тип для опису рослин (квіток чи бур’янів).
 */
interface Plant {
  id: string;
  name: string;
  type: "flower" | "weed";
  health?: number;    // для квіток
  strength?: number;  // для бур’янів
  color?: string;
}

const GardenChanceWidget: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user);
  // Початкові рослини: 3 квітки (символізують різні аспекти кохання), 2 бур’яни
  const [plants, setPlants] = useState<Plant[]>([
    {
      id: "f1",
      name: "Трепетна Довіра",
      type: "flower",
      color: "#f6675e", // Misty Rose
      health: 3,
    },
    {
      id: "f2",
      name: "Ніжна Надія",
      type: "flower",
      color: "#f3dc47", // LemonChiffon
      health: 3,
    },
    {
      id: "f3",
      name: "Солодкі Спогади",
      type: "flower",
      color: "#4949f8", // Lavender
      health: 3,
    },
    {
      id: "w1",
      name: "Тіні Минулого",
      type: "weed",
      color: "#003f44", // LightGray
      strength: 2,
    },
    {
      id: "w2",
      name: "Потаємні Сумніви",
      type: "weed",
      color: "#540909", // Silver
      strength: 2,
    },
  ]);

  // Кількість ходів (дій), яку має гравець
  const [turnsLeft, setTurnsLeft] = useState(5);

  // Прапорець про закінчення (коли turnsLeft = 0)
  const [isFinished, setIsFinished] = useState(false);

  // Для відображення фінального Alert
  const { onOpen } = useDisclosure();

  // Пояснювальна функція: як лише залишається 0 ходів, гра завершується
  useEffect(() => {
    if (turnsLeft <= 0 && !isFinished) {
      setIsFinished(true);
      onOpen();
      (async () => {
        if (id)
          await dispatch(doCompleteTask({ chatId: id ,chapter: ChaptersEnum.GARDEN_CHANCE_6 }))
      })();
    }
  }, [turnsLeft, isFinished, onOpen]);

  // Обробники дій:
  // 1) Полити квітку (+1 health)
  const handleWaterFlower = (plantId: string) => {
    if (isFinished) return;
    setPlants((prev) =>
      prev.map((p) => {
        if (p.id === plantId && p.type === "flower" && p.health !== undefined) {
          return { ...p, health: p.health + 1 };
        }
        return p;
      })
    );
    setTurnsLeft((prev) => prev - 1);
  };

  // 2) Додати добрива (+2 health)
  const handleFertilizeFlower = (plantId: string) => {
    if (isFinished) return;
    setPlants((prev) =>
      prev.map((p) => {
        if (p.id === plantId && p.type === "flower" && p.health !== undefined) {
          return { ...p, health: p.health + 2 };
        }
        return p;
      })
    );
    setTurnsLeft((prev) => prev - 1);
  };

  // 3) Вирвати бур’ян (strength = 0)
  const handleRemoveWeed = (plantId: string) => {
    if (isFinished) return;
    setPlants((prev) =>
      prev.map((p) => {
        if (p.id === plantId && p.type === "weed" && p.strength !== undefined) {
          return { ...p, strength: 0 };
        }
        return p;
      })
    );
    setTurnsLeft((prev) => prev - 1);
  };

  // Підрахунок loveMeter
  const calculateLoveMeter = () => {
    let sumFlowers = 0;
    let sumWeeds = 0;

    plants.forEach((p) => {
      if (p.type === "flower" && p.health !== undefined) {
        sumFlowers += p.health;
      }
      if (p.type === "weed" && p.strength !== undefined) {
        sumWeeds += p.strength;
      }
    });

    return sumFlowers - sumWeeds;
  };

  // Фінальне романтичне повідомлення
  const getFinalMessage = (): string => {
    const loveMeter = calculateLoveMeter();
    if (loveMeter >= 10) {
      return `
Вітаємо! Ти з любов’ю доглянув(ла) за “Трепетною Довірою”, “Ніжною Надією”
та “Солодкими Спогадами”. Їхній цвіт тепер яскравий і рясний, 
а “Тіні Минулого” й “Потаємні Сумніви” майже зникли.
Сад розквів чарами, а серця сповнені наснагою.
Тепер Кохання готове до найголовнішого кроку...
      `;
    } else if (loveMeter >= 5) {
      return `
Ти старанно плекав(ла) свій сад, і він уже набуває барв. 
Хоч і залишилися деякі тіні чи сумніви, але квітучі пагони надають
віру в майбутнє. Можливо, ще кілька кроків –
і ваші серця повністю готові до нового розділу.
      `;
    } else {
      return `
Сад поки що не зазнав повного розквіту: декому з квітів забракло турботи, 
а бур’яни залишились на своїх місцях. 
Можливо, ця історія потребує більше часу чи спільних зусиль,
проте попереду ще є шанс вдихнути в неї життя.
      `;
    }
  };

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <Heading size="lg" textAlign="center" mb={4}>
        Сад Другого Шансу
      </Heading>

      {!isFinished && (
        <Text mb={4} color="white" fontSize="sm">
          Перед тобою сад, де символічно зібрані моменти вашого кохання.
          У тебе є <strong>{turnsLeft}</strong> дій, аби зміцнити прекрасні квітки
          та позбутися колючих спогадів. Якщо сад розквітне,
          це означатиме, що ви обоє готові до нового етапу –
          і, можливо, до найважливішого запитання, яке от-от пролунає...
        </Text>
      )}

      {/* Список рослин */}
      <VStack align="stretch" p={3}>
        {plants.map((p) => (
          <Box
            key={p.id}
            p={3}
            borderWidth="1px"
            borderRadius="md"
            borderColor="gray.200"
            bg="white"
          >
            <HStack justify="space-between">
              <Box>
                <Text fontWeight="bold" color={ p.color || 'black' }>
                  {p.type === "flower" ? "Квітка" : "Бур’ян"}: {p.name}
                </Text>
                {p.type === "flower" ?
                  <Text fontSize="xs" color="gray.600" style={{ textAlign: 'start' }}>
                    Сила квітки (health): {p.health}
                  </Text>
                  : <Text fontSize="xs" color="gray.600" style={{ textAlign: 'start' }}>
                    Сила бур’яну (strength): {p.strength}
                  </Text>
                }
              </Box>

              {!isFinished && (
                <HStack>
                  {p.type === "flower" && p.health !== undefined && (
                    <>
                      <Button
                        size="xs"
                        style={{ backgroundColor: p.color || 'black', color: 'white' }}
                        onClick={() => handleWaterFlower(p.id)}
                      >
                        Полити
                      </Button>
                      <Button
                        size="xs"
                        style={{ backgroundColor: p.color || 'black', color: 'white' }}
                        onClick={() => handleFertilizeFlower(p.id)}
                      >
                        Добрива
                      </Button>
                    </>
                  )}
                  {p.type === "weed" &&
                    p.strength !== undefined &&
                    p.strength > 0 && (
                      <Button
                        size="xs"
                        style={{ backgroundColor: p.color || 'black', color: 'white' }}
                        onClick={() => handleRemoveWeed(p.id)}
                      >
                        Вирвати
                      </Button>
                    )}
                </HStack>
              )}
            </HStack>
          </Box>
        ))}
      </VStack>

      {/* Якщо ходи закінчились */}
      {isFinished && (
        <Alert.Root status="info" variant="subtle" mt={6}>
          <Alert.Indicator />
          <Alert.Content flex="1">
            <Alert.Title>Результат:</Alert.Title>
            <Alert.Description whiteSpace="pre-line">
              {getFinalMessage()}
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {/* Кнопка з відображенням кількості ходів */}
      {!isFinished && (
        <Box mt={4} textAlign="center">
          <Text fontSize="sm" mb={2}>
            Залишилося дій: <strong>{turnsLeft}</strong>
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default GardenChanceWidget;