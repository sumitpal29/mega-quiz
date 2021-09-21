import React, {useState} from "react";
import { Modal, Row, Col, Form, Input, Button } from "antd";
import _get from 'lodash/get';
import {generateNewPassword} from '../../../utils';

function AddRounds({ participentData, modalVisibility, onSubmit, hideModal }) {
  const [form] = Form.useForm();
  const [password, setPassword] = useState(_get(participentData, 'password', generateNewPassword()));

  const onFinish = (values = {}) => {
    onSubmit({...values, password});
    hideModal();
    form.resetFields();
    setPassword(generateNewPassword())
  };

  const onFinishFailed = (errorInfo = {}) => {
    console.log("Failed:", errorInfo);
  };

  const handleCancel = () => hideModal();

  return (
    <Modal
      title="Add participents"
      visible={modalVisibility}
      onCancel={handleCancel}
      width={1000}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>,
        <Button type="primary" onClick={() => {
          form.validateFields().then(d => onFinish(d)).catch(e => console.log('err', e))
        }}>Add participent</Button>,
      ]}
    >
      <Form
        name="basic"
        initialValues={{ options: [] }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
        style={{width: '600px', margin: '0 auto'}}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              label="Team name"
              name="teamName"
              rules={[{ required: true, message: "Please add a team name!" }]}
            >
              <Input/>
            </Form.Item>
          </Col>

          <Col span={12}>
            <span>Password: {password}</span>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddRounds;
