import { useState, useEffect } from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap'
import NavBar from './components/NavBar';
import CarouselHero from './components/CarouselHero';
import Dashboard from './components/Dashboard';
import BlogPage from './components/BlogPage';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const App = () => {

  const [isDarkMode, setIsDarkMode] = useState(true);
  const[user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData)
    setIsLoggedIn(true); //trigger rerender

  }

  useEffect(() => {
    
    const currentTheme = localStorage.getItem('theme');
    if(currentTheme)
    {
      setIsDarkMode(currentTheme === 'dark')
    }
    
  }, [])

  useEffect(() => {
    
    document.body.className = isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

  }, [isDarkMode])
  
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  }

  useEffect(() => {
    
    const storedUser = localStorage.getItem("UserData");
    if(storedUser){
      let Userstored = JSON.parse(storedUser);
      setUser(Userstored);
    }

  }, [])
  

  return (
    <>
        <BrowserRouter>
          <Container fluid
            className= {`${isDarkMode ? 'bg-dark text-light' : 'bg-light'}`}
            style={{ minHeight: "100vh", padding: '0px' }}
          >
              <Container className='p-0' fluid>
              <NavBar  isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              </Container>
              <CarouselHero isDarkMode={isDarkMode} />
              <Row className='text-center'>
                <Col>
                    <h1>Our Blog</h1>
                </Col>
                <Routes>
                  <Route path="/" element={<BlogPage/>} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/CreateAccount" element={<CreateAccount/>} />
                  <Route path="/Dashboard" element={<Dashboard isDarkMode={isDarkMode} onLogin={handleLogin}/>} />
                </Routes>

                
              </Row>
          
          </Container>
        </BrowserRouter>
    </>
  )
}

export default App
