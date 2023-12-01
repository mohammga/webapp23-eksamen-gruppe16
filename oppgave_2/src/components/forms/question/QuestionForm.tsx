"use client"

import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Question } from "@/types/index";

const QuestionForm = () => {
  const [formData, setFormData] = useState<Question>({
    text: "",
    type: "",
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
      }
    }

    return () => clearInterval(countdownInterval);
  }, [countdown, router, formSubmitted]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/question", {
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
        console.error("Feil ved opprettelse av spørsmål");
      }
    } catch (error) {
      console.error("Noe gikk galt:", error);
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-lg rounded bg-white p-8 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Opprett spørsmål</h1>

      {formSubmitted && (
        <p className="mb-4 text-md text-gray-600">
          Spørsmålet har blitt opprettet og du blir omdirigert om {countdown} sekunder.
        </p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="text"
            className="text-md block font-medium text-gray-700"
          >
            Spørsmålstekst
          </label>
          <input
            type="text"
            id="text"
            name="text"
            onChange={handleChange}
            minLength={5}
            maxLength={100}
            value={formData.text}
            required
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label
            htmlFor="questionType"
            className="text-md block font-medium text-gray-700"
          >
            Spørsmålstype
          </label>
          <select
            id="type"
            name="type"
            required
            onChange={handleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          >
            <option value="">Velg type</option>
            <option value="text">Tekst</option>
            <option value="radio:range">Radio med tallene 1-10</option>
            <option value="radio:mood">Radio med emojier</option>
          </select>
        </div>

        <button
          type="submit"
          className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
        >
          Opprett
        </button>
      </form>
    </div>
  )
}

export default QuestionForm
