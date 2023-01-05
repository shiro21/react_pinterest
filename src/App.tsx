import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./styles/_reset.scss";

// Component
import { LoginRouter } from './components/login/LoginRouter';

// Guard
import { ProtectRouter } from './ProtectRouter';
import { Main } from './components/main/Main';
import { Edit } from './components/edit/Edit';
import { Pin } from './components/pin/Pin';
import { Profile } from './components/profile/Profile';

// TEST
import { Test } from './components/test/Test';
import { EditTest } from './components/edit/EditTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectRouter />}>
          <Route path="/" element={<Main />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/pin/:id" element={<Pin />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        
        <Route path="/login/*" element={<LoginRouter />} />
        <Route path="/test" element={<Test />} />
        <Route path="/file-test" element={<EditTest />} />
      </Routes>
    </Router>
  );
}

export default App;
