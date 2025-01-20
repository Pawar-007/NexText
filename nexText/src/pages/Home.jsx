import React, { useState } from 'react';
import { Box, Container, Text } from '@chakra-ui/react';
import './Home.css'
import Signup from '../component/authentication/Signup.jsx';
import Login from '../component/authentication/Login.jsx';
const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #ddd',
    padding: '20px',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px 20px',
    backgroundColor: '#f0f0f0',
    color:'black',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  activeTab: {
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  content: {
    marginTop: '20px',
  },
};



function Home() {
  const [activeTab, setActiveTab] = useState('login'); // Define the activeTab state

  return (
    <Container  maxW={"xl"} centerContent>
      <Box
        d="flex"
        justifyContent='center'
        p={3}
        bg={"white"}
        m="40px 0 15px 0"
        borderRadius={"1g"}
        borderWidth={"1px"}
        w={"350px"}
      >
        <Text
          fontSize='4xl'
          fontFamily='Work sans'
          color={"black"}
        >
          NexText
        </Text>
      </Box>
      <Box width={"350px"} >
        <div style={styles.container}>
        <div style={styles.tabs}>
          <button
            onClick={() => setActiveTab('login')}
            style={activeTab === 'login' ? styles.activeTab : styles.tab}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            style={activeTab === 'signup' ? styles.activeTab : styles.tab}
          >
            Sign Up
          </button>
        </div>
        <div style={styles.content}>
          {activeTab === 'login' && <Login />}
          {activeTab === 'signup' && <Signup />}
        </div>
      </div>
      </Box>
    </Container>
  );
}

export default Home;
