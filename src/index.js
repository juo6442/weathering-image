import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Footer from './Footer';
import './style.css';

function App(props) {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
