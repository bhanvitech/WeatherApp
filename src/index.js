import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

/**
 * Application Entry Point
 * 
 * This file is the main entry point for the React application.
 * It renders the App component into the DOM element with id 'root'.
 * The application is wrapped in React.StrictMode for additional development checks.
 * 
 * @see {@link https://reactjs.org/docs/strict-mode.html|React StrictMode Documentation}
 */

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
