import React from 'react';
import PropTypes from 'prop-types';
import _noop from 'lodash/noop';
import styles from './plus.module.scss';

function Plus({ onClickPlus }) {
  return (
    <div className={styles.plusContainer} role="presentation" onClick={onClickPlus} />
  )
}

Plus.propTypes = {
  onClickPlus: PropTypes.func
};

Plus.defaultProps = {
  onClickPlus: _noop,
}

export default Plus
