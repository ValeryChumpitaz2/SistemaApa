import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'


import {
AuthProvider
} from "./auth/AuthContext.jsx"


import {
ThemeProvider
} from "./context/ThemeContext.jsx"



ReactDOM.createRoot(
document.getElementById('root')
).render(


<ThemeProvider>


<AuthProvider>


<App />


</AuthProvider>


</ThemeProvider>


)