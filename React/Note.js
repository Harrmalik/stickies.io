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
         right: this.randomBetween(0, window.innerWidth - 200, 'px'),
         top: this.randomBetween(0, window.innerHeight - 200, 'px'),
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
      this.props.onChange( this.props.id, this.refs.newText.value, this.props.board, this.props.color);
      this.setState({editing: false});
   },
   renderForm() {
      return (
         <div className={"ui raised secondary segment note inverted " + this.props.color} style={this.style}>
            <textarea ref="newText" defaultValue={this.props.text}></textarea>
            <i className=" large save icon link inverted" onClick={this.save}></i>
         </div>
      )
   },
   rendorDisplay(){
      return (
         <div className={"ui raised secondary segment note inverted " + this.props.color} style={this.style}>
            <i className="remove red large link icon" onClick={this.remove}></i>
            <p>{this.props.text}</p>
            <span>
               <i className="large edit link icon" onClick={this.edit}></i>
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
