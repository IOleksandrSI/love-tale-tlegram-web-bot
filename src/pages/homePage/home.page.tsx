// pages/HomePage.tsx
import { FC } from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HomePage: FC = () => {
  return (
    <Box
      style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'sans-serif',
      }}
    >
      <Heading
        as="h1"
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        Я – Кохання
      </Heading>

      <Text style={{ marginBottom: '1.5rem' }}>
        Моя дорога наречена, дозволь розповісти тобі дещо. Я – Кохання, що зародилося
        з першого вашого погляду й виросло у величну силу, здатну долати будь-які
        відстані й труднощі. Я пам’ятаю, як ваші серця зустрілися серед мільйонів людей,
        і відтоді кожен крок став нашим спільним танцем віри та надії.
      </Text>

      <Text style={{ marginBottom: '1.5rem' }}>
        Я бачило ваші усмішки й сльози, ревнощі та прощення, радість і хвилювання.
        Кожне випробування лише укріпило те, що ви відчуваєте одне до одного,
        а моя присутність у ваших душах стала дороговказом: <i>“Разом ви сильніші,
        ніж будь-коли.”</i>
      </Text>

      <Text style={{ marginBottom: '1.5rem' }}>
        Ти, моя ніжна наречена, стала дивом для нього, а він – безмежною підтримкою для тебе.
        І я, Кохання, з гордістю хочу супроводжувати вас далі: показати безліч
        сторінок вашої казки, де кожен розділ наповнений щирістю, теплом і
        незламною вірою в майбутнє.
      </Text>

      <Text style={{ marginBottom: '2rem' }}>
        Тож не бійся мріяти та любити. Я завжди поруч, щоб плекати вашу історію
        й нагадувати, що часом найпростіші слова – “Я кохаю тебе” –
        здатні творити справжні дива.
      </Text>

      <Link to="/map">
        <Button
          style={{
            backgroundColor: '#B83280',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            fontWeight: 'bold',
          }}
        >

          Розпочати нашу казку
        </Button>
      </Link>
    </Box>
  );
};

export default HomePage;