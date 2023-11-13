import React from 'react'
type ResultProps = {
    operationToPractice: string;
    poeng: number;
  };

 const Result: React.FC<ResultProps> = ({ operationToPractice, poeng}) => {

  console.log(`Poengsummen er: ${poeng}`);


  const handleRestartQuiz = () => {
    // Add a function to reset the state or fetch new tasks
    window.location.reload();
  };
  

  return (
    <div className="flex items-center py-20">
    <div className="bg-gray-200 p-8 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Totalt poengsum: {poeng} </h2>
      <p>Du må øve på multiplikasjonsregneoperasjonen: {operationToPractice} </p>
      <button onClick={handleRestartQuiz} className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md">
        Start på nytt quizen
      </button>
    </div>
  </div>
  )
}
export default Result;
