import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

// App component - represents the whole app
class App extends Component {

    handleSubmit(event) {
        event.preventDefault();

        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Tasks.insert({
            text,
            createdAt: new Date(),
        })

        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    render() {
        return (
            <div className="container">
                <header className="bg-primary">
                    <h1>Todo List</h1>
                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="input-group">
                            <span className="input-group-addon">text</span>
                            <input type="text" ref="textInput" className="form-control" placeholder="Type to add new tasks" />
                        </div>
                    </form>
                </header>

                <div>
                    <ul className="list-group">
                        {this.renderTasks()}
                    </ul>
                </div>
            </div>
        );
    }
}

App.protoTypes = {
    tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        tasks: Tasks.find({}, { sort: {createdAt: -1}}).fetch(),
    };
}, App);