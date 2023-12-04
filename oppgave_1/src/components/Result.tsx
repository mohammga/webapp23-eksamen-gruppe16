import React from 'react';

type ResultProps = {
  operationToPractice: string;
  setCurrent: Function;
  maksPoeng: number;
  poeng: number;
};

const Result: React.FC<ResultProps> = ({ operationToPractice, maksPoeng, poeng }) => {

  const getTranslation = () => {
    switch (operationToPractice) {
      case 'multiply':
        return 'Multiplikasjon';
      case 'divide':
        return 'Divisjon';
      case 'add':
        return 'Addisjon';
      case 'subtract':
        return 'Subtraksjon';
      default:
        return operationToPractice;
    }
  };

  let tema = getTranslation()

  const handleRestartQuiz = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center py-20">
      <div className="bg-gray-200 p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Totalt poengsum: {poeng} av {maksPoeng} </h2>
        {tema === "Ingenting" ? (
          <p>Kandidaten fikk riktig på alt uten feilforsøk! Øv mer ved å ta en ny test!</p>
        ) : (
          <p>Kandidaten må øve mer på temaet: {tema} </p>
        )}
        <button
          onClick={handleRestartQuiz}
          className="bg-black text-white px-4 py-2 mt-4 rounded-md"
        >
          Start på nytt
        </button>
      </div>
    </div>
  );
};

export default Result;
