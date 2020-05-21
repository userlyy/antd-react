import React from "react";
import { Form, Icon, Input, Button, Checkbox, Card, message } from "antd";
import { setToken } from "../utils/auth";
import { loginApi } from "../services/auth";

import "./login.css";

function Login(props) {
  const { getFieldDecorator } = props.form;
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        // setToken(values.username);
        // props.history.push("/admin");
        loginApi({
          userName: values.username,
          password: values.password,
        })
          .then((res) => {
            if (res.code === "success") {
              message.success("登录成功");
              setToken(res.token);
              props.history.push("/admin");
            } else {
              message.info(res.message);
            }
            // console.log(res);
          })
          .catch((err) => {
            // console.log(err);
            message.error("用户不存在");
          });
      }
    });
  };
  return (
    <Card className="login-form" title="Admin System">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}

          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Form.create({ name: "loginForm" })(Login);
