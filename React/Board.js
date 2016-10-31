import React from 'react'
import Note from './Note'
import Notification from './Notification'

var Board = React.createClass({
   propTypes: {
      board: function(props, propName) {
         if(typeof props[propName] !=="string") {
            return new Error("The board must be a string");
         }
     }
   },
   getInitialState() {
      return {
         notes: []
      }
   },
   componentWillMount() {
       this.getNotes()
   },
   componentDidMount() {
       var component = this
       socket.on('reload', function() {
           component.getNotes()
       })
       socket.on('note created', function(note) {
           //component.create(note)
       })
       socket.on('note updated', function(_id, text, board, color) {
           component.update(_id, text, board, color, true)
       })
       socket.on('note removed', function(_id) {
           component.remove(_id, true)
       })
   },
   getNotes() {
     var url = `http://localhost:3000/api/notes/${this.props.board}`
     fetch(url)
        .then(results => results.json())
        .then(notes => this.setState({notes}))
        .catch(function(err) {
           console.log('couldn\'t get data')
        })
    this.setState({updates: 0})
   },
   add(text, board, color) {
       var component = this
       var color =  color ? color : this.randomColor()
       var note = {
           text,
           board,
           color
       }

       var headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded');
       fetch(`http://localhost:3000/api/notes/${this.props.board}`, {method: 'POST', body: JSON.stringify(note), headers})
           .then(function(response) {
               if(response.status == 200) return response.json()
               else throw new Error('Something went wrong on api server!')
           })
           .then(function(data) {
               socket.emit('new note', data)
               component.create(data)
           })
           .catch(function(error) {
               console.error(error)
           });

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
   update(_id, text, board, color, emitted) {
       var component = this;
      var newNote = {
           _id,
           text,
           board,
           color
       }
      var notes = this.state.notes.map(
         note => (note._id !== _id) ? note : newNote
      )
      if (!emitted)
        socket.emit('updated note', _id, text, board, color)

    var headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    fetch(`http://localhost:3000/api/notes/${this.props.board}`, {method: 'PUT', body: JSON.stringify(newNote), headers})
        .then(function(response) {
            if(response.status == 200) return response.json()
            else throw new Error('Something went wrong on api server!')
        })
        .catch(function(error) {
            console.error(error)
        })

        this.setState({notes})
   },
   remove(_id, emitted) {
      var notes = this.state.notes.filter(note => note._id !== _id)
      if (!emitted)
        socket.emit('removed note', _id)
        var headers = new Headers()
        headers.append('Content-Type', 'application/x-www-form-urlencoded')
    fetch(`http://localhost:3000/api/notes/${this.props.board}`, {method: 'DELETE', body: JSON.stringify(_id), headers})
        .then(function(response) {
            if(response.status == 200) return response.json()
            else throw new Error('Something went wrong on api server!')
        })
        .catch(function(error) {
            console.error(error)
        })
      this.setState({notes})
   },
   eachNote(note) {
        if (this.props.board === note.board) {
             return (
                 <Note
                    key={note._id}
                    _id={note._id}
                    text={note.text}
                    board={note.board}
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
            <Notification parent={this} updates={this.state.updates}/>
         </div>
      )
   }
})

export default Board
