import React from 'react'
import Draggable from 'react-draggable'

var Note = React.createClass({
   getInitialState() {
      return {
         editing: false
      }
   },
   componentWillMount() {
      this.style = {
         right: this.randomBetween(0, window.innerWidth - 150, 'px'),
         top: this.randomBetween(0, window.innerHeight - 150, 'px'),
         transform: 'rotate(' + this.randomBetween(-15, 15, 'deg)')
      }
   },
   componentDidUpdate() {
      if (this.state.editing) {
         this.refs.newText.focus()
         this.refs.newText.select()
      }
   },
   shouldComponentUpdate(nextProps, nextState) {
      return this.props.text !== nextProps.text || this.state !== nextState
   },
   randomBetween(x, y, s) {
      return (x + Math.ceil(Math.random() * (y-x))) + s
   },
   edit() {
      this.setState({editing: true});
   },
   remove() {
      this.props.onRemove(this.props.id);
   },
   save() {
      this.props.onChange(this.refs.newText.value, this.props.id);
      this.setState({editing: false});
   },
   renderForm() {
      return (
         <div className="note" style={this.style}>
            <textarea ref="newText" defaultValue={this.props.text}></textarea>
            <button onClick={this.save}>save</button>
         </div>
      )
   },
   rendorDisplay(){
      return (
         <div className="note" style={this.style}>
            <p>{this.props.text}</p>
            <span>
               <button onClick={this.edit}>Edit</button>
               <button onClick={this.remove}>X</button>
            </span>
         </div>
      )
   },
   render() {
      return (
         <Draggable>
            {(this.state.editing) ? this.renderForm() : this.rendorDisplay()}
         </Draggable>
      )
   }
})

export default Note
