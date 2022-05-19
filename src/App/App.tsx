import React, { useEffect, useState } from "react"
import Button from "../Components/Button"
import Divider from "../Components/Divider"
import { useLocalState } from "../hooks"
import { ModalDataTypes, PropTypes, TodoTypes } from "./App.types"
import './App.scss'
import Modal from "../Components/Modal"

const App = ({ title }: PropTypes) => {

    const [todos, setTodos] = useLocalState<TodoTypes[]>('todos', [])
    const [filteredTodos, setFilteredTodos] = useState<TodoTypes[]>(todos)
    const [newTodo, setNewTodo] = useState<string>('');
    const [openModal, setOpenModal] = useState<ModalDataTypes | null>({ type: '', id: null, text: '' });
    const [editableTodo, setEditedTodo] = useState<string>('');


    const createNewTodo = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        // if (newTodo.length < 5) return;
        setTodos([{ id: Math.random(), text: newTodo, completed: false }, ...todos]);
        setNewTodo('');
    }

    const handleCheckboxClick = ({ id }: { id: number }) => {
        const nextTodos = [...todos].map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
        setTodos(nextTodos)
    }

    const onEditTodo = ({ id, text }: { id: number, text: string }) => {
        setOpenModal({ type: 'edit', id, text });
        setEditedTodo(text);
    }

    const onDeleteTodo = ({ id }: { id: number }) => {
        setOpenModal({ type: 'delete', id })
    }

    const editTodo = ({ id }: { id: string | number | null }) => {
        const nextTodos = [...todos].map(todo => todo.id === id ? { ...todo, text: editableTodo } : todo)
        setTodos(nextTodos);
        setOpenModal(null);
    }

    const deleteTodo = ({ id }: { id: string | number | null }) => {
        const nextTodos = [...todos].filter(todo => todo.id !== id)
        setTodos(nextTodos);
        setOpenModal(null);
    }

    const TrancatedText = (props: { text: string }): any => {
        const [tranc, setTranc] = useState<boolean>(true);
        const { text } = props;
        if (text.length < 200) return text;
        return (
            <span>
                {tranc ? `${text.substring(0, 200)}...` : text} {' '}
                <Button small onClick={() => setTranc(!tranc)} text={tranc ? "+" : '-'} />
            </span>
        )
    }

    const filterTasks = (event: any) => {
        console.log(event?.target?.value);
        const completedTodos = todos.filter(todo => todo.completed);
        const uncompletedTodos = todos.filter(todo => !todo.completed);
        if (event?.target?.value === 'completed') {
            setFilteredTodos(completedTodos)
        } else if (event?.target?.value === 'todos') {
            setFilteredTodos(uncompletedTodos)
        } else {
            setFilteredTodos(todos)
        }
    }

    useEffect(() => {
        setFilteredTodos(todos)
    }, [todos])

    return (
        <div className="app">
            <div className="todo-wrapper">
                <h1>{title}</h1>
                <Divider style={{ borderColor: 'red' }} />
                <div className="todo-form-wrapper">
                    <form onSubmit={createNewTodo}>
                        <input type="text" placeholder="Add new todo" value={newTodo} onChange={(event) => setNewTodo(event?.target?.value)} />
                        <Button primary type="submit" text="Add" />
                    </form>
                </div>

                <Divider style={{ marginTop: 30, border: 0 }} />
                <div className="todo-title">
                    <h3>Tasks</h3>
                    <select name="filter" id="filter" onChange={filterTasks}>
                        <option value="all">All</option>
                        <option value="todos">Todos</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <Divider />
                <div className="todo-list">
                    {filteredTodos.length < 1
                        ? <div>No todos added yet!</div>
                        : filteredTodos.map((todo: TodoTypes) => (
                            <div key={todo.id} className={`todo${todo.completed ? ` completed` : ''}`}>
                                <input checked={todo.completed} onChange={() => handleCheckboxClick({ id: todo.id })} type="checkbox" name={`todo-${todo.id}`} id={`todo-id-${todo.id}`} />
                                <span className={todo.completed ? 'completed' : ''}><TrancatedText text={todo?.text} /></span>
                                <div className="action-btn-group">
                                    <span onClick={() => onEditTodo({ id: todo.id, text: todo.text })} className={todo?.completed ? 'disabled' : ''}><i className="fa-regular fa-pen-to-square"></i></span>
                                    <span onClick={() => onDeleteTodo({ id: todo.id })} style={{ color: 'red' }}><i className="fa-regular fa-trash-can"></i></span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {openModal?.id && <Modal onClose={() => setOpenModal(null)}>
                {openModal.type === 'edit' && <div>
                    <h3>Edit Todo</h3>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        editTodo({ id: openModal?.id })
                    }}>
                        <textarea placeholder="Edit todo" value={editableTodo} onChange={(event) => setEditedTodo(event?.target?.value)} />
                        <Button primary type="submit" text="Update" />
                    </form>
                </div>}
                {openModal.type === 'delete' &&
                    <div>
                        <h4>Do you realy want to delete this todo?</h4>
                        <Button primary type="submit" text="Delete" onClick={() => deleteTodo({ id: openModal.id })} />
                    </div>
                }
            </Modal>}
        </div>
    )
}

export default App