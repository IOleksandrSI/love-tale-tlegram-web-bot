import './App.css';
import { Provider as ChakraProvider } from './components/provider.tsx';
// import GardenChanceWidget from './widgets/game6/gardenChance.widget.tsx';
// import LoveQuestChatWidget from './widgets/quest.widget.tsx';
// import PuzzleHeart from './widgets/game3/puzzle.widget.tsx';
// import WayWidget from './widgets/game4/way.widget.tsx';
// import { MagicWidget } from './widgets/game5/magic.widget.tsx';
// import ChessGame from './widgets/chessGame.widget.tsx';
import { useEffect } from 'react';
import { telegramService } from './shared/telegramService.ts';
import { Box, Code } from '@chakra-ui/react';


function App() {
  useEffect(() => {
    telegramService.ready();
  }, []);


  return (
    <ChakraProvider>
      test 1;
      <Box>
        <Code>
          {JSON.stringify(telegramService)}
        </Code>
      </Box>
    </ChakraProvider>
  );
}

export default App;
