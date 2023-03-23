import { Form, Input, Button } from "antd";
import "./FormTodo.css";
import { useEffect, useState } from "react";
export default function FormTodo({ todos, setTodos, edit, setEdit }) {
  const [form] = Form.useForm();
  console.log(edit);

  const onFinish = (values) => {
    if (!edit) {
      createTodo(values.title, values.description);
      form.resetFields();
    } else {
      updateTodo(edit.id, values.title, values.description);
      setEdit(null);
    }
  };
  const onFinishFailed = (erroInfo) => {
    console.log("failed", erroInfo);
  };

  useEffect(() => {
    if (edit) {
      form.setFieldsValue({
        title: edit.attributes.title,
        description: edit.attributes.description,
      });
    } else {
      form.resetFields();
    }
  });

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
    }).then(() => {
      form.resetFields();
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
    <div className="todo">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="title"
          className="form-item"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input to do title !",
            },
          ]}
        >
          <Input placeholder="Input your Todo title " />
        </Form.Item>

        <Form.Item name="description" label="description" className="form-item">
          <Input.TextArea
            placeholder="Description your todo"
            className="text-area"
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
