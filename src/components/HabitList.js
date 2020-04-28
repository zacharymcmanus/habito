import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Components
import Habit from './Habit';
import NewHabitForm from './NewHabitForm';

class HabitList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            habits: [],
        };
    }

    create = (newHabit) => {
        this.setState({
            habits: [...this.state.habits, newHabit],
        });
    };

    remove = (id) => {
        this.setState({
            habits: this.state.habits.filter((h) => h.id !== id),
        });
    };

    update = (id, updatedHabit) => {
        const updatedHabits = this.state.habits.map((habit) => {
            if (habit.id === id) {
                return { ...habit, habit: updatedHabit };
            }
            return habit;
        });
        this.setState({ habits: updatedHabits });
    };

    toggleCompletion = (id) => {
        const updatedHabits = this.state.habits.map((habit) => {
            if (habit.id === id) {
                return { ...habit, completed: !habit.completed };
            }
            return habit;
        });
        this.setState({ habits: updatedHabits });
    };

    render() {
        const habits = this.state.habits.map((habit) => {
            return (
                <CSSTransition key={habit.id} timeout={500} classNames='habit'>
                    <Habit
                        key={habit.id}
                        id={habit.id}
                        habit={habit.habit}
                        completed={habit.completed}
                        removeHabit={this.remove}
                        updateHabit={this.update}
                        toggleHabit={this.toggleCompletion}
                    />
                </CSSTransition>
            );
        });

        return (
            <div className='HabitList'>
                <h1>Hábito</h1>
                <NewHabitForm createHabit={this.create} />
                <ul>
                    <TransitionGroup className='habit-list'>
                        {habits}
                    </TransitionGroup>
                </ul>
            </div>
        );
    }
}

export default HabitList;
