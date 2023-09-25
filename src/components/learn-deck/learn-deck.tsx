import { FC, useState } from 'react'

import { clsx } from 'clsx'
import { v4 } from 'uuid'

import s from './learn-deck.module.scss'

import { Button, Card, GradeType, RadioGroup, Typography } from '@/components'

type Props = {
  packName: string
  question: string
  attempts: string | number
  answer: string
  loadNextQuestion: (grade: GradeType) => void
}

export const LearnDeck: FC<Props> = ({
  packName,
  question,
  attempts,
  answer,
  loadNextQuestion,
}) => {
  const [showAnswer, setShowAnswer] = useState(false)

  const classNames = {
    container: clsx(s.container),
    question: clsx(s.question),
    attempts: clsx(s.attempts),
    answer: clsx(s.answer),
  }
  const hideAnswer = () => {
    setShowAnswer(false)
  }

  return (
    <Card className={classNames.container}>
      <Typography variant={'large'} style={{ textAlign: 'center' }}>
        Learn {packName}
      </Typography>
      <Typography variant={'body1'} className={classNames.question}>
        <Typography variant={'subtitle1'}>Question: </Typography>
        {question}
      </Typography>
      <Typography variant={'body2'} className={classNames.attempts}>
        Number of attempts to answer the question: {attempts}
      </Typography>
      {!showAnswer ? (
        <Button
          variant={'primary'}
          className={classNames.answer}
          onClick={() => setShowAnswer(true)}
          fullWidth
        >
          Show Answer
        </Button>
      ) : (
        <AnswerFeedback
          hideAnswer={hideAnswer}
          answer={answer}
          loadNextQuestion={loadNextQuestion}
        />
      )}
    </Card>
  )
}

type AnswerFeedbackPropsType = {
  answer: string
  loadNextQuestion: (grade: GradeType) => void
  hideAnswer: () => void
}

const AnswerFeedback: FC<AnswerFeedbackPropsType> = props => {
  const { answer, loadNextQuestion, hideAnswer } = props
  const [value, setValue] = useState('1')
  const classNames = {
    answer: clsx(s.answer),
    feedback: clsx(s.feedback),
    next: clsx(s.next_question),
    radioGroup: s.radioGroup,
  }
  const items = [
    { id: v4(), label: 'Did not know', value: '1' },
    { id: v4(), label: 'Forgot', value: '2' },
    { id: v4(), label: 'A lot of thought', value: '3' },
    { id: v4(), label: 'Confused', value: '4' },
    { id: v4(), label: 'Knew the answer', value: '5' },
  ]
  const nextQuestion = () => {
    hideAnswer()
    loadNextQuestion(+value as GradeType)
  }

  return (
    <>
      <Typography variant={'body1'} className={classNames.answer}>
        <Typography variant={'subtitle1'}>Answer: </Typography>
        {answer}
      </Typography>
      <Typography variant={'subtitle1'} className={classNames.feedback}>
        Rate yourself:
      </Typography>
      <RadioGroup
        items={items}
        className={classNames.radioGroup}
        onChange={setValue}
        value={value}
      />
      <Button variant={'primary'} className={classNames.next} onClick={nextQuestion} fullWidth>
        Next Question
      </Button>
    </>
  )
}
