import { BaseNavLink } from '@/ui/BaseNavLink';

const navLinks = [
  {
    to: '/quiz',
    title: 'Quiz',
  },
  { to: '/quiz/create', title: 'Create new' },
];

export const Header = () => {
  const elements = navLinks.map((link) => (
    <BaseNavLink key={link.title} to={link.to}>
      {link.title}
    </BaseNavLink>
  ));
  return (
    <header className="w-full py-3">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-purple-500">Simple quiz</h1>
        <nav className="flex gap-2">{...elements}</nav>
      </div>
    </header>
  );
};
