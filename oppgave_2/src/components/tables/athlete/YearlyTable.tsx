const YearlyTable: React.FC = () => {
  return (
    <section className="p-6">
      <h2 className="text-lg">År</h2>
      <table className="mt-4 w-full border-collapse">
        <thead>
          <tr>
            <th className="border bg-black px-4 py-2 text-white">År</th>
            <th className="border bg-black px-4 py-2 text-white">Handlinger</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </section>
  )
}

export default YearlyTable
