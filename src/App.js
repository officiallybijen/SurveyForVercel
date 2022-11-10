import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import CreateForm from './pages/CreateForm';
import Homepage from './pages/Homepage';
import './App.css'
import ResultAnalysis from './components/resultAnalysis';
import MainSurvey from './components/MainSurvey';
import SingleForm from './components/SingleForm';
import Answer from './components/answer';
import AnswerPage from './components/answerpage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-form" element={<CreateForm />} />
        <Route path="/analysis" element={<ResultAnalysis />} />
        <Route path="/survey" element={<MainSurvey />} />
        <Route path="/survey/:testvalue" element={<SingleForm />} />

        <Route path="/answer" element={<Answer />} />
        <Route path="/answer/:testvalue" element={<AnswerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
