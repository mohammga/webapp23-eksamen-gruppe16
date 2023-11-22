"use client"

import { useState, FormEvent } from "react"

interface Spørsmål {
  text: string;
}

interface SpørsmålFormProps {
  spørsmålListe: Spørsmål[];
}

export default function QuestionForm({ spørsmålListe }: SpørsmålFormProps) {
  const [steps, setSteps] = useState(0) //Progress i Submitten
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answerIndex, setAnswerIndex] = useState(0) //Viser hvilket svar som skal brukes

  const [newQuestion, setNewQuestion] = useState(false)

  const [saveQuestion, setSaveQuestion] = useState("")
  const [saveAnswer, setSaveAnswer] = useState("")

  const [errorText, setErrorText] = useState("")
  const [hasSubmitted, setHasSubmitted] = useState(false)


  const handleQuestionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let selectedValue = event.target.value;
    let val = parseInt(selectedValue)
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
    let answerSplit = selectedAnswer.split(";")
    let answerValue = answerSplit[1]
    let answerKey = parseInt(answerSplit[0])
    setSaveAnswer(answerValue)
    setAnswerIndex(answerKey)
    handleSteps(questionIndex, answerKey);
  };

  const handleSteps = (quesProgress: number, answProgress: number, newQuestionString: string = "") => {
    setErrorText("")

    console.log("Question progress" + quesProgress)
    console.log("Answer progress" + answProgress)
    let newStepsValue = 0
    let newAnswerValue = 0
    let newQuestionValue = false

    console.log("Question alternativ: " + newQuestionValue)

    if (quesProgress !== questionIndex) { //Endret type spørsmål 
      console.log("SPØRSMÅL ENDRET")
      if (quesProgress === 0) { //Standard svar
        console.log("Valgt svar 'Standard'")
        newStepsValue = 0
        newAnswerValue = 0
      } else if (quesProgress === 1) { //Opprett nytt spørsmål
        console.log("Valgt svar 'Opprett ny'")
        newQuestionValue = true
        newAnswerValue = 0

      } else { //Template svar
        newStepsValue = 1
        newAnswerValue = 0
      }
    } else {
      if (quesProgress === 1) {
        newQuestionValue = true
        if (newQuestionString.length >= 5) { //Nytt spørsmål har hvertfall 5 bokstaver
          console.log("Valgt svar 'Template'")
          newStepsValue = 1
          } else {          
            newStepsValue = 0
          }
      }      
    }

    
    if (answProgress !== answerIndex) { //Endret type svaralternativ 
      console.log("SVARALTERNATIV ENDRET")
      newAnswerValue = 0
      newStepsValue = 1
      if (answProgress !== 0) { //Gitt et svaralternativ som ikke er "velg" answer0
        newStepsValue = 2
        newAnswerValue = answProgress
      }

    }
    console.log("Question alternativ tilstutt: " + newQuestionValue)
      
    setSteps(newStepsValue)
    setAnswerIndex(newAnswerValue)
    if (newAnswerValue === 0) {
      setSaveAnswer("")
    }
    setNewQuestion(newQuestionValue)
  }

  const handleWriteQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value
    setSaveQuestion(value)
    handleSteps(questionIndex, answerIndex, value)
  }

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (questionIndex < 1) {
      setErrorText("Du må velge et spørsmål, eller opprette et nytt før du lagrer dataen");
    } else if (questionIndex === 1 && saveQuestion.length < 5) {
      setErrorText("Et nytt spørsmål må minimum ha 5 tegn for å kunne opprettes");
    } else if (answerIndex < 1) {
      setErrorText("Du må velge et svaralternativ før du lagrer dataen");
    } else if (saveQuestion.length < 1) {
      setErrorText("Spørsmål er ikke lagret");
    } else if (saveAnswer.length < 1) {
      setErrorText("Svar er ikke lagret");
    } else {
      //Send skjema som er validert og ferdig
      console.log('Sender skjema...', { saveQuestion, saveAnswer });
      setErrorText("")
      setHasSubmitted(true)
    }
  };
  
  
  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-8 rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">Legg til spørsmål</h1>
      
      
      <form className="space-y-4" onSubmit={submitForm}>
      <div>
          <label htmlFor="questionType" className="block text-md font-medium text-gray-700">
            Velg et spørsmål
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
            {spørsmålListe.map((spørsmål, index) => (
              <option key={index + 2} value={index + 2}>
                {spørsmål.text}
              </option>
            ))}
          </select>
        </div>
        {newQuestion ? (
        <div>
          <label htmlFor="questionText" className="block text-md font-medium text-gray-700">
            Oprett nytt spørsmål
          </label>
          <input
            type="text"
            id="questionText"
            name="questionText"
            placeholder="Spørsmålstekst..."
            onChange={handleWriteQuestion}
            minLength={5}
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
            Spørsmålstype (Alternativ)
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
            <option value="3;radio:mood">Radio med emojier</option>
          </select>
        </div>
        ) : (
          null
        )}

        {steps >= 2 ? (
            <div>
              Brukeren vil kunne svare med:
              {answerIndex === 1 ? (
                // Innhold for når answerType === 1
                <div>
                  <input type="text" placeholder="Svar på spørsmål"></input>
                </div>
              ) : answerIndex === 2 ? (
                // Innhold for når answerType === 2
                <div>
                  <ul>
                    {Array.from({ length: 10 }, (_, i) => (
                      <li className="flex items-center mb-2" key={i}>
                        <label>
                          <input type="radio" name="numericRating" value={i + 1} />
                          {i + 1}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : answerIndex === 3 ? (
                // Innhold for når answerType === 3
                <ul>
                  <li className="flex items-center mb-2">
                    <label>
                      <input type="radio" name="emojiRating" value=";(" />
                      {"😢"}
                    </label>
                  </li>
                  <li className="flex items-center mb-2">
                    <label>
                      <input type="radio" name="emojiRating" value=":(" />
                      {"🙁"}
                    </label>
                  </li>
                  <li className="flex items-center mb-2">
                    <label>
                      <input type="radio" name="emojiRating" value=":|" />
                      {"😐"}
                    </label>
                  </li>
                  <li className="flex items-center mb-2">
                    <label>
                      <input type="radio" name="emojiRating" value=":)" />
                      {"😊"}
                    </label>
                  </li>
                  <li className="flex items-center mb-2">
                    <label>
                      <input type="radio" name="emojiRating" value="=)" />
                      {"😃"}
                    </label>
                  </li>
                </ul>

              ) : null}

            </div>
            
          ) : null
        }

        <p className="text-red-500">{errorText}</p>

        <button
          type="submit"
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
        >
          Legg til spørsmål
        </button>      
      </form>
      {hasSubmitted ? (
        <div>
          Json vil se slik ut:
          <pre>            
            {JSON.stringify({
              questions: [
                {
                  id: "124",
                  question: saveQuestion,
                  type: saveAnswer
                }
              ]
            }, null, 2)}
          </pre>
        </div>
      ): (null)}
    </div>
  )
}