import { Route, Routes } from 'react-router-dom'
import AddProjectPageBody from './components/AddProjectPageBody'
import AddUserPageBody from './components/AddUserPageBody'
import HomePageBody from './components/HomePageBody'
import LoginPageBody from './components/LoginPageBody'
import PrivacyPageBody from './components/PrivacyPageBody'
import RegisterPageBody from './components/RegisterPageBody'
import TimeRegisterPageBody from './components/TimeRegisterPageBody'
import CustomPage from './pages/CustomPage'
import GetDataPage from './pages/GetDataPage'
import './styles/site.css'

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <CustomPage>
              <HomePageBody />
            </CustomPage>
          }
        />
        <Route
          path="/Privacy"
          element={
            <CustomPage>
              <PrivacyPageBody />
            </CustomPage>
          }
        />
        {/* <Route
          path="/Register"
          element={
            <CustomPage>
              <RegisterPageBody />
            </CustomPage>
          }
        /> */}
        <Route
          path="/Login"
          element={
            <CustomPage>
              <LoginPageBody />
            </CustomPage>
          }
        />
        <Route
          path="/AddUser"
          element={
            <CustomPage>
              <AddUserPageBody />
            </CustomPage>
          }
        />
        <Route
          path="/TimeRegister"
          element={
            <CustomPage>
              <TimeRegisterPageBody />
            </CustomPage>
          }
        />
        <Route
          path="/AddProject"
          element={
            <CustomPage>
              <AddProjectPageBody />
            </CustomPage>
          }
        />
        <Route path="/GetData" element={<GetDataPage />} />
      </Routes>
      <div className="modal-backdrop fade hidden"></div>
    </>
  )
}

export default App
