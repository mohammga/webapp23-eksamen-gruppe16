import Link from 'next/link';

export default function Header() {
  return (
    <nav className='flex bg-black text-white h-16 items-center p-6'>
      <ul className='flex'>
        <li>
          <Link href="/">Eksamen H23 - Oppgave 1</Link>
        </li>
      </ul>
    </nav>
  );
};


