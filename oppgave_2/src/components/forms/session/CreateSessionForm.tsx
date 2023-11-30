"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import TemplateForm from '@/components/forms/session/TemplateForm';
import Intervals from '@/components/forms/session/Intervals';

interface CreateSessionFormProps { }

const CreateSessionForm: React.FC<CreateSessionFormProps> = () => {
  const [sessionType, setSessionType] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customizeTemplate, setCustomizeTemplate] = useState<string>('');
  const [selectedAthlete, setSelectedAthlete] = useState<string>('');
  const [selectedTrainingGoal, setSelectedTrainingGoal] = useState<string>('');
  const [selectedCompetition, setSelectedCompetition] = useState<string>('');
  const [sessionDate, setSessionDate] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Skjemainnsending:', {
      sessionType,
      selectedTemplate,
      customizeTemplate,
      selectedAthlete,
      selectedTrainingGoal,
      selectedCompetition,
      sessionDate,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const stateUpdater: Record<string, React.Dispatch<React.SetStateAction<string>>> = {
      sessionType: setSessionType,
      selectedTemplate: setSelectedTemplate,
      customizeTemplate: setCustomizeTemplate,
      selectedAthlete: setSelectedAthlete,
      selectedTrainingGoal: setSelectedTrainingGoal,
      selectedCompetition: setSelectedCompetition,
      sessionDate: setSessionDate,
    };

    const updater = stateUpdater[name];
    updater && updater(value);
  };


  const handleCustomizeTemplateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setCustomizeTemplate(value);
    // Reset state for selectedAthlete when user changes customization choice
    setSelectedAthlete('');
  };

  const handleSingleAthleteChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedAthlete(value);
  };


  
  const renderCustomizationOptions = () => {
    return (
      <>
        <div className="mb-4">
          <label htmlFor="customizeTemplate" className="block text-sm font-medium text-gray-700">
            Vil du tilpasse malen?
          </label>
          <select
            id="customizeTemplate"
            name="customizeTemplate"
            className="mt-1 p-2 border rounded w-full"
            value={customizeTemplate}
            onChange={handleCustomizeTemplateChange}
          >
            <option value="">Velg</option>
            <option value="yes">Ja</option>
            <option value="no">Nei</option>
          </select>

          {customizeTemplate === 'no' && (
            <div className="mb-4">
              <label htmlFor="selectedAthlete" className="block text-sm font-medium text-gray-700">
                Velg flere utøvere
              </label>
              <select
                id="selectedAthlete"
                name="selectedAthlete"
                className="mt-1 p-2 border rounded w-full"
                value={selectedAthlete}
                onChange={handleChange}
                multiple={true}
              >
                <option value="Abdullah">Abdullah</option>
                <option value="Mohammed">Mohammed</option>
                <option value="Edvin">Edvin</option>
                <option value="Ismail">Ismail</option>
                <option value="Taofik">Taofik</option>
                <option value="Nina">Nina</option>
              </select>
            </div>
          )}




          {customizeTemplate === 'yes' && (
            <div className="mb-4">
              <label htmlFor="selectedAthlete" className="block text-sm font-medium text-gray-700">
                Velg én utøver
              </label>
              <select
                id="selectedAthlete"
                name="selectedAthlete"
                className="mt-1 p-2 border rounded w-full"
                value={selectedAthlete}
                onChange={handleSingleAthleteChange}
              >
                <option value="">Velg utøver</option>
                <option value="Abdullah">Abdullah</option>
                <option value="Mohammed">Mohammed</option>
                <option value="Edvin">Edvin</option>
                <option value="Ismail">Ismail</option>
                <option value="Taofik">Taofik</option>
                <option value="Nina">Nina</option>
              </select>
            </div>
          )}

         
        </div>
      </>
    );
  };















  

  return (
    <div className="max-w-lg mx-auto bg-white p-8 mt-8 rounded shadow-md ">
      <h1 className="text-2xl font-semibold mb-4">Opprett Økt</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="mb-4">
            <label htmlFor="sessionType" className="block text-sm font-medium text-gray-700">
              Økt fra grunnen av eller ferdig mal?
            </label>
            <select
              id="sessionType"
              name="sessionType"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={sessionType}
              onChange={handleChange}
            >
              <option value="">Velg type mal</option>
              <option value="fromScratch">Fra grunnen av</option>
              <option value="premadeTemplate">Ferdig mal</option>
            </select>
          </div>

          {sessionType === 'premadeTemplate' && (
            <>
              <div className="mb-4">
                <label htmlFor="selectedTemplate" className="block text-sm font-medium text-gray-700">
                  Velg hvilken mal vil du bruke?
                </label>
                <select
                  id="selectedTemplate"
                  name="selectedTemplate"
                  className="mt-1 p-2 border rounded w-full"
                  value={selectedTemplate}
                  onChange={handleChange}
                >
                  <option value="">Velg mal</option>
                  <option value="runningTemplate">Løping mal</option>
                  <option value="swimmingTemplate">Svømming mal</option>
                  <option value="strengthTemplate">Styrke mal</option>
                </select>
              </div>

              {renderCustomizationOptions()}
            </>
          )}

          <TemplateForm />
          <div className="mb-4">
            <label htmlFor="selectedTrainingGoal" className="block text-sm font-medium text-gray-700">
              Velg en treningsmål (optional)
            </label>
            <select
              id="selectedTrainingGoal"
              name="selectedTrainingGoal"
              className="mt-1 p-2 border rounded w-full"
              value={selectedTrainingGoal}
              onChange={handleChange}
            >
              <option value="">Velg</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="selectedCompetition" className="block text-sm font-medium text-gray-700">
              Velg en konkurranse (optional)
            </label>
            <select
              id="selectedCompetition"
              name="selectedCompetition"
              className="mt-1 p-2 border rounded w-full"
              value={selectedCompetition}
              onChange={handleChange}
            >
              <option value="">Velg</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="sessionDate" className="block text-sm font-medium text-gray-700">
              Dato
            </label>
            <input
              type="date"
              id="sessionDate"
              name="sessionDate"
              className="mt-1 p-2 border rounded w-full"
              value={sessionDate}
              onChange={handleChange}
            />
          </div>

          <Intervals/>

          <button type="submit" className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">
            Opprett Økten
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSessionForm;