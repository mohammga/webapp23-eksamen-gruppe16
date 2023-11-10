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
  changeCount: () => void
  tasks: Task[]
  failed: boolean
}

export default function Answer({ tasks, current, failed, setError, changeCount, next }: TasksProps) {
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
      //resetCount()      //  -     Behøver ikke resette counten, dette gjøres i useProgress
      actions.resetForm() // Use 'actions.resetForm()' to reset the form
    } else {
      actions.resetForm() // Use 'actions.resetForm()' to reset the form      
      setCorrect(false)
      setError()
      changeCount()
      setMessage("")
      
    }
    actions.setSubmitting(false) // Use 'actions.setSubmitting()' to update the submitting state
  }

  const visFasit = () => {
      let svarelement = document.getElementById("fasit")
      if (svarelement != null) {
        svarelement.innerHTML = `Svaret er: ${correctAnswer}`
      }
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
          {!correct && !failed && (
            <button className="rounded-sm bg-black text-white" type="submit" disabled={isSubmitting}>
              Sjekk svar
            </button>
          )}
          {failed && (
            <>
            <button className="rounded-sm bg-black text-white" onClick={visFasit}>
              Du fikk feil 3 ganger. Trykk for å sjekke fasiten!
            </button> <br />
            <span id="fasit"></span>
            </>
          )}
          {(correct || failed) && (
            <Progress next={next} current={current} />
          )}
        </Form>
      )}
      </Formik>
    </div>
  )
}