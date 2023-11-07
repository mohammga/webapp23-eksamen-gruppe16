"use client";

import { useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Progress from "@/components/Progress";
import { Task } from "@/types";


type TasksProps = {
  current: number
  next: () => void
  setError: () => void
  resetCount: () => void
  tasks: Task[]
}

export default function Answer({ tasks, current, setError, resetCount, next }: TasksProps) {
  const [correct, setCorrect] = useState(false)
  const [message, setMessage] = useState("")

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    answer: Yup.number()
      .required("Svar er påkrevd")
  })

  const correctAnswer = eval(tasks[current].data)

  const handleSubmit = async (
    values: { answer: string },
    actions: FormikHelpers<{ answer: string }>, // Include 'actions' parameter
  ): Promise<void> => {
    if (values.answer === correctAnswer) {
      setCorrect(true)
      setMessage("Bra jobbet!")
      resetCount()
      actions.resetForm() // Use 'actions.resetForm()' to reset the form
    } else {
      setCorrect(false)
      setError()
      setMessage("")
      actions.resetForm() // Use 'actions.resetForm()' to reset the form
    }
    actions.setSubmitting(false) // Use 'actions.setSubmitting()' to update the submitting state
  }



  return (
    <div className="flex flex-col">
      <label htmlFor="answer">Svar</label>
      <Formik
        initialValues={{ answer: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, handleChange, handleBlur, values, isSubmitting }) => (
        <Form>
          <Field
            type="number"
            name="answer"
            placeholder="Sett svar her"
            onChange={handleChange}
            onBlur={handleBlur}     
          />
          <ErrorMessage name="answer" component="div" className="error" />
          <p>{message}</p>
          {!correct && (
            <button className="rounded-sm bg-black text-white" type="submit" disabled={isSubmitting}>
              Sjekk svar
            </button>
          )}
          {correct && <Progress next={next} current={current} />}
        </Form>
      )}
      </Formik>
    </div>
  )
}