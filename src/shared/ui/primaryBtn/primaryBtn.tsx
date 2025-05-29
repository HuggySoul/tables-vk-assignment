import st from "./primaryBtn.module.css";

interface IProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  borderRadius?: string;
  padding?: string;
}

export const PrimaryBtn = ({
  children,
  onClick,
  disabled = false,
  borderRadius = "10px",
  padding = "8px",
}: IProps) => {
  return (
    <button
      style={{ borderRadius: borderRadius, padding: padding }}
      disabled={disabled}
      onClick={onClick}
      className={st.primaryBtn}
    >
      {children}
    </button>
  );
};
