import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'

import { Theme } from './layout/types.ts';

import App from './App.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>
)



function Main() {
  const [theme, setTheme] = useState<Theme>('dark')

  const handleTheme = (): void => {
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
  }

  return (
    <BrowserRouter>
      <NextUIProvider>
        <main className={theme + ' text-foreground bg-background'}>
          <Switch defaultSelected size="sm" className='absolute bottom-5 right-5 z-10' onClick={handleTheme}>{theme}</Switch>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/" element={<App />} />
            </Routes>
        </main>
      </NextUIProvider>
    </BrowserRouter>
  )
}

