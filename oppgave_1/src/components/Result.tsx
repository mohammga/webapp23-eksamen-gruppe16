import React from 'react';

type ResultProps = {
  operationToPractice: string;
  poeng: number;
  setCurrent: Function;
};

const Result: React.FC<ResultProps> = ({ operationToPractice, poeng, setCurrent }) => {
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

  const handleRestartQuiz = () => {
    setCurrent(0);
  };

  return (
    <div className="flex items-center py-20">
      <div className="bg-gray-200 p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Totalt poengsum: {poeng} </h2>
        <p>Kandidaten må øve mer på temaet: {getTranslation()} </p>
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
