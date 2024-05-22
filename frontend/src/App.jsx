import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { RegistrationForm } from "./components/RegistrationForm";
import { Login } from "./components/Login";
import { Play } from "./components/Play";
import { Math } from "./components/Games/Math";
import { Swedish } from "./components/Games/Swedish";
import { English } from "./components/Games/English";
import { Progress } from "./components/MyProgress";
import { WelcomeText } from "./components/WelcomeText";
import { UserProvider } from "./contexts/UserContext";

export const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<WelcomeText />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/play" element={<Play />} />
            <Route path="/play/math" element={<Math />} />
            <Route path="/play/swedish" element={<Swedish />} />
            <Route path="/play/english" element={<English />} />
            <Route path="/myprogress" element={<Progress />} />
          </Routes>
        </main>
      </UserProvider>
    </BrowserRouter>
  );
};
