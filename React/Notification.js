import React from 'react'

var Notification = React.createClass({
    getInitialState() {
        return {
            updates: this.props.updates || 0
        }
    },
    componentDidMount() {
        var component = this
        socket.on('note created', function(note) {
            component.setState({updates: component.state.updates + 1})
        })
    },
    showUpdates() {
        this.props.parent.getNotes()
        this.setState({updates: 0})
    },
    render() {
        if (this.state.updates > 0) {
            return (
                <div id="notification" className="notification ui orange message" onClick={this.showUpdates}><a className="ui blue circular label">{this.state.updates}</a> New Note(s)</div>
            )
        } else {
            return <div></div>
        }
    }
})

export default Notification
