import { useState } from "react";
import "./App.css";
import FormTodo from "./component/FormTodo";
import ListTodo from "./component/listTodo";

function App() {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(null);
  return (
    <div className="app-container">
      <div className="head-title">To-do List</div>
      <div className="warraper">
        <FormTodo
          todos={todos}
          setTodos={setTodos}
          edit={edit}
          setEdit={setEdit}
        />

        <ListTodo todos={todos} setTodos={setTodos} setEdit={setEdit} />
      </div>
    </div>
  );
}

export default App;
