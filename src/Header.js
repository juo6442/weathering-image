import React from 'react';
import './style.css';

function Header(props) {
  return (
    <header>
      <h1>{document.title}</h1>
      <p>디지털 풍화가 일어난 이미지를 좋아하시는 여러분을 위한 페이지입니다. 저화질의 이미지를 쉽고 빠르게 만들어 보세요!</p>
    </header>
  );
}

export default Header;
