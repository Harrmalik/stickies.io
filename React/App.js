import React from 'react'
import ReactDOM from 'react-dom'
import Board from './Board'

var board = document.getElementById('board-name').innerText
ReactDOM.render(<Board board={board}/>,
document.getElementById('react-container'))
