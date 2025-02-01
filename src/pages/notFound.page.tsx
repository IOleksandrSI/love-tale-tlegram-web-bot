import { FaHandHoldingHeart } from 'react-icons/fa';
import { Box, Em, Heading, Icon, Text } from '@chakra-ui/react';
import { FC } from 'react';


const NotFoundPage: FC = () => {
  return (
    <Box
      style={{
        textAlign: 'center',
        marginTop: '50px',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      <Heading style={{ color: '#d81b60' }}>Ох, серденько...</Heading>
      <Text style={{
        fontSize: '1.2rem',
        color: '#444',
        textAlign: 'center',
      }}>
        Ніби запах весни розвіявся у повітрі, <br />
        а сторінку, яку ти шукаєш, нам не судилося віднайти. <br />
        Можливо, вона блукає поміж зорями й чекає на наше повернення...
      </Text>

      <Icon as={FaHandHoldingHeart} fontSize="4xl" />

      <Text style={{
        marginTop: '30px',
        color: '#a52a2a',
        textAlign: 'center',
      }}>
        <Em>Спробуй повернутися назад або знайти іншу омріяну сторінку.</Em>
      </Text>
    </Box>
  );
};

export default NotFoundPage;