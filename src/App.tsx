import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import {Provider} from './components/provider.tsx';
import {Button, HStack} from '@chakra-ui/react';
// import {useEffect} from 'react';
// import {telegramService} from './shared/telegramService.ts';


function App() {
  // useEffect(() => {
  //   telegramService.ready();
  // }, [])
  //
  // const onClose = () => {
  //   telegramService.close();
  // }


  return (
    <Provider>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <HStack>
        {/*<Button onClick={onClose}>Click me</Button>*/}
        <Button>Click me</Button>
      </HStack>
    </Provider>
  )
}

export default App
