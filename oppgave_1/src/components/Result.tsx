import React from 'react';
import useProgress from '@/hooks/useProgress';

type ResultProps = {
  operationToPractice: string;
  setCurrent: Function;
  maksPoeng: number;
};

const Result: React.FC<ResultProps> = ({ maksPoeng }) => {
  const { poeng, hvaMåØvesMerPå } = useProgress()

  const getTranslation = () => {
    let tema = hvaMåØvesMerPå()
    switch (tema) {
      case 'multiply':
        return 'Multiplikasjon';
      case 'divide':
        return 'Divisjon';
      case 'add':
        return 'Addisjon';
      case 'subtract':
        return 'Subtraksjon';
      default:
        return tema;
    }
  };

  const handleRestartQuiz = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center py-20">
      <div className="bg-gray-200 p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Totalt poengsum: {poeng} av {maksPoeng} </h2>
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
