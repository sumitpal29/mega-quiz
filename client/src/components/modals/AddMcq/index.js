import React, {useState} from 'react';
import { Row, Col, Form, Input, Button } from 'antd';

function AddMCQ({ onSubmit }) {

  const [form] = Form.useForm();
  const [label, setLabel] = useState("");
  const [val, setVal] = useState("");

  const handelLabelChange = async (e) => {
    setLabel(e.target.value);
  };

  const handelValueChange = async (e) => {
    setVal(e.target.value);
  };


  const onFinish = () => {
    onSubmit({
      label, val
    });
    form.resetFields();
  };

  const onFinishFailed = (errorInfo = {}) => {
    console.log("Failed:", errorInfo);
  };

  return (
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
              label="Label"
              name="label"
              rules={[{ required: true, message: "Please enter label to display" }]}
            >
              <Input
                value={label}
                placeholder="Enter Value"
                onChange={handelLabelChange}
              />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="value"
              name="value"
              rules={[{ required: true, message: "Please enter value" }]}
            >
              <Input
                value={val}
                placeholder="Enter Value"
                onChange={handelValueChange}
              />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item style={{ textAlign: 'center'}}>
              <Button type="primary" shape="circle" onClick={onFinish}>
                +
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default AddMCQ;
