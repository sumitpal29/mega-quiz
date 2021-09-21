import React, { useState, useEffect } from "react";
import _map from "lodash/map";
import _get from "lodash/get";
import _head from "lodash/head";
import _isEmpty from "lodash/isEmpty";
import {
  Modal,
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  InputNumber,
} from "antd";

import {
  ROUND_DIRECTION,
  ROUND_TYPES,
  TIME_LIMIT,
  ELIMINATION_CONTROL,
  ON_TIME_OUT,
  ANSWERED_BY,
  QUESTION_OCCURANCE,
  QUESTION_ASKED,
  ON_ANSWER_SUBMIT,
} from "../../../constants/game";

const defaultData = {
  answeredBy: "SINGLE",
  bonus: 5,
  negetive: 0,
  onAnswerSubmit: "AUTO_MATCH_ANSWER",
  onTimeOut: "DO_NOTHING",
  questionAsked: "PARTICIPENT_WISE",
  questionOccurance: "clockwise",
  roundDirection: true,
  score: 10,
  timeLimit: 60000,
  eliminationControl: false,
  eliminationCount: "0",
  roundtype: "MCQ",
};

function AddRounds({
  roundData = null,
  isAddRoundModalVisible,
  onSubmit,
  hideModal,
}) {
  const [round, setRound] = useState(roundData);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!_isEmpty(roundData)) {
      form.setFieldsValue(roundData);
    }
  }, [roundData]);

  const onFinish = (values = {}) => {
    form.resetFields();
    onSubmit(values, round);
  };

  const onFinishFailed = (errorInfo = {}) => {
    console.log("Failed:", errorInfo);
  };

  const handleCancel = () => hideModal();

  const handleFormChange = (input) => {
    const field = _head(_get(_head(input), "name", []));
    const value = _get(_head(input), "value", []);
    setRound((o) => ({ ...o, [field]: value }));
  };

  return (
    <>
      <Modal
        title="Create new Game"
        visible={isAddRoundModalVisible}
        onCancel={handleCancel}
        width={1200}
        onOk={() => {
          const x = form.validateFields();
          console.log(x)
        }}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button onClick={() => {
            form.validateFields().then(d => onFinish(d)).catch(e => console.log('err', e))
          }}>Add Round</Button>,
        ]}
      >
        <Form
          name="rounds"
          form={form}
          initialValues={defaultData}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          onFieldsChange={handleFormChange}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                label="Round Name"
                name="roundname"
                rules={[
                  { required: true, message: "Please input round name!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label="Round Type"
                name="roundtype"
                rules={[
                  { required: true, message: "Please select a round type" },
                ]}
              >
                <Select>
                  {_map(ROUND_TYPES, (opt) => (
                    <Select.Option value={opt.value}>{opt.label}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label="Elimination Control"
                name="eliminationControl"
                rules={[
                  { required: true, message: "Please select a round type" },
                ]}
              >
                <Select>
                  {_map(ELIMINATION_CONTROL, (opt) => (
                    <Select.Option value={opt.value}>{opt.label}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Elimination count at the round end"
                name="eliminationCount"
                rules={[
                  { required: true, message: "Please select a round type" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label="On Time out"
                name="onTimeOut"
                rules={[
                  { required: true, message: "Please select a round type" },
                ]}
              >
                <Select>
                  {_map(ON_TIME_OUT, (opt) => (
                    <Select.Option value={opt.value}>{opt.label}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Round Direction"
                name="roundDirection"
                rules={[
                  { required: true, message: "Please select a round type" },
                ]}
              >
                <Select>
                  {_map(ROUND_DIRECTION, (opt) => (
                    <Select.Option value={opt.value}>{opt.label}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label="Answered By"
                name="answeredBy"
                rules={[
                  { required: true, message: "Please select a round type" },
                ]}
              >
                <Select>
                  {_map(ANSWERED_BY, (opt) => (
                    <Select.Option value={opt.value}>{opt.label}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Question Occurance"
                name="questionOccurance"
                rules={[
                  { required: true, message: "Please select a round type" },
                ]}
              >
                <Select>
                  {_map(QUESTION_OCCURANCE, (opt) => (
                    <Select.Option value={opt.value}>{opt.label}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label="Time limit"
                name="timeLimit"
                rules={[
                  { required: true, message: "Please select a round type" },
                ]}
              >
                <Select>
                  {_map(TIME_LIMIT, (opt) => (
                    <Select.Option value={opt.value}>{opt.label}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Questions asked"
                name="questionAsked"
                rules={[
                  {
                    required: true,
                    message: "How many questions should be asked in this round",
                  },
                ]}
              >
                <Select>
                  {_map(QUESTION_ASKED, (opt) => (
                    <Select.Option value={opt.value}>{opt.label}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label="On Answer Submit"
                name="onAnswerSubmit"
                rules={[
                  {
                    required: true,
                    message:
                      "On Answer submit by the participent how to judge the answer",
                  },
                ]}
              >
                <Select>
                  {_map(ON_ANSWER_SUBMIT, (opt) => (
                    <Select.Option value={opt.value}>{opt.label}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Score Point"
                name="score"
                rules={[
                  { required: true, message: "Points given on right answer" },
                ]}
              >
                <InputNumber min={0} max={20} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label="Bonus Marks"
                name="bonus"
                rules={[{ required: true, message: "Bonus answer points" }]}
              >
                <InputNumber min={0} max={20} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Negetive Marks"
                name="negetive"
                rules={[{ required: true, message: "Negetive marks count" }]}
              >
                <InputNumber min={0} max={20} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default AddRounds;
