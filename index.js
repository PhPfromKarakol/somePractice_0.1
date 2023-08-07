import React, { Component } from 'react';
import { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './app.css'


class Appp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: { x: 700, y: 300 },
      prevPositions: [],
    };
    this.divRef = React.createRef();
  }

  componentDidMount() {
    this.divRef.current.addEventListener('mouseenter', this.getRandomPosition);
  }

  componentWillUnmount() {
    this.divRef.current.removeEventListener('mouseenter', this.getRandomPosition);
  }

  getRandomPosition = () => {
    const { prevPositions } = this.state;
    const screenWidth = window.innerWidth - this.divRef.current.clientWidth;
    const screenHeight = window.innerHeight - this.divRef.current.clientHeight;

    let newX, newY;
    do {
      newX = Math.floor(Math.random() * screenWidth);
      newY = Math.floor(Math.random() * screenHeight);
    } while (prevPositions.some(pos => Math.abs(pos.x - newX) < 100 && Math.abs(pos.y - newY) < 100));

    this.setState(prevState => ({
      position: { x: newX, y: newY },
      prevPositions: [...prevState.prevPositions, { x: newX, y: newY }],
    }));
  };

  render() {
    const { position } = this.state;
    return (
      <div
        className="container"
        ref={this.divRef}
        style={{ left: position.x, top: position.y }}
      >
        Catch me!
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Appp />
);
