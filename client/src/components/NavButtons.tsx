type buttonProps = {
  name: string;
  onClick: () => void;
  active: boolean;
};

const NavButtons = ({ name, onClick, active }: buttonProps) => {
  return (
    <button
      className={`${active ? 'bg-teal-400 text-black' : ''}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default NavButtons;
