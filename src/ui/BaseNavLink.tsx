import { cn } from '@/utils/helpers';
import { VariantProps, cva } from 'class-variance-authority';
import { FC } from 'react';
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom';

const navLinkVariants = cva(
  'px-4 py-3 text-base border border-pink-300 text-purple-950 transition font-extrabold block hover:bg-black rounded-3xl max-w-fit hover:text-white',
  {
    variants: {
      isActive: {
        nonactive: '',
        active: 'bg-pink-300',
      },
    },
    defaultVariants: {
      isActive: 'nonactive',
    },
  },
);

type BaseNavLinkProps = NavLinkProps & VariantProps<typeof navLinkVariants>;

export const BaseNavLink: FC<BaseNavLinkProps> = ({ className, to, ...rest }) => {
  const location = useLocation();
  console.log({ location: location.pathname, to });
  const isActiveLink = location.pathname === to;

  return (
    <NavLink
      className={cn(
        navLinkVariants({ isActive: isActiveLink ? 'active' : 'nonactive' }),
        className,
      )}
      to={to}
      {...rest}
    />
  );
};
