// pages/ShopPage.tsx
import { FC, useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { doBuyTitle } from '../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../shared/hooks/redux.hooks.ts';
import { TitleEnum } from '../shared/types/titles.enum.ts';
import { TitleConfig } from '../shared/configs/title.config.ts';
import { TitleTypeEnum } from '../shared/types/titleType.enum.ts';
import { ToggleTip } from '../components/toggle-tip.tsx';
import { LuInfo } from 'react-icons/lu';
import { ITitleConfig } from '../shared/interfaces/titleConfig.interface.ts';

const ShopPage: FC = () => {
  const dispatch = useAppDispatch();
  const {
    titles,
    id,
  } = useAppSelector((state) => state.user);
  const [validShopTitles, setValidShopTitles] = useState<ITitleConfig[]>([]);

  useEffect(() => {
    setValidShopTitles(Object.keys(TitleConfig)
      .filter((key) => TitleConfig[key as TitleEnum].type === TitleTypeEnum.SHOP && !titles.includes(key as TitleEnum))
      .map((key) => TitleConfig[key as TitleEnum]))
  }, [titles]);

  const handleBuy = (title: TitleEnum) => {
    if (id)
      dispatch(doBuyTitle({
        chatId: id,
        title,
      }));
  };

  return (
    <Box p="2rem" maxW="900px" mx="auto">
      <Heading
        as="h1"
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        Магазин титулів
      </Heading>

      {validShopTitles.map((item) => {
        const IconEl = item.icon; // іконка з react-icons

        return (
          <Flex
            key={item.name}
            mb="1.5rem"
            alignItems="center"
            p="1rem"
            border="1px solid #ddd"
            borderRadius="md"
            style={{
              background: item.backgroundColor,
              justifyContent: 'space-between',
            }}
          >
            <Flex alignItems="center" mb="0.5rem">
              {/* Іконка */}
              <Box as={IconEl} style={{
                marginRight: '8px',
                color: item.iconColor,
                fontSize: '24px',
              }} />
              <Text fontSize="lg" fontWeight="bold">
                {item.name}
              </Text>
            </Flex>

            <ToggleTip content={item.description}>
              <Button size="xs" variant="ghost">
                <LuInfo color="black" />
              </Button>
            </ToggleTip>

            {/* Ціна, якщо вказано */}
            {item.cost && (
              <Text fontWeight="bold" style={{ margin: '0 1rem' }}>
                {item.cost}
              </Text>
            )}

            {/* Кнопка "Купити" або інша */}
            <Button
              style={{
                backgroundColor: '#FF69B4',
                color: '#fff',
                padding: '5px',
              }}
              onClick={() => handleBuy(item.same)}
            >
              Купити
            </Button>
          </Flex>
        );
      })}
    </Box>
  );
};

export default ShopPage;