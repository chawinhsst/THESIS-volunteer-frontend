import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
// import RegisterPage from './pages/RegisterPage'; // REMOVED
import AboutStudyPage from './pages/AboutStudyPage';
import VolunteerInfoPage from './pages/VolunteerInfoPage';

function App() {
  const { i18n } = useTranslation();
  const languageClass = i18n.language.startsWith('th') ? 'lang-th' : 'lang-en';

  return (
    <div className={`min-h-screen bg-transparent text-slate-800 ${languageClass}`}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* REMOVED REGISTER ROUTE */}
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          <Route path="/about-the-study" element={<AboutStudyPage />} />
          <Route path="/volunteer-information" element={<VolunteerInfoPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;