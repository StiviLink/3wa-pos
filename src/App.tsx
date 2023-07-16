import React from "react"
import './App.css'
import ReduxProvider from './redux/redux-provider'
import {AuthProvider} from "./auth/context-amplify/auth-provider"
import {AuthConsumer} from "./auth/context-amplify/auth-consumer"
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
          <AuthProvider>
              <ReduxProvider>
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
                                      <BrowserRouter>
                                          <AuthConsumer>
                                              <Router />
                                          </AuthConsumer>
                                      </BrowserRouter>
                                  </SnackbarProvider>
                              </MotionLazy>
                          </ThemeProvider>
                      </SettingsProvider>
                  </LocalizationProvider>
              </ReduxProvider>
          </AuthProvider>
      </>
  )
}

export default App
