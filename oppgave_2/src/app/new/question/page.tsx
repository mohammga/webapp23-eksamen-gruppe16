"use client"

import { useState } from "react"

export default function Home() {
  const [steps, setSteps] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answerIndex, setAnswerIndex] = useState(0)

  const [newQuestion, setNewQuestion] = useState(false)

  const [saveQuestion, setSaveQuestion] = useState("")
  const [saveAnswer, setSaveAnswer] = useState("")


  const handleQuestionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let selectedValue = event.target.value;
    let val = parseInt(selectedValue)
    console.log(val)
    let optionValue = event.target.options[event.target.selectedIndex].text
    setQuestionIndex(val)
    if (val === 1) {
      setSaveQuestion("")
    } else {
      setSaveQuestion(optionValue)
    }
    handleSteps(val, answerIndex);
  };
  
  const handleAnswerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let selectedAnswer = event.target.value;
    console.log(selectedAnswer)
    let answerSplit = selectedAnswer.split(";")
    console.log(answerSplit)
    let answerValue = answerSplit[1]
    let answerKey = parseInt(answerSplit[0])
    setSaveAnswer(answerValue)
    console.log("Answervalue: " + answerValue)
    console.log("Answerkey: " + answerKey)
    setAnswerIndex(answerKey)
    handleSteps(questionIndex, answerKey);
  };

  const handleSteps = (quesProgress: number, answProgress: number) => {
    console.log("HANDLES STEPS")

    if (quesProgress === 1) { //OPPRETT SPØRSMÅL ALTERNATIV
      setNewQuestion(true)

      if (saveQuestion.length > 1) {
        setSteps(1)

        if (answProgress !== 0) { //Har svart annet en basic svar
          setSteps(2)
          console.log("YES?")
          setAnswerIndex(answProgress)
          console.log(answProgress)
          console.log(answerIndex)
        }
      } else {      
        setSteps(0)
      }

    } else { //ALT UTENOM SVAR index 1
      if (quesProgress === 0) { //Hvis svaralternativ er basic "velg et svar"
        setSteps(0)
      } else { //Har valgt et spørsmål
        setSteps(1)

        if (answProgress !== 0) { //Har svart annet en basic svar
            setSteps(2)
            console.log("YES?")
            setAnswerIndex(answProgress)
            console.log(answProgress)
            console.log(answerIndex)
        }
      }
      setNewQuestion(false)
    }
  }

  const handleWriteQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value
    setSaveQuestion(value)
    handleSteps(questionIndex, answerIndex)
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Legg til spørsmål</h1>
      
      
      <form className="space-y-4">
      <div>
          <label htmlFor="questionType" className="block text-md font-medium text-gray-700">
            Velg eksisterenede spørsmål
          </label>
          <select
            id="questionTypeFromDb"
            name="questionTypeFromDb"
            required
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            onChange={handleQuestionChange}
          >
            <option value="0">Velg et spørsmål</option>
            <option value="1">OPPRETT ET NYTT SPØRSMÅL</option>
            <option value="2">Hvor krevende var økten?</option>
            <option value="3">Hvordan var kvaliteten og varigheten på søvnen før dagens økt?</option>
            <option value="4">Hvor godt restituert var du før økten?</option>
            <option value="5">Grad av muskelsårhet?</option>
            <option value="6">Hvordan påvirket omgivelsene / terrenget gjennomføring av økten?</option>
            <option value="7">Hvordan var stressnivået før dagens økt?</option>
            <option value="8">Hvordan var treningsfølelsen?</option>
          </select>
        </div>
        {newQuestion ? (
        <div>
          <label htmlFor="questionText" className="block text-md font-medium text-gray-700">
            Spørsmålstekst
          </label>
          <input
            type="text"
            id="questionText"
            name="questionText"
            onChange={handleWriteQuestion}
            value={saveQuestion}
            required
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        ) : (
          null
        )}

        {steps >= 1 ? (
          <div>
          <label htmlFor="questionType" className="block text-md font-medium text-gray-700">
            Spørsmålstype
          </label>
          <select
            id="questionType"
            name="questionType"
            required
            onChange={handleAnswerChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="0;">Velg en type</option>
            <option value="1;text">Tekst</option>
            <option value="2;radio:range">Radio med tallene 1-10</option>
            <option value="3;radio:emoji">Radio med emojier</option>
          </select>
        </div>
        ) : (
          null
        )}

        {steps >= 2 ? (
            
            <div>
              
              {/* Dette innholdet vises når steps === 2 */}

              {answerIndex === 1 ? (
                // Innhold for når answerType === 1
                <div>
                  <input type="text" placeholder="Svar"></input>
                </div>
              ) : answerIndex === 2 ? (
                // Innhold for når answerType === 2
                <div>
                  <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>8</li>
                    <li>9</li>
                    <li>10</li>
                  </ul>              
                </div>
              ) : answerIndex === 3 ? (
                // Innhold for når answerType === 3
                <ul>
                  <li>{"😢"}</li>
                  <li>{"🙁"}</li>
                  <li>{"😐"}</li>
                  <li>{"😊"}</li>
                  <li>{"😃"}</li>
                </ul>
              ) : null}

              {/* Her kan du legge til annet innhold som alltid skal vises når steps === 2 */}
            </div>
            
          ) : null
        }

        <div>
          <p>Question key: {questionIndex}</p>
          <p>Answer key: {answerIndex}</p>
        </div>

        <div>
          <p>            
            json:
            {JSON.stringify({
              questions: [
                {
                  id: "124",
                  question: saveQuestion,
                  type: saveAnswer
                }
              ]
            }, null, 2)}
          </p>
        </div>



        {/* Knapp for å legge til spørsmålet */}
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Legg til spørsmål
        </button>
      </form>
    </div>
  )
}
