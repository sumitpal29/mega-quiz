import React from 'react'
import { Button, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, PlayCircleOutlined } from '@ant-design/icons';
import _size from 'lodash/size';
import styles from './gameCard.module.scss'

function GameCard({data, onClickEdit, onClickDelete}) {
  return (
    <div className={styles.gameCardContainer}>
      <h3>{data.gameName}</h3>
      <h4>No of rounds - {_size(data.gameRounds)}</h4>
      <h4>No of participents - {_size(data.gameParticipents)}</h4>
      <div className={styles.btnContainer}>
        <Tooltip title="Delete">
          <Button type="danger" shape="circle" onClick={onClickDelete} icon={<DeleteOutlined />} />
        </Tooltip>
        <Tooltip title="Edit">
          <Button type="primary" shape="circle" onClick={onClickEdit} icon={<EditOutlined />} />
        </Tooltip>
        <Tooltip title="Play">
          <Button type="danger" style={{ background: "#62bc63", borderColor: "yellow" }} shape="circle" onClick={onClickEdit} icon={<PlayCircleOutlined />} />
        </Tooltip>
      </div>
    </div>
  ) 
}

export default GameCard;
