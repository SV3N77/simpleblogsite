function Button({ onClick, children, ...props }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg border-2 border-orange-300 bg-orange-50 p-2 hover:bg-orange-200"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
