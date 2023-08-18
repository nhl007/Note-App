import { Link } from 'react-router-dom';

type buttonProps = {
  name: string;
  onClick: () => void;
  to: string;
  active: boolean;
};

const NavButtons = ({ name, to, onClick, active }: buttonProps) => {
  return (
    <Link
      onClick={onClick}
      to={to}
      className={`${
        active ? 'bg-teal-400 text-black' : ''
      } flex justify-center items-center`}
    >
      {name}
    </Link>
  );
};

export default NavButtons;
