import React, { useState, useEffect, useMemo } from "react";
import _get from "lodash/get";
import _map from "lodash/map";
import _size from "lodash/size";
import _reject from 'lodash/reject';
import _concat from 'lodash/concat';
import _isEmpty from 'lodash/isEmpty';

import { Modal, Row, Col, Form, Input, Button } from "antd";

import AddMCQ from "../AddMcq";

import { ROUND_CONFIG } from "../../../constants/game";

function AddRounds({ roundData, isAddQusetionModalVisible, onSubmit, hideModal, edit }) {
  const [form] = Form.useForm();
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const fieldVisibility = ROUND_CONFIG[_get(roundData, "roundtype", "MCQ")];
  const submitbtnText = useMemo(() => _isEmpty(edit) ? 'Add Question' : 'Update Question', [edit]);

  useEffect(() => {
    _isEmpty(edit) ? form.resetFields() : form.setFieldsValue({ ..._get(edit, 'question', {}) });
  }, [edit])


  const onFinish = (values = {}) => {
    onSubmit(values);
    hideModal();
    form.resetFields();
    setMcqQuestions([]);
  };

  const onFinishFailed = (errorInfo = {}) => {
    console.log("Failed:", errorInfo);
  };

  const handleCancel = () => hideModal();

  const handleMCQSubmit = (obj) => {
    const oldOptions = form.getFieldValue('options');
    const newOptions = _concat(oldOptions, obj);
    setMcqQuestions(newOptions)
    form.setFieldsValue({ options: newOptions});
  };

  const handleDeleteOption = (index) => {
    const oldOptions = form.getFieldValue('options');
    const newOptions = _reject(oldOptions, (_, i) => index === i);
    setMcqQuestions(newOptions)
    form.setFieldsValue({ options: newOptions});
  }

  return (
    <Modal
      title="Add new question"
      visible={isAddQusetionModalVisible}
      onCancel={handleCancel}
      width={1000}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>,
        <Button type="primary" onClick={() => {
          form.validateFields().then(d => onFinish(d)).catch(e => console.log('err', e))
        }}>{submitbtnText}</Button>,
      ]}
    >
      <Form
        name="basic"
        initialValues={{ options: [] }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
        style={{width: '800px', margin: '0 auto'}}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Question"
              name="question"
              rules={[{ required: true, message: "Please add a question!" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          shouldUpdate
          style={{ display: fieldVisibility.mcq ? "block" : "none" }}
          rules={[
            {
              validator: async () => {
                const options = form.getFieldValue('options');
                if (_size(options) < 2 && fieldVisibility.mcq) {
                  return Promise.reject(new Error("Atleast add two options"));
                }
              },
            },
          ]}
          label="Add Options"
          name="options"
        >
          <div style={{ padding: '10px 0'}}>
            {_map(mcqQuestions, (ob, index) => (
              <div style={{ width: '400px', display: 'flex', padding: '5px', alignItems: 'center'}} key={`${index}_mcq_${Math.random(2)}`}>
                {index}
                <div>{`: Answer displaying :  ${ob.label}  --   value is - ${ob.val}`}</div>
                <Button onClick={() => handleDeleteOption(index)} style={{marginLeft: 'auto'}} shape="circle" type="danger">-</Button>
              </div>
            ))}
          </div>
          <AddMCQ onSubmit={handleMCQSubmit} />
        </Form.Item>

        <Form.Item
          style={{ display: fieldVisibility.image ? "block" : "none" }}
          label="Image Link"
          name="imageLink"
          rules={[{ required: fieldVisibility.image, message: "Image Link" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ display: fieldVisibility.video ? "block" : "none" }}
          label="Video Link"
          name="videoLink"
          rules={[{ required: fieldVisibility.video, message: "Video Link" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ display: fieldVisibility.audio ? "block" : "none" }}
          label="Audio Link"
          name="audioLink"
          rules={[{ required: fieldVisibility.audio, message: "Audio Link" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Answer"
          name="answer"
          rules={[{ required: true, message: "Answer of the Qustion" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddRounds;
