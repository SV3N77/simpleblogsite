function Button({ onClick, children, ...props }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg border-2 border-orange-200 bg-orange-50 p-2 transition duration-200 hover:bg-orange-200 disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
