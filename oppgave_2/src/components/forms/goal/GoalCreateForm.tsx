"use client";

import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Goal } from "@/types/index";

const GoalForm = () => {
  const params = useParams();
  
  const router = useRouter();
  const { athleteId } = params;
  const [countdown, setCountdown] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<Goal>({
    name: "",
    date: new Date(""),
    goalTarget: 0,
    comment: "",
    athleteId: athleteId,
  });


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


  const handleBack = () => {
    router.push("/");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    const newValue =
      e.target.type === "number" ? parseFloat(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/goal/", {
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
        console.error("Feil ved opprettelse av mål");
      }
    } catch (error) {
      console.error("Noe gikk galt:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-md rounded bg-white p-8 shadow-md"
    >
      <h2 className="mb-4 text-2xl font-bold">Opprett mål</h2>

      
      {formSubmitted && (
        <p className="mb-4 text-md text-gray-600">
          Målet har blitt opprettet og du blir omdirigert om {countdown} sekunder.
        </p>
      )}

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-bold text-gray-700"
        >
          Målets navn
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 p-2"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="date"
          className="block text-sm font-bold text-gray-700"
        >
          Dato for mål
        </label>
        <input
          type="date"
          id="date"
          value={formData.date.toString()}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 p-2"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="goalTarget"
          className="block text-sm font-bold text-gray-700"
        >
          Mål (tallverdi)
        </label>
        <input
          type="number"
          id="goalTarget"
          value={formData.goalTarget}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 p-2"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="comment"
          className="block text-sm font-bold text-gray-700"
        >
          Kommentar
        </label>
        <textarea
          id="comment"
          value={formData.comment}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 p-2"
        />
      </div>

      <button
        onClick={handleBack}
        type="button"
        className="mr-2 rounded bg-gray-700 px-4 py-2 text-white"
      >
        Tilbake
      </button>

      <button
        type="submit"
        className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
      >
        Opprett
      </button>
    </form>
  );
};

export default GoalForm;
