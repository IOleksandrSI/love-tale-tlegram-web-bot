import './App.css';
import { Provider as ChakraProvider } from './components/provider.tsx';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './shared/hooks/redux.hooks.ts';
import { fetchUser } from './features/user/userSlice.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/custom/navbar.component.tsx';
import RomanticLoader from './components/custom/loader.component.tsx';
import { GameConfig } from './shared/configs/game.config.ts';
import { telegramService } from './shared/telegramService.ts';

const HomePage = lazy(() => import('./pages/homePage/home.page.tsx'));
const ProfilePage = lazy(() => import('./pages/profile.page.tsx'));
const ShopPage = lazy(() => import('./pages/shop.page.tsx'));
const NotFoundPage = lazy(() => import('./pages/notFound.page.tsx'));
const MapPage = lazy(() => import('./pages/map.page.tsx'));

function App() {
  const dispatch = useAppDispatch();

  const { availableChapters } = useAppSelector((state) => state.user);

  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (id)
      dispatch(fetchUser(id));
  }, [dispatch, id]);


  useEffect(() => {
    telegramService.ready();
    setId(telegramService?.initDataUnsafe?.user?.id || null);
  }, []);


  return (
    <ChakraProvider>
      {id ? <BrowserRouter>
        <Navbar />
        <Suspense fallback={<RomanticLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/map" element={<MapPage />} />
            {availableChapters.map((c, index) => {
              const config = GameConfig[c];
              return (<Route key={`game-${index}`} path={config.url} element={<config.Page />} />);
            })}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter> : <></>}

    </ChakraProvider>
  );
}

export default App;
