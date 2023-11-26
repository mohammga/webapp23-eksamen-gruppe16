const CompetitionsTable: React.FC = () => {
  return (
    <section className="p-6">
      <h2 className="text-lg">Konkurranser</h2>
      <table className="mt-4 w-full border-collapse">
        <thead>
          <tr>
            <th className="border bg-black px-4 py-2 text-white">Navn</th>
            <th className="border bg-black px-4 py-2 text-white">Dato</th>
            <th className="border bg-black px-4 py-2 text-white">Sted</th>
            <th className="border bg-black px-4 py-2 text-white">Mål</th>
            <th className="border bg-black px-4 py-2 text-white">Type</th>
            <th className="border bg-black px-4 py-2 text-white">Prioritet</th>
            <th className="border bg-black px-4 py-2 text-white">Kommentar</th>
            <th className="border bg-black px-4 py-2 text-white">Handlinger</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </section>
  )
}

export default CompetitionsTable
