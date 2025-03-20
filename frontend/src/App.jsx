import { useEffect, useState, createContext, useContext } from "react";
import { Route, Routes, Navigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { store } from "./redux/app/store.js";
import { Provider } from "react-redux";

// Pages
import Home from './pages/Home.jsx';
import Login from './pages/auth/Login.jsx';
import SignUp from './pages/auth/SignUp.jsx';
import Income from './pages/income/Income.jsx';
import Expense from './pages/expense/Expense.jsx';

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

function App() {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getAuthUser = async () => {
    try {
      const res = await axios.get("api/auth/user");
      setUser(res.data);
      setIsLoading(false);
    } catch (err) {
      setUser(null);
      setIsLoading(false);
      toast(err.response.data.error || 'something went wrong', {
        duration: 4000,
        position: 'top-right',
        type: 'error',
      });
    }
  }

  useEffect(() => {
    getAuthUser();
  }, []);

  const toggleTheme = () => {
    const isDarkMode = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDarkMode) {
      document.querySelector('html').setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.querySelector('html').setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

  useEffect(() => {
    toggleTheme();
  }, [toggleTheme]);


  if (isLoading) {
    return (
      <div className="flex dark:bg-gray-900 bg-gray-100 justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    )
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/login" element={user ? <Navigate to={"/"} /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to={"/"} /> : <SignUp />} />

          <Route path="/" element={user ? <Home /> : <Navigate to={"/login"} />} />
          <Route path="/income" element={user ? <Income /> : <Navigate to={"/login"} />} />
          <Route path="/expense" element={user ? <Expense /> : <Navigate to={"/login"} />} />
        </Routes>
      </AuthContext.Provider>
    </Provider>
  )
}

export default App
