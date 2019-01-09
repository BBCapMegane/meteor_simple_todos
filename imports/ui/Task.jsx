import React, { Component, PropTypes } from 'react'

import { Tasks } from '../api/tasks.js';

// Task component - represents a single todo item
export default class Task extends Component {

    toggleCehcked() {

        Tasks.update(this.props.task._id, {
            $set: { checedf: !this.props.task.checked },
        });
    }

    deleteThisTask() {
        Tasks.remove(this.props.task._id);
    }

    render() {

        const taskClassName = this.props.task.checked ? 'checked' : '';

        return (
            //<li className='list-group-item'>{this.props.task.text}</li>
            <li className='list-group-item'>{taskClassName}
                <button className="btn btn-danger" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button>
                <div className="checkbox-inline">
                    <input
                        type="checkbox"
                        readOnly
                        checked={this.props.task.checked}
                        onClick={this.toggleCehcked.bind(this)}
                    />
                </div>
                <span className="text">{this.props.task.text}</span>
            </li>
        );
    }
}

Task.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    task: PropTypes.object.isRequired,
};