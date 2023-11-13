"use client";

import { useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";



import Progress from "@/components/Progress";
import useProgress from "@/hooks/useProgress";
import { Task } from "@/types";


type TasksProps = {
  current: number
  next: () => void
  previous: () => void
  setError: () => void
  changeCount: () => void
  setCorrect: Function
  leggPoeng: () => void
  poeng: number
  task: Task
  failed: boolean
  correct: boolean
}

export default function Answer({ task, current, failed, correct, setError, changeCount, setCorrect, next, previous, poeng, leggPoeng }: TasksProps) {
  const [message, setMessage] = useState("")



  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    answer: Yup.number()
      .required("Svar er påkrevd")
  })

  const correctAnswer = eval(task.data)

  const handleSubmit = async (
    values: { answer: string },
    actions: FormikHelpers<{ answer: string }>, // Include 'actions' parameter
  ): Promise<void> => {
    if (values.answer === correctAnswer) {
      setCorrect(true)
      setMessage("Bra jobbet!")
      leggPoeng()
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

  console.log(`Correct answer? is: ${correct}`);
  // For current
  console.log(`Current index is: ${current}`);

  // For failed (assuming it's a boolean state)
  console.log(`Has the current attempt failed? ${failed}`);
  console.log(`poeng: ${poeng}`)

  return (
    <div className="flex flex-col">
      <label htmlFor="answer">Svar</label>
      <Formik
  initialValues={{ answer: "" }}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {({ errors, handleChange, handleBlur, values, isSubmitting }) => (
    <Form className="flex-col">
      <Field
        type="number"
        name="answer"
        placeholder="Sett svar her"
        onChange={handleChange}
        onBlur={handleBlur}
        className="p-2 border rounded-md"
      />
      <ErrorMessage name="answer" component="div" className="error" />
      <p>{message}</p>
      {!correct && !failed && (
        <button className="mt-2 rounded-sm bg-black text-white p-2" type="submit" disabled={isSubmitting}>
          Sjekk svar {`(${poeng} poeng)`}
        </button>
      )}
      {failed && (
        <>
          <button className="mt-2 rounded-sm bg-black text-white p-2" type="button" onClick={visFasit}>
            Du fikk feil 3 ganger. Trykk for å sjekke fasiten!
          </button>
          <br />
          <span id="fasit"></span>
        </>
      )}
      {(correct || failed) && (
        <Progress next={next} previous={previous} current={current} />
      )}
  
    </Form>
  )}
</Formik>
    </div>
  )
}