import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BaseLayout from './components/BaseLayout/BaseLayout.js'
import Home from './components/Home/Home.js'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path='/' 
            element={<BaseLayout><Home /></BaseLayout>} 
            exact={true}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
