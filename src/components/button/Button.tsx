interface Props {
  buttonText: string;
  classes?: string;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  buttonText,
  classes = "",
  type = "button",
}: Props) => {
  return (
    <button
      className={`bg-blue-600 text-white p-3 rounded-2xl m-1 hover:bg-blue-800 ${classes}`}
      type={type}
    >
      {buttonText}
    </button>
  );
};
