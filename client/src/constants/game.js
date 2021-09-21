export const ROUND_TYPES = [
  {
    label: "MCQ",
    value: "MCQ"
  },
  {
    label: "Custom",
    value: "CUSTOM"
  },
  {
    label: "Qustion with Image and answer",
    value: "Q_AIMAGE"
  },
  {
    label: "Qustion with Audio and answer",
    value: "Q_AAUDIO"
  },
  {
    label: "Qustion with Video and answer",
    value: "Q_AVIDEO"
  },
  {
    label: "Qustion with Image and MCQ",
    value: "Q_MCQ_IMAGE"
  }
];

export const ROUND_CONFIG = {
  MCQ: {
    mcq: true
  },
  CUSTOM: {
    mcq: true,
    image: true,
    audio: true,
    video: true
  },
  Q_AIMAGE: {
    image: true,
  },
  Q_AAUDIO: {
    audio: true,
  },
  Q_AVIDEO: {
    video: true
  },
  Q_MCQ_IMAGE: {
    mcq: true,
    image: true,
  }
}

export const ELIMINATION_CONTROL = [
  {
    label: "AUTO",
    value: false
  },
  {
    label: "ADMIN",
    value: true
  }
];

export const ROUND_DIRECTION = [
  {
    label: "Clockwise",
    value: true
  },
  {
    label: "Anti-ClockWise",
    value: false
  }
];

export const ANSWERED_BY = [
  {
    label: "Every on at once",
    value: 'BUZZER'
  },
  {
    label: "Single Person/Group",
    value: "SINGLE"
  }
];

export const ON_TIME_OUT = [
  {
    label: "Do Nothing",
    value: 'DO_NOTHING'
  },
  {
    label: "PASS TO NEXT",
    value: "PASS_TO_NEXT"
  },
  {
    label: "Negetive mark",
    value: "NEGETIVE_MARK"
  },
  {
    label: "Pass and Negetive mark",
    value: "PASS_AND_NEGETIVE_MARK"
  }
];

export const QUESTION_OCCURANCE = [
  {
    label: "Random",
    value: 'random'
  },
  {
    label: "Clockwise",
    value: "clockwise"
  },
  {
    label: "Anti-clockwise",
    value: "anticlockwise"
  }
];

export const TIME_LIMIT = [
  {
    label: "None",
    value: false
  },
  {
    label: "One Minute",
    value: 60000
  },
  {
    label: "Two Minute",
    value: 120000
  },
  {
    label: "One Minute and thirty seconds",
    value: 90000
  }
];

export const QUESTION_ASKED = [
  {
    label: 'All the participents once',
    value: 'PARTICIPENT_WISE'
  },
  {
    label: 'All question in given time',
    value: 'ALL_QUESTION_WITH_TIME'
  }
];

export const ON_ANSWER_SUBMIT = [
  {
    label: 'Auto Match Answer',
    value: 'AUTO_MATCH_ANSWER'
  },
  {
    label: 'Admin Control',
    value: 'ADMIN_CONTROL'
  }
]

