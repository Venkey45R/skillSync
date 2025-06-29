import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Details from './components/Details';
import Role_Details from './components/Role_Details';
import Creator_details from './components/Creator_details';
import ContributorHome from './components/ContributorHome';
import CreatorHome from './components/CreatorHome';
import ProjectForm from './components/ProjectForm';
import OwnProjectListing from './components/OwnProjectListing';
import ProjectListing from './components/ProjectListing';
import ApplyProject from './components/ApplyProject';
import MyApplications from './components/MyApplications';
import ReceivedApplications from './components/ReceivedApplications';
import Contributors from './components/Contributors';
import MyProjects from './components/MyProjects';
import Tasks from './components/Tasks';
function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/details' element={<Details />} />
          <Route path='/role-specific' element={<Role_Details />} />
          <Route path='/creator-details' element={<Creator_details />} />
          <Route path='/creator-home' element={<CreatorHome />} />
          <Route path='/contributor-home' element={<ContributorHome />} />
          <Route path='/create' element={<ProjectForm />} />
          <Route path='/projects' element={<OwnProjectListing />} />
          <Route path='/find' element={<ProjectListing />} />
          <Route path='/apply' element={<ApplyProject />} />
          <Route path='/my-applications' element={<MyApplications />} />
          <Route path='/applications' element={<ReceivedApplications />} />
          <Route path='/contributors' element={<Contributors />} />
          <Route path='/my-projects' element={<MyProjects />} />
          <Route path='/tasks' element={<Tasks />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
