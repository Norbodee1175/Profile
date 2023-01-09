import { Routes, Route } from 'react-router-dom'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Layout } from './components/Layout'
import { RequireAuth } from './components/RequireAuth'
import { Unauthorized } from './components/Unauthorized'
import { Home } from './pages/Home'
import { AdminProfile } from './pages/AdminProfile'
import { Report } from './pages/Report'
import { Dashboard } from './pages/Dashboard'
import { MemoryGame } from './games/MemoryGame/MemoryGame'
import { MineSweeper } from './games/MineSweeper/MineSweeper'

import { Personal } from './pages/Personal'
import { Education } from './pages/Education'
import { Profile } from './pages/Profile'
import { Experience } from './pages/Experience'

import Github from './github/github'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>

        <Route path='/Login' element={<Login/>}/>

        <Route element={<RequireAuth allowedRoles={["Emperors", "Warlords", "Rookies"]}/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/Unauthorized' element={<Unauthorized/>}/>
          <Route path='/:id' element={<p>Website name is not correct</p>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/Report' element={<Report/>}/>

          <Route path='/Github' element={<Github/>}/>

        </Route>

        <Route element={<RequireAuth allowedRoles={["Emperors"]}/>}>
          <Route path='/AdminProfile' element={<AdminProfile/>}/>
          <Route path='/AdminProfile/Register' element={<Register/>}/>
          <Route path='/MemoryGame' element={<MemoryGame/>}/>
          <Route path='/MineSweeper' element={<MineSweeper/>}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={["Emperors", "Warlords"]}/>}>
          <Route path='/Personal' element={<Personal/>}/>
          <Route path='/Experience' element={<Experience/>}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={["Emperors", "Rookies"]}/>}>
          <Route path='/Education' element={<Education/>}/>
          <Route path='/Profile' element={<Profile/>}/>
        </Route>

      </Route>
    </Routes>
  )
}

export default App