
type ResultProps = {
    operationToPractice: string;
    poeng: number;
    setCurrent: Function;
  };

 const Result: React.FC<ResultProps> = ({ operationToPractice, poeng, setCurrent}) => {

  const handleRestartQuiz = () => {
    setCurrent(0);
  };
  //Her skal results kjøre en funksjon i useProgress, som ser igjennom oppgavene, teller hvilke som kandidaten har:
  /*
  - Har mest feil på
  */
  

  return (
    <div className="flex items-center py-20">
    <div className="bg-gray-200 p-8 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Totalt poengsum: {poeng} </h2>
      <p>Kandidaten må øve mer på temaet: {operationToPractice} </p>
      <button onClick={handleRestartQuiz} className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md">
        Start på nytt
      </button>
    </div>
  </div>
  )
}
export default Result;
