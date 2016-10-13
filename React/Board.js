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
      if (this.props.count) {
         var url = `http://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`
         fetch(url)
            .then(results => results.json())
            .then(array => array[0])
            .then(text => text.split('. '))
            .then(array => array.forEach(
               sentence => this.add(sentence, 'home')
            ))
            .catch(function(err) {
               console.log('couldn\'t get data')
            })
      }
   },
   nextId(){
      this.uniqueId = this.uniqueId || 0
      return this.uniqueId++
   },
   add(text, board) {
      var notes = [
         ...this.state.notes,
         {
            id: this.nextId(),
            note: text,
            board
         }
      ]
      this.setState({notes})
   },
   randomColor() {
       var colors = ['orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', '']
       return colors[Math.floor(Math.random() * (9 - 0) + 0)]
   },
   update(newText, id, color) {
      var notes = this.state.notes.map(
         note => (note.id !== id) ? note : {
             id,
             color,
             note: newText
         }
      )
      this.setState({notes})
   },
   remove(id) {
      var notes = this.state.notes.filter(note => note.id !== id);
      this.setState({notes})
   },
   eachNote(note) {
        if (this.props.board === note.board) {
             return (
                 <Note key={note.id} text={note.note} id={note.id} onChange={this.update} onRemove={this.remove} color={note.color || this.randomColor()}></Note>
            )
        }
   },
   render() {
      return (
         <div className="board">
            {this.state.notes.map(this.eachNote)}
            <i className="add square huge green inverted icon" onClick={() => this.add('New Note')}></i>
         </div>
      )
   }
})

export default Board
