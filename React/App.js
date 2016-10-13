import React from 'react'
import ReactDOM from 'react-dom'
import Board from './Board'

var board = document.getElementById('board-name').innerText
ReactDOM.render(<Board count={20} board={board}/>,
document.getElementById('react-container'))
