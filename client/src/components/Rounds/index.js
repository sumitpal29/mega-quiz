import React, { useState, useMemo, useEffect } from "react";
import _get from "lodash/get";
import _isEmpty from 'lodash/isEmpty';
import _size from 'lodash/size';
import { Table } from "antd";

import AddQuesionsModal from "../modals/AddQuestions";

import { getRoundTableColumn, getQuestionsColumns } from "./rounds.tableStructure";
import { useGameContext } from '../../contexts/GameContext'

function Rounds({ dataSource = {}, roundIndex }) {
  const { addQuestions, getQuestions, deleteQuestion, updateQuestion } = useGameContext();
  const [isAddQusetionModalVisible, setisAddQusetionModalVisible] = useState(false);
  const [editQuestion, setEditQuestion] = useState(null);
  const questions = getQuestions(roundIndex);

  const hideAddQustionsModal = () => {
    setisAddQusetionModalVisible(false)
  };
  const handleAddQustionModalSubmit = (question) => {
    if(_isEmpty(editQuestion)) {
      addQuestions(roundIndex, question)
    } else {
      const index = _get(editQuestion, 'questionIndex');
      updateQuestion({ roundIndex, questionIndex: index, question});
      setEditQuestion(null);
    }
    hideAddQustionsModal();
  };
  const showAddQustionsModal = () => { setEditQuestion(null); setisAddQusetionModalVisible(true) };
  const handleDeleteQuestion = ({questionIndex}) => deleteQuestion({ roundIndex, questionIndex});
  const handleEditQuestion = ({questionIndex}) => {
    setEditQuestion({
      questionIndex,
      question: questions[questionIndex],
    });
    setisAddQusetionModalVisible(true)
  };
  
  
       
  return (
    <div style={{ width: "70%", margin: "0 auto" }}>
      <h3 style={{ color: 'blue' }}>Round name: {_get(dataSource, "roundname", "")}</h3>
      <Table
        dataSource={[dataSource]}
        columns={getRoundTableColumn(showAddQustionsModal)}
        bordered
        size="middle"
        scroll={{ x: "calc(700px + 50%)", y: 240 }}
      />
      <h3 style={{ color: 'blue' }}>No of questions added: {_size(questions)}</h3>
      <Table
        dataSource={[...questions]}
        columns={getQuestionsColumns(handleEditQuestion, handleDeleteQuestion)}
        bordered
        size="middle"
        scroll={{ x: "calc(700px + 5%)", y: 240 }}
      />
      <AddQuesionsModal
        roundData={dataSource}
        isAddQusetionModalVisible={isAddQusetionModalVisible}
        onSubmit={handleAddQustionModalSubmit}
        hideModal={hideAddQustionsModal}
        edit={editQuestion}
      />
    </div>
  );
}

export default Rounds;
