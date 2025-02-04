// pages/ProfilePage.tsx
import React, { useState } from 'react';
import { Badge, Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useAppSelector } from '../shared/hooks/redux.hooks.ts';
import { TitleConfig } from '../shared/configs/title.config.ts';
import { TitleEnum } from '../shared/types/titles.enum.ts';
import { Avatar } from '../components/avatar.tsx';
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle } from '../components/dialog.tsx';
import { GameConfig } from '../shared/configs/game.config.ts';
import { telegramService } from '../shared/telegramService.ts';

const ProfilePage: React.FC = () => {
  const user = useAppSelector((state) => state.user); // або будь-який ваш спосіб

  // local state для “активного” титулу, який показуємо у вікні
  const [selectedTitle, setSelectedTitle] = useState<TitleEnum | null>(null);

  if (!user) {
    return <Text>Завантаження профілю...</Text>;
  }

  const {
    firstName,
    userName,
    coins,
    titles,
    availableChapters,
  } = user;

  // При кліці на бейдж запам’ятовуємо, який титул треба показати
  const handleBadgeClick = (titleKey: TitleEnum) => {
    setSelectedTitle(titleKey);
  };

  // Функція для закриття діалогу, коли користувач натискає "Закрити" або фон
  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedTitle(null);
    }
  };

  // Якщо обрано титул, витягуємо його налаштування
  const selectedTitleConfig = selectedTitle ? TitleConfig[selectedTitle] : null;

  return (
    <Box p={6} maxW="800px" mx="auto">
      {/* Заголовок сторінки */}
      <Heading as="h1" mb={4} style={{ textAlign: 'center' }}>
        Профіль
      </Heading>

      {/* Блок з основною інфою про користувача */}
      <Flex
        alignItems="center"
        mb={6}
        p={4}
        border="1px solid #ddd"
        borderRadius="md"
        style={{ backgroundColor: '#f9f9f9' }}
      >
        <Avatar
          name={firstName || userName}
          size="lg"
          src={telegramService?.initDataUnsafe?.user?.photo_url || undefined}
          mr={4}
        />
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            {firstName || userName}
          </Text>
          <Text fontSize="md">Монети: {coins}</Text>
        </Box>
      </Flex>

      {/* Титули користувача */}
      <Heading as="h2" size="md" mb={2}>
        Мої титули:
      </Heading>
      {titles.length === 0 ? (
        <Text fontStyle="italic" mb={6}>
          Немає титулів
        </Text>
      ) : (
        <Flex wrap="wrap" gap="0.5rem" mb={6}>
          {titles.map((titleKey) => {
            const conf = TitleConfig[titleKey];
            if (!conf) return null;

            const IconEl = conf.icon; // іконка з react-icons

            return (
              <Badge
                key={titleKey}
                px={2}
                py={1}
                borderRadius="md"
                cursor="pointer"
                onClick={() => handleBadgeClick(titleKey)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: conf.backgroundColor,
                  color: conf.iconColor,
                  fontWeight: 'bold',
                }}
              >
                {/* Іконка */}
                <Box as={IconEl} style={{ marginRight: '6px' }} />
                {conf.name}
              </Badge>
            );
          })}
        </Flex>
      )}

      {/* Доступні глави */}
      <Heading as="h2" size="md" mb={2}>
        Доступні глави:
      </Heading>
      {availableChapters.length === 0 ? (
        <Text fontStyle="italic">Немає доступних глав</Text>
      ) : (
        <Flex wrap="wrap" gap="0.5rem">
          {availableChapters.map((chapter) => (
            <Badge
              key={chapter}
              px={2}
              py={1}
              borderRadius="md"
              style={{
                backgroundColor: '#EEEAFD',
                color: '#5D3FD3',
                fontWeight: 'bold',
              }}
            >
              {GameConfig[chapter].chapterTitle}. {GameConfig[chapter].questName}
            </Badge>
          ))}
        </Flex>
      )}

      {/* ----------------- Модальне вікно (Dialog) ----------------- */}
      <DialogRoot
        open={!!selectedTitle}
        onOpenChange={() => handleDialogOpenChange(true)}
        onInteractOutside={() => handleDialogOpenChange(false)}
      >
        {/*
          Нам не потрібен DialogTrigger для відкриття,
          бо ми викликаємо setSelectedTitle у handleBadgeClick.
          Але сам компонент Dialog вимагає нащадка DialogContent.
        */}

        {selectedTitleConfig && (
          <DialogContent p={2} style={{ background: selectedTitleConfig.backgroundColor, margin: '0 2rem', marginTop: '35vh' }}>
            <DialogHeader>
              <DialogTitle>
                {/* Іконка + Назва */}
                <Flex alignItems="center">
                  <Box
                    as={selectedTitleConfig.icon}
                    style={{
                      marginRight: '8px',
                      color: selectedTitleConfig.iconColor,
                      fontSize: '24px',
                    }}
                  />
                  {selectedTitleConfig.name}
                </Flex>
              </DialogTitle>
            </DialogHeader>

            <DialogBody>
              <Text mb={3} whiteSpace="pre-line">
                {selectedTitleConfig.description}
              </Text>
              {/* Якщо в титулу вказана ціна */}
              {selectedTitleConfig.cost && (
                <Text fontWeight="bold">
                  Ціна: {selectedTitleConfig.cost} монет
                </Text>
              )}
            </DialogBody>

            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button p={2} onClick={() => handleDialogOpenChange(false)} variant="outline" style={{
                  marginRight: '8px',
                  background: selectedTitleConfig.iconColor,
                  color: selectedTitleConfig.backgroundColor,
                }}>
                  Закрити
                </Button>
              </DialogActionTrigger>
            </DialogFooter>

            {/* Цей елемент зазвичай закриває діалог,
                якщо він "плаває" в іншому місці контенту.
                У вашому коді може бути інакше,
                або можна покласти у DialogHeader, щоб зробити "Х". */}
            <DialogCloseTrigger onClick={() => handleDialogOpenChange(false)} />
          </DialogContent>
        )}
      </DialogRoot>
    </Box>
  );
};

export default ProfilePage;