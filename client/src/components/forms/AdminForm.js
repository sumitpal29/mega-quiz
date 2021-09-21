import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
import _noop from "lodash/noop";

const AdminForm = ({ onSubmit, header, submitButtonLabel }) => {
  const onFinish = (values = {}) => {
    console.log("Success:", values);
    onSubmit(values);
  };

  const onFinishFailed = (errorInfo = {}) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h1>{header}</h1>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          // rules={[{ required: true, message: "Please input your username!" }]}
          rules={[
            {
              validator: async (value) => {
                console.log(value);
                // const options = form.getFieldValue('options');
                // if (_size(options) < 2 && fieldVisibility.mcq) {
                //   return Promise.reject(new Error("Atleast add two options"));
                // }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item style={{ textAlign: "center"}}>
          <Button type="primary" htmlType="submit">
            {submitButtonLabel}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AdminForm;

AdminForm.propTypes = {
  onSubmit: PropTypes.func,
  header: PropTypes.string,
  submitButtonLabel: PropTypes.string,
};

AdminForm.defaultProps = {
  onSubmit: _noop,
  header: '',
  submitButtonLabel: ''
};
