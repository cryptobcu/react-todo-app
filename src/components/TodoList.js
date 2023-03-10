import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { toggle, destroy, selectTodos } from '../redux/todos/todosSlice';
let filtered = [] ;
function TodoList() {
    const dispatch = useDispatch();
    const items = useSelector(selectTodos);
    const activeFilter = useSelector((state) => state.todos.activeFilter);
    const handleDestroy = (id) => {
        if (window.confirm("Are you sure?")){
            dispatch(destroy(id));
        }
    };
    filtered = items ;
    if(activeFilter !== "all") {
        filtered = items.filter((todo) => 
        activeFilter === "active"
        ? todo.completed === false && todo
        : todo.completed === true && todo)
    }
  return (
    <ul className="todo-list">
			{
                filtered.map((item)=>(
                    <li key={item.id} className={item.completed === true ? "completed" : ""}>
                        <div className="view">
                            <input 
                            className="toggle" 
                            type="checkbox"
                            onChange={() => dispatch(toggle({id:item.id}))} />
                            <label>{item.title}</label>
                            <button className="destroy" onClick={() => handleDestroy(item.id)}></button>
                        </div>
			        </li>
                ))
            }
		</ul>
  )
}

export default TodoList