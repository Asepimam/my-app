import { useEffect, useRef, useState } from "react";
import "./FormTodo.css";

export default function FormTodo({ todos, setTodos, edit, setEdit }) {
  const [titleTodo, setTitleTodo] = useState(edit ? edit.attributes.title : "");
  const [descriptionTodo, setDescriptionTodo] = useState("");
  const formRef = useRef(null);

  const handleClickOutsideForm = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setEdit(null);
    }
  };
  const handleChangeTitle = (e) => {
    setTitleTodo(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescriptionTodo(e.target.value);
  };
  const cancelEdit = () => {
    // saat cancel edit, form akan kembali ke kondisi awal
    setTitleTodo("");
    setDescriptionTodo("");
    setEdit(null);
  };
  console.log({
    titleTodo,
    descriptionTodo,
    edit,
  });
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideForm);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideForm);
    };
  });

  const onFinish = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    if (!edit) {
      createTodo(title, description);
      setTitleTodo("");
      setDescriptionTodo("");
      form.reset();
    } else {
      updateTodo(edit.id, title, description);
      setTitleTodo("");
      setDescriptionTodo("");
      setEdit(null);
    }
  };

  useEffect(() => {
    if (edit) {
      setTitleTodo(edit.attributes.title);
      setDescriptionTodo(edit.attributes.description);
    }
  }, [edit]);

  const createTodo = (title, description) => {
    fetch("http://localhost:1337/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          title: title,
          description: description,
        },
      }),
    });
  };
  const updateTodo = (id, title, description) => {
    fetch(`http://localhost:1337/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          title: title,
          description: description,
        },
      }),
    });
  };

  return (
    <div className="todo" ref={formRef}>
      <form className="form-item" onSubmit={onFinish}>
        <div className="wrapper-input">
          <label className="label-title" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Input Your Todo Title "
            value={titleTodo}
            onChange={handleChangeTitle}
            required
          />
        </div>

        <div className="wrapper-input">
          <label className="label-desk" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description your todo"
            className="text-area"
            value={descriptionTodo}
            onChange={handleChangeDescription}
          ></textarea>
        </div>

        <button className="btn-form" type="submit">
          {edit ? "update" : "submit"}
        </button>
        {edit && (
          <button className="btn-cancel" onClick={() => cancelEdit}>
            cancel
          </button>
        )}
      </form>
    </div>
  );
}
