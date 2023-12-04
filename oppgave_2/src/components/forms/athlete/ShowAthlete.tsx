"use client";

import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Athlete } from "@/types/Athlete";

interface ApiResponse {
  success: boolean;
  data: Athlete;
}

const ShowAthlete: React.FC = () => {
  const [formData, setFormData] = useState<Athlete>({
    userId: "",
    gender: "",
    sportType: "",
  });

  const [countdown, setCountdown] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  
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


  useEffect(() => {
    const fetchAthleteData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/athlete/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch athlete data");
        }
  
        const jsonResponse = await response.json();
  
        const { success, data } = jsonResponse as ApiResponse;
  
        if (success) {
          setFormData(data);
  
        } else {
          throw new Error("Failed to fetch athlete sessions");
        }
      } catch (error : any) {
        console.error("Error fetching athlete data:", error.message);
      }
    };
  
    fetchAthleteData();
  }, [id]); 
   


  const handleBack = () => {
    router.push("/");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    const newValue = e.target.type === "number" ? +value : value;
    setFormData({ ...formData, [id]: newValue });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Replace 'YOUR_UPDATE_URL' with the actual URL to update athlete data
      const response = await fetch(`http://localhost:3000/api/athlete/${id}`, {
        method: "PUT", // Use PUT or PATCH based on your API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update athlete data");
      }
    } catch (error : any) {
      console.error("Error updating athlete data:", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-md rounded bg-white p-8 shadow-md"
    >
      <h2 className="mb-4 text-2xl font-bold">Endre utøver-informasjon</h2>

      {formSubmitted && (
        <p className="mb-4 text-md text-gray-600">
          Utøveren har endret opprettet og du blir omdirigert om {countdown} sekunder.
        </p>
      )}

      <label
        htmlFor="userId"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Unik ID
      </label>
      <input
        type="text"
        id="userId"
        required
        value={formData.userId}
        onChange={handleChange}
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />

      <label
        htmlFor="gender"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Velg kjønn
      </label>
      <select
        id="gender"
        onChange={handleChange}
        required
        value={formData.gender}
        className="mb-4 w-full rounded border border-gray-300 p-2"
      >
        <option value="">Velg kjønn</option>
        <option value="male">Mann</option>
        <option value="female">Kvinne</option>
      </select>

      <label
        htmlFor="sportType"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Velg type sport
      </label>
      <select
        id="sportType"
        onChange={handleChange}
        required
        value={formData.sportType}
        className="mb-4 w-full rounded border border-gray-300 p-2"
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
        Endre
      </button>
    </form>
  );
};

export default ShowAthlete;
