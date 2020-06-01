import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Header(props) {
  return (
    <header>
      <h1>{document.title}</h1>
      <p>디지털 풍화가 일어난 이미지를 좋아하시는 여러분을 위한 페이지입니다. 저화질의 이미지를 쉽고 빠르게 만들어 보세요!</p>
    </header>
  );
}

function Footer(props) {
  return (
    <footer>
      <hr />
      <address>
        <p>Twitter: <a href="https://twitter.com/juo6442">@juo6442</a></p>
        <p>E-mail: <a href="mailto:juo6442@gmail.com">juo6442@gmail.com</a></p>
      </address>
      <p>Github: <a href="https://github.com/juo6442/weathering-image">https://github.com/juo6442/weathering-image</a></p>
    </footer>
  );
}

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
