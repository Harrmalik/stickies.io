import React from 'react'
import Note from './Note'

var Board = React.createClass({
   propTypes: {
      count: function(props, propName) {
         if(typeof props[propName] !=="number") {
            return new Error("the count must be a number");
         }

         if(props[propName] > 100) {
            return new Error('Creating ' +  100 + ' notes is too many notes');
         }
      }
   },
   getInitialState() {
      return {
         notes: []
      }
   },
   componentWillMount() {
    //   if (this.props.count) {
    //      var url = `http://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`
    //      fetch(url)
    //         .then(results => results.json())
    //         .then(array => array[0])
    //         .then(text => text.split('. '))
    //         .then(array => array.forEach(
    //            sentence => this.add(sentence, 'home')
    //         ))
    //         .catch(function(err) {
    //            console.log('couldn\'t get data')
    //         })
    //   }
   },
   componentDidMount() {
       var component = this
       socket.on('new note', function(note) {
           component.create(note)
       })
       socket.on('update note', function(id, text, board, color) {
           component.update(id, text, board, color)
       })
       socket.on('remove note', function(id) {
           component.remove(id)
       })
   },
   add(text, board) {
       var color = this.randomColor()
       var note = {
           id: this.state.notes.length,
           text,
           board,
           color
       }
       socket.emit('new note', note)
       this.create(note)
   },
   create(note) {
      var notes = [
         ...this.state.notes,
        note
      ]

      this.setState({notes})
   },
   randomColor() {
       var colors = ['orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', '']
       return colors[Math.floor(Math.random() * (9 - 0) + 0)]
   },
   update(id, text, board, color) {
      var notes = this.state.notes.map(
         note => (note.id !== id) ? note : {
             id,
             text,
             board,
             color
         }
      )
      socket.emit('update note', id, text, board, color)
      this.setState({notes})
   },
   remove(id) {
      var notes = this.state.notes.filter(note => note.id !== id);
      socket.emit('remove note', id)
      this.setState({notes})
   },
   eachNote(note) {
        if (this.props.board === note.board) {
             return (
                 <Note
                    key={note.id}
                    id={note.id}
                    text={note.text}
                    board={this.props.board}
                    color={note.color || this.randomColor()}
                    onChange={this.update}
                    onRemove={this.remove} />
            )
        }
   },
   render() {
      return (
         <div className="board">
            {this.state.notes.map(this.eachNote)}
            <i className="add square huge green inverted icon" onClick={() => this.add('New Note', this.props.board)}></i>
         </div>
      )
   }
})

export default Board
