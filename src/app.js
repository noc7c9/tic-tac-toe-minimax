import React from 'react'
import ReactDOM from 'react-dom'

import randomAI from './random-ai'

import Game from './game.react'

ReactDOM.render(
  <Game ai={randomAI}/>,
  document.getElementById('container')
);
