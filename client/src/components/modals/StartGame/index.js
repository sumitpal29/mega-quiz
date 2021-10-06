import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Modal } from "antd";

function StartGame({
  isModalVisible,
  handleCancel,
  onSubmit,
}) {
  const [form] = Form.useForm();
  const [gameKey, setgameKey] = useState("");

  const setGameKey = async (e) => {
    setgameKey(e.target.value);
  };

  const onFinish = () => {
    onSubmit({gameKey})
    form.resetFields();
  };

  const onFinishFailed = (errorInfo = {}) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Modal
        title="Create new Game"
        visible={isModalVisible}
        onCancel={handleCancel}
        width={1200}
        onOk={() => {
          const x = form.validateFields();
          console.log(x);
        }}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            onClick={() => {
              form
                .validateFields()
                .then((d) => onFinish(d))
                .catch((e) => console.log("err", e));
            }}
          >
            Start Game
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="start game"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row>
            <Col span={11}>
              <Form.Item
                label="Game Key"
                name="gamekey"
                rules={[{ required: true, message: "Please enter Game Key" }]}
              >
                <Input
                  value={gameKey}
                  placeholder="Enter Game key"
                  onChange={setGameKey}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

export default StartGame;
