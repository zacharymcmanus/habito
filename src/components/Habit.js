import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Habit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            habit: this.props.habit,
        };
    }

    handleRemove = () => {
        this.props.removeHabit(this.props.id);
    };

    toggleForm = () => {
        this.setState({ isEditing: !this.state.isEditing });
    };

    handleUpdate = (e) => {
        e.preventDefault();
        // take new habit and pass to parent
        this.props.updateHabit(this.props.id, this.state.habit);
        this.setState({ isEditing: false });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleToggle = (e) => {
        this.props.toggleHabit(this.props.id);
    };

    render() {
        console.log('habit', this.state.habit);
        let result;
        if (this.state.isEditing) {
            result = (
                <CSSTransition key='editing' timeout={500} classNames='form'>
                    <form
                        className='Habit-edit-form'
                        onSubmit={this.handleUpdate}
                    >
                        <input
                            type='text'
                            value={this.state.habit}
                            name='habit'
                            onChange={this.handleChange}
                        />
                        <button>Save</button>
                    </form>
                </CSSTransition>
            );
        } else {
            result = (
                <CSSTransition
                    key='normal'
                    timeout={500}
                    classNames='habit-text'
                >
                    <li className='Habit-todo' onClick={this.handleToggle}>
                        {this.props.habit}
                    </li>
                </CSSTransition>
            );
        }

        return (
            <TransitionGroup
                className={this.props.completed ? 'Habit completed' : 'Habit'}
            >
                {result}
                <div className='Todo-buttons'>
                    <button onClick={this.toggleForm}>
                        <i className='fas fa-pen' />
                    </button>
                    <button onClick={this.handleRemove}>
                        <i className='fas fa-trash' />
                    </button>
                </div>
            </TransitionGroup>
        );
    }
}

export default Habit;
