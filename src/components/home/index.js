import React from 'react';
import Sidebar from '.././sidebar/index';
import './index.scss';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }
    getInitialState() {
        let todos = localStorage.getItem('todos');
        todos = todos === null ? [] : JSON.parse(todos);
        return {
            todos: todos
        }
    }
    componentDidMount() {
        //console.log(this);
    }
    addOne() {
        const todoValue = this.refs.todoInput.value;
        if (!todoValue) {
            alert('Empty value is not allowed!');
            return;
        }
        const { todos } = this.state;
        const newTodo = {
            text: todoValue,
            done: false
        };
        this.setState({
            todos: [
                ...todos,
                newTodo
            ]
        });
        this.refs.todoInput.value = "";
        this.save();
    }
    remove(index) {
        const { todos } = this.state;
        todos.splice(index, 1);
        this.setState({
            todos: todos
        })
        this.save();
    }
    done(index) {
        let { todos } = this.state;
        todos.forEach((todo, idx) => {
            if (index === idx) todo.done = !todo.done;
        })
        this.setState({
            todos: todos
        })
        this.save();
    }
    getDoneItemCount() {
        return this.state.todos.filter(todo => {
            return todo.done === true;
        }).length;
    }
    save() {
        localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
    render() {
        return (
            <div id="page">
                <Sidebar path="#/" />
                <div id="main">
                    Todo List:
                <div>&nbsp;</div>
                    <div id="todos-status">
                        <span>已完成: {this.getDoneItemCount()} 个</span>&nbsp;<span>未完成: {this.state.todos.length - this.getDoneItemCount()} 个</span>
                    </div>
                    <ul className="todo-items">
                        {this.state.todos.map((todo, index) => {
                            return <li key={index} className={todo.done ? "todo-item done" : "todo-item"}>
                                <span className="todo-item-text">{todo.text}</span>&nbsp;
                        <span title="移除" className="todo-remove" onClick={this.remove.bind(this, index)}>-</span>&nbsp;
                        <span title={todo.done ? "未完成" : "已完成"} className="todo-done" onClick={this.done.bind(this, index)}>{todo.done ? 'x' : '√'}</span>
                            </li>
                        })}
                    </ul>
                    <div id="todo-add">
                        <input type="" ref="todoInput" />
                        <button onClick={this.addOne.bind(this)}>添加</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;