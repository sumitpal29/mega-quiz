import React from "react";
import _noop from "lodash/noop";
import _head from "lodash/head";
import _get from "lodash/get";

import { Form, Input } from "antd";
import PropTypes from "prop-types";



const CreateGameForm = ({ onFieldChange }) => {
  return (
    <Form
      name="creategame"
      initialValues={{ remember: true }}
      onFieldsChange={(_) => {
        onFieldChange(_get(_head(_), 'value'));
      }}
      autoComplete="off"
    >
      <Form.Item
        label="Game Name"
        name="gameName"
        rules={[{ required: true, message: "Please input your game name!" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default CreateGameForm;

CreateGameForm.propTypes = {
  onFieldChange: PropTypes.func,
};

CreateGameForm.defaultProps = {
  onFieldChange: _noop,
};
