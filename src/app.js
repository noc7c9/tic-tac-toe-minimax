import React from 'react'
import ReactDOM from 'react-dom'

import randomAI from './random-ai'
import minimaxAI from './minimax-ai'

import Game from './game.react'

ReactDOM.render(
  <Game ai={minimaxAI}/>,
  document.getElementById('container')
);
