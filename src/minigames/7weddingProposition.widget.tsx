import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";

export const WeddingProposalWidget: React.FC = () => {
  // Стан для збереження відповіді (yes/no/null)
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);

  const handleYes = () => setAnswer("yes");
  const handleNo = () => setAnswer("no");

  return (
    <Box
      minH="100vh"
      bg="gray.100"
      p={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bg="white"
        p={{ base: 4, md: 6 }}
        maxW="600px"
        w="100%"
        boxShadow="lg"
        borderRadius="md"
      >
        {/* Заголовок */}
        <Heading size="md" mb={4} textAlign="center" color="pink.600">
          Останній крок до нашої казки
        </Heading>

        {/* Текстова частина */}
        <Text textAlign="justify" color="black" mb={4}>
          Нарешті настала мить, коли кохання вирішило здійснити свій
          найсміливіший крок: вона приїхала без попередження, перетнувши
          межі страху й невпевненості. Він не одразу впізнав її, та коли
          зрозумів, – серце затріпотіло, мов птах, що рветься на волю.
        </Text>

        <Text textAlign="justify" color="black" mb={4}>
          Тієї миті всі тіні війни, сумніви й старі образи ніби розтанули
          в сяйві нового світанку. В їхніх поглядах читалося: якщо почуття
          витримало стільки викликів, воно гідне того, щоб нарешті поєднати
          ці серця назавжди. Вони вирішили одружитися, бо зрозуміли:
          справжня любов – це найбільше диво, яке варто берегти як скарб.
          Історія, що розпочалася з випадкового питання про шахи, завершується
          обітницею бути разом довіку.
        </Text>

        {/* Основне запитання */}
        <Text textAlign="center" color="black" fontWeight="bold" mb={6}>
          Чи ти згодна вирушити в нову казку зі мною?
        </Text>

        {/* Кнопки відповіді */}
        {answer === null && (
          <VStack p={2}>
            <Button style={{ backgroundColor: 'pink' }} w="full" onClick={handleYes}>
              Так
            </Button>
            <Button variant="outline" w="full" onClick={handleNo}>
              Ні
            </Button>
          </VStack>
        )}

        {/* Якщо відповіла “Так” */}
        {answer === "yes" && (
          <Box textAlign="center">
            <Text mb={4} fontWeight="semibold" color="pink.600">
              Вітаю! Ти сказала "Так"!
            </Text>
            <Text mb={4}>
              Тепер наші серця об’єднані в одну велику казку.
              Нехай цей день стане початком найщасливішої історії.
            </Text>
            <Button
              colorScheme="pink"
              onClick={() => window.location.reload()}
            >
              Почати заново
            </Button>
          </Box>
        )}

        {/* Якщо відповіла “Ні” */}
        {answer === "no" && (
          <Box textAlign="center">
            <Text mb={4} color="gray.600">
              Ой... Фотографу доведеться змонтувати фінал,
              бо всі були впевнені, що ти скажеш “Так”...
            </Text>
            <Button
              variant="outline"
              colorScheme="pink"
              onClick={() => window.location.reload()}
            >
              Почати заново
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};