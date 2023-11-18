import Link from 'next/link';

export default function Header() {
  return (
    <nav className='flex bg-black text-white h-16 items-center p-6 justify-between'>
      <ul className='flex'>
        <li>
          <Link href="/">Eksamen H23 - Oppgave 2</Link>
        </li>
      </ul>
      <ul className='flex gap-x-7'>
      <li>
          <Link href="/">Dashboard</Link>
        </li>
        <li>
          <Link href="/new/template">Legg til mal</Link>
        </li>
        <li>
          <Link href="/new/question">Legg til spørsmål</Link>
        </li>
        <li>
          <Link href="/new/practitioner">Legg til utøver</Link>
        </li>
        <li>
          <Link href="/practitioners">Utøvere</Link>
        </li>
      </ul>
    </nav>
  );
};
