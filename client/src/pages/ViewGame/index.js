import React, { useState } from 'react'
import { Row, Col, Form, Input, Button } from 'antd';

function ViewGame({ history }) {
  const [form] = Form.useForm();
  const [gameKey, setgameKey] = useState('');

  const handelRoomDataChange = async (e) => {
    setgameKey(e.target.value);
  };

  const onFinish = () => {
    history.push(`/watch?gameKey=${gameKey}`);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo = {}) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1>Join Game</h1>
      <div>
        <Form
          form={form}
          name="Join Game"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row>
            <Col span={11}>
              <Form.Item
                label="Game id"
                name="gameKey"
                rules={[{ required: true, message: "Please enter game name" }]}
              >
                <Input
                  value={gameKey}
                  placeholder="Enter Game Name"
                  onChange={handelRoomDataChange}
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

export default ViewGame;
