import { useState } from "react"

export default function useProgress() {
  const [count, setCount] = useState(0)
  const [current, setCurrent] = useState(0)
  const [failed, setFailed] = useState(false)
  const [savedForsøk, setSavedForsøk] = useState([1])

  const next = () => {
    //Skal ikke kunne kjøre med mindre svaret er riktig
    //Her skal count resettes og bruker sendes videre
    const updatedSavedForsøk = [...savedForsøk];
    updatedSavedForsøk[current] = count;
    setSavedForsøk(updatedSavedForsøk);


    /**if (count < 3) {
      setCurrent(current + 1)
      setCount(count + 1)
    } */
    setCurrent(current + 1)
    setCount(0)
    setFailed(false)

  }

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

  return { count, current, failed, next, setError, changeCount}
}
