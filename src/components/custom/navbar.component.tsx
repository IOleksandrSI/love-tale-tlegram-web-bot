// components/Navbar.tsx
import { Flex, Box, Text, IconButton, HStack } from '@chakra-ui/react';
import { FiUser, FiShoppingCart } from 'react-icons/fi';
import { useAppSelector } from '../../shared/hooks/redux.hooks.ts';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';

const Navbar: FC = () => {
  // Дістаємо з Redux (userSlice) потрібну інформацію
  const { firstName, userName, coins } = useAppSelector((state) => state.user);

  return (
    <Flex
      as="nav"
      bg="blue.500"
      color="white"
      align="center"
      justify="space-between"
      px={4}
    >
      {/* Ліва частина - ім'я або логотип */}
      <Box>
        <Text fontWeight="bold" fontSize="xl">
          {firstName || userName || 'Guest'}
        </Text>
      </Box>

      {/* Права частина - іконки профілю, магазин, монети */}
      <HStack p={2}>
        {/* Поле з монетками */}
        <Box border="1px" borderColor="whiteAlpha.400" borderRadius="md">
          <Text fontSize="md">LoveCoins: {coins}</Text>
        </Box>

        {/* Іконка профілю */}
        <Link to="/profile">
          <IconButton
            aria-label="Profile"
            variant="ghost"
            style={{ color: 'white' }}
          >
            <FiUser />
          </IconButton>
        </Link>

        {/* Іконка магазину */}
        <Link to="/shop">
          <IconButton
            aria-label="Shop"
            variant="ghost"
            style={{ color: 'white' }}
          >
            <FiShoppingCart />
          </IconButton>
        </Link>

        {/* Іконка гри */}
        <Link to="/map">
          <IconButton
            aria-label="Map"
            variant="ghost"
            style={{ color: 'white' }}
          >
            <FaMapMarkedAlt />
          </IconButton>
        </Link>
      </HStack>
    </Flex>
  );
};

export default Navbar;