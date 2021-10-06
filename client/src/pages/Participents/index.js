import React, { useState } from 'react'
import { Row, Col, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom'

function ParticipentsJoin({ history }) {
  const [form] = Form.useForm();
  const [password, setPassword] = useState('');
  const [room, setRoom] = useState('');

  const handelRoomDataChange = async (e) => {
    setRoom(e.target.value);
  };

  const handelPasswordChange = async (e) => {
    setPassword(e.target.value);
  };


  const onFinish = () => {
    console.log(room, password)
    history.push(`/join/game?room=${room}&password=${password}`)
    form.resetFields();
  };

  const onFinishFailed = (errorInfo = {}) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1>Are you gonna make it to the top?</h1>
      <div>
        <Form
          form={form}
          name="add mcq"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row>
            <Col span={11}>
              <Form.Item
                label="Game Name"
                name="room"
                rules={[{ required: true, message: "Please enter game name" }]}
              >
                <Input
                  value={room}
                  placeholder="Enter Game Name"
                  onChange={handelRoomDataChange}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter game password" }]}
              >
                <Input.Password
                  value={password}
                  placeholder="Enter Password"
                  onChange={handelPasswordChange}
                />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item style={{ textAlign: 'center'}}>
                <Button type="primary" onClick={onFinish}>
                  Join Game
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default ParticipentsJoin
