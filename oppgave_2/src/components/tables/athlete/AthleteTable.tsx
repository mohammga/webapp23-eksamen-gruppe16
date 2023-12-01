import React from "react"

const AthleteTable: React.FC = () => {
  return (
    <section id="athlete-profile" className="p-6">
      <h2>Utøverinformasjon</h2>
      <table className="mt-4 w-full border-collapse">
        <thead>
          <tr>
            <th className="border bg-black px-4 py-2 text-white">ID</th>
            <th className="border bg-black px-4 py-2 text-white">brukerId</th>
            <th className="border bg-black px-4 py-2 text-white">Kjønn</th>
            <th className="border bg-black px-4 py-2 text-white">Handlinger</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </section>
  )
}

export default AthleteTable
