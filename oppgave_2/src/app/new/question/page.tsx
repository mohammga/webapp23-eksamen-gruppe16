import QuestionForm from "@/components/QuestionForm";

export default function Home() {
  
  const spørsmålData = [
    { text: "Hvor krevende var økten?" },
    { text: "Hvordan var kvaliteten og varigheten på søvnen før dagens økt?" },
    { text: "Hvor godt restituert var du før økten?" },
    { text: "Grad av muskelsårhet?" },
    { text: "Hvordan påvirket omgivelsene / terrenget gjennomføring av økten?" },
    { text: "Hvordan var stressnivået før dagens økt?" },
    { text: "Hvordan var treningsfølelsen?" }
  ];
  
  
  return (
    <>
    <QuestionForm spørsmålListe={spørsmålData} />
    </>
  )
}