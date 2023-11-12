import { useState } from "react"
import { N } from "vitest/dist/reporters-5f784f42"

export default function useProgress() {
  const [count, setCount] = useState(0)
  const [current, setCurrent] = useState(0)
  const [failed, setFailed] = useState(false)
  const [savedForsøk, setSavedForsøk] = useState([1])
  const [correct, setCorrect] = useState(false)
  const [rightAnswers, setRightAnswers] = useState([false])
  const [poeng, setPoeng] = useState(0)

  const next = () => {
    let nextCurrent = current + 1
    setCorrect(false)
    setFailed(false); // Assuming setFailed is a state setter you have defined elsewhere
    // Check if the answer at the current index already exists
    if (savedForsøk[nextCurrent] !== undefined) {
      // Set count to the number at the current index of savedForsøk
      setCount(savedForsøk[nextCurrent]);
      setFailed(rightAnswers[nextCurrent]);

    } else {
      // If it doesn't exist, save the current count to the savedForsøk at the current index
      const updatedSavedForsøk = [...savedForsøk];
      updatedSavedForsøk[current] = count;
      setSavedForsøk(updatedSavedForsøk);
      const updatedAnswers = [...rightAnswers]
      updatedAnswers[current] = !failed;
      setRightAnswers(updatedAnswers)
      setCount(0); // Reset count as per your comment
    }
  
    // Move to the next question
    setCurrent(nextCurrent);
  };

  const previous = () => {
    let lastCurrent = current - 1
    // Ensure that current does not go below 0
    if (lastCurrent > 0) {
      // Decrement current to move to the previous question
      setCurrent(lastCurrent);
      setFailed(rightAnswers[lastCurrent])
      
      // Set count to the value at the new current index of savedForsøk
      // Assuming that savedForsøk has a default value for each 'current' index
      setCount(savedForsøk[lastCurrent]);
    } else {
      // Handle the case where current is already at 0
      // Perhaps by doing nothing or displaying a message
      console.log('Already at the first question');
    }
  };

  const changeCount = () => {
    if (count >= 2) {
      setFailed(true)
    } else {      
    setCount(count + 1)
    }
  }

  const setError = () => {
    if (count < 3) {
      setCount(count + 1)
    }
  }
  const leggPoeng = () =>{
    setPoeng(poeng + 1)
  }

  return {leggPoeng, poeng, count, current, correct, failed, next, previous, setCorrect, setError, changeCount}
}
