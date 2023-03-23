import { Card, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import "./ListTodo.css";
export default function ListTodo({ todos, setTodos, setEdit }) {
  useEffect(() => {
    // const inteval = setInterval(() => {
    //   const fetchData = async () => {
    //     const response = await fetch("http://localhost:1337/api/todos");
    //     const data = await response.json();
    //     setTodos(data.data);
    //   };
    //   fetchData();
    // }, 20000);
    // return () => clearInterval(inteval);
    const fetchData = async () => {
      const response = await fetch("http://localhost:1337/api/todos");
      const data = await response.json();
      setTodos(data.data);
    };
    fetchData();
  }, [todos, setTodos]);
  //
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:1337/api/todos/${id}`, {
      method: "DELETE",
    });
  };
  const updateTodo = (id) => {
    const todo = todos.find((item) => item.id === id);
    setEdit(todo);
  };
  return (
    <div className="wrapper-list">
      {/* /* jika data belum dipanggil maka isi nya no todo data jika sudah ada ganti dengan card */}
      {todos.length === 0 ? (
        <div className="empty">no todo data</div>
      ) : (
        todos.map((item, index) => {
          return (
            <Card
              className="card"
              title={item.attributes.title}
              extra={
                <>
                  <Button onClick={() => updateTodo(item.id)}>
                    <EditOutlined />
                  </Button>
                  <Button
                    className=".btn-delete"
                    onClick={() => deleteTodo(item.id)}
                  >
                    <DeleteOutlined className=".btn-delete-default" />
                  </Button>
                </>
              }
              key={index}
            >
              <div>{item.attributes.description}</div>
            </Card>
          );
        })
      )}
    </div>
  );
}
