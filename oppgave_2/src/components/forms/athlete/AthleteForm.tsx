"use client"

import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Athlete } from "@/types/index"

const AthleteForm = () => {
  const [formData, setFormData] = useState<Athlete>({
    userId: '',
    gender: '',
    sportType: '',
  });

  const router = useRouter();
  const [countdown, setCountdown] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      if (formSubmitted) {
        router.push("/");
        router.refresh();
      }
    }

    return () => clearInterval(countdownInterval);
  }, [countdown, router, formSubmitted]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/athlete/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setCountdown(5);
        setFormSubmitted(true);
      } else {
        console.error("Feil ved opprettelse av utøver");
      }
    } catch (error) {
      console.error("Noe gikk galt:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 mt-8 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Opprett utøver</h2>

      {formSubmitted && (
        <p className="mb-4 text-md text-gray-600">
          Utøveren har blitt opprettet og du blir omdirigert om {countdown} sekunder.
        </p>
      )}
      <label htmlFor="userId" className="block text-gray-700 text-sm font-bold mb-2">
        BrukerId
      </label>
      <input
        type="text"
        id="userId"
        placeholder="abc-123-979"
        required
        value={formData.userId}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">
        Kjønn
      </label>
      <select
        id="gender"
        onChange={handleChange}
        required
        value={formData.gender}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      >
        <option value="">Velg kjønn</option>
        <option value="male">Mann</option>
        <option value="female">Kvinne</option>
      </select>

      <label htmlFor="sportType" className="block text-gray-700 text-sm font-bold mb-2">
        Type sport
      </label>
      <select
        id="sportType"
        onChange={handleChange}
        required
        value={formData.sportType}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      >
        <option value="">Velg sport</option>
        <option value="running">Løp</option>
        <option value="cycling">Sykkel</option>
        <option value="skiing">Ski</option>
        <option value="triathlon">Triathlon</option>
        <option value="swimming">Svømming</option>
        <option value="strength">Styrke</option>
        <option value="other">Annet</option>
      </select>

      <button type="submit" className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">
        Opprett
      </button>
    </form>
  );
};

export default AthleteForm;
