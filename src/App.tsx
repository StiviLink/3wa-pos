import React from "react";
import './App.css'
import ReduxProvider from './redux/redux-provider'
import { BrowserRouter } from 'react-router-dom'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import ThemeProvider from "./theme"
import SettingsProvider from "./components/settings/context/settings-provider"
import SettingsDrawer from "./components/settings/drawer/settings-drawer"
import MotionLazy from "./components/animate/motion-lazy"
import SnackbarProvider from "./components/snackbar/snackbar-provider"
import ProgressBar from "./components/progress-bar"
import Router from "./routes/sections"

const App = () => {
  return (
      <>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SettingsProvider
              defaultSettings={{
                themeMode: 'light', // 'light' | 'dark'
                themeDirection: 'ltr', //  'rtl' | 'ltr'
                themeContrast: 'default', // 'default' | 'bold'
                themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: false,
              }}
          >
            <ThemeProvider>
              <MotionLazy>
                <SnackbarProvider>
                  <SettingsDrawer />
                  <ProgressBar />
                  <ReduxProvider>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                  </ReduxProvider>
                </SnackbarProvider>
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </>
  )
}

export default App
