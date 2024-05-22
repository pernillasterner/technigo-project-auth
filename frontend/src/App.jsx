import { Header } from "./components/Header";
import { RegistrationForm } from "./components/RegistrationForm";
import { Login } from "./components/Login";
import { UserProvider } from "./contexts/UserContext";

export const App = () => {
  return (
    <UserProvider>
      <Header />
      <main>
        <RegistrationForm />
        <Login />
      </main>
    </UserProvider>
  );
};
