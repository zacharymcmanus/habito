import React, { Component } from 'react';
import uuid from 'uuid/v4';

class NewHabitForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            habit: '',
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createHabit({ ...this.state, id: uuid(), completed: false });
        this.setState({ habit: '' });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type='text'
                    name='habit'
                    placeholder='Enter habit...'
                    id='habit'
                    value={this.state.habit}
                    onChange={this.handleChange}
                />
                <button>
                    <i className='add fas fa-plus' />
                </button>
            </form>
        );
    }
}

export default NewHabitForm;
