import React from 'react'
import Temp from './component/temp'

/**
 * App Component
 * 
 * Root component of the Weather Application.
 * This component serves as the main entry point and renders the Temp component.
 * 
 * @component
 * @returns {React.ReactElement} The main application component
 * 
 * @example
 * // Basic usage
 * import App from './App';
 * 
 * ReactDOM.render(<App />, document.getElementById('root'));
 */
const App = () => {
  return (
    <>
      <Temp/>
    </>
  )
}

export default App

