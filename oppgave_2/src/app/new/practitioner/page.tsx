import AthleteForm from '@/components/practitionerForm/form/AthleteForm';
const Home: React.FC = () => {
  return (
    <div>
      <section className="p-4">
        <h2 className="text-2xl font-bold mb-4">Opprette utøver</h2>
        <AthleteForm />
      </section>
    </div>
  );
};
export default Home;
