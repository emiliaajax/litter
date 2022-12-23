import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BaseLayout from './components/BaseLayout/BaseLayout.js'
import Explore from './components/Explore/Explore.js'
import Home from './components/Home/Home.js'
import Login from './components/Login/Login.js'
import PedigreeChart from './components/PedigreeChart/PedigreeChart.js'
import RegisterForm from './components/Register/Register.js'
import ProtectedRoutes from './ProtectedRoutes.js'

function App() {
  return (
    <Router>
      <div className="App" style={{ margin: '0 auto', maxWidth: '1200px' }}>
        <Routes>
          <Route 
            path='/login' 
            element={<Login />}
          />
          <Route 
            path='/register' 
            element={<RegisterForm />}
          />
          <Route element={<ProtectedRoutes />}>
            <Route 
              path='/' 
              element={<BaseLayout><Home /></BaseLayout>} 
              exact={true}
            />
            <Route 
              path='/explore' 
              element={<BaseLayout><Explore /></BaseLayout>} 
              exact={true}
            />
            <Route 
              path='/:id' 
              element={<BaseLayout><PedigreeChart /></BaseLayout>} 
              exact={true}
            />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
