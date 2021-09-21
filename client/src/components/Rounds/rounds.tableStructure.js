import { Button } from 'antd';

export const getRoundTableColumn = (addQuestions, editRound, removeRound) => ([
  {
    title: "Answered By",
    dataIndex: "answeredBy",
    key: "answeredBy",
    width: 150,
  },
  {
    title: "Bonus",
    dataIndex: "bonus",
    key: "bonus",
    width: 150,
  },
  {
    title: "elimination Control",
    dataIndex: "eliminationControl",
    key: "eliminationControl",
    width: 150,
  },
  {
    title: "elimination Count",
    dataIndex: "eliminationCount",
    key: "eliminationCount",
    width: 150,
  },
  {
    title: "negetive marks",
    dataIndex: "negetive",
    key: "negetive",
    width: 150,
  },
  {
    title: "on Answer Submit",
    dataIndex: "onAnswerSubmit",
    key: "onAnswerSubmit",
    width: 150,
  },
  {
    title: "NonTimeOutame",
    dataIndex: "onTimeOut",
    key: "onTimeOut",
    width: 150,
  },
  {
    title: "question Asked",
    dataIndex: "questionAsked",
    key: "questionAsked",
    width: 150,
  },
  {
    title: "question Occurance",
    dataIndex: "questionOccurance",
    key: "questionOccurance",
    width: 150,
  },
  {
    title: "round Direction",
    dataIndex: "roundDirection",
    key: "roundDirection",
    width: 150,
  },
  {
    title: "round type",
    dataIndex: "roundtype",
    key: "roundtype",
    width: 150,
  },
  {
    title: "score",
    dataIndex: "score",
    key: "score",
    width: 150,
  },
  {
    key: "time Limit",
    title: "timeLimit",
    dataIndex: "timeLimit",
    width: 150,
  },
  {
    title: "Add Questions",
    key: "addquestions",
    fixed: "right",
    width: 150,
    render: () => <Button type="primary" onClick={addQuestions}>Add Questions</Button>,
  },
  {
    title: "Edit",
    key: "edit",
    fixed: "right",
    width: 100,
    render: () => <Button onClick={editRound}>Edit</Button>,
  },
  {
    title: "Delete",
    key: "delete",
    fixed: "right",
    width: 100,
    render: () => <Button type="danger" onClick={removeRound}>Delete</Button>,
  },
]);

export const getQuestionsColumns = (editQuestion, removeQuestion) => ([
  {
    title: "Quesions",
    dataIndex: "question",
    key: "question",
    width: 200,
  },
  {
    title: "Answers",
    dataIndex: "answer",
    key: "answer",
    width: 150,
  },
  {
    title: "Edit",
    key: "edit",
    fixed: "right",
    width: 100,
    render: (text, record, index) => <Button onClick={() => editQuestion({questionIndex: index})}>Edit</Button>,
  },
  {
    title: "Delete",
    key: "delete",
    fixed: "right",
    width: 100,
    render: (_, __, index) => <Button type="danger" onClick={() => removeQuestion({questionIndex: index})}>Delete</Button>,
  },
])