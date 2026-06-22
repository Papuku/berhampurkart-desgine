export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const variants = {
    primary: 'bg-brand-orange hover:bg-brand-orange-dark text-white shadow-sm',
    secondary: 'bg-brand-green hover:bg-brand-green-dark text-white shadow-sm',
    outline: 'border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white',
    ghost: 'text-brand-green hover:bg-brand-green/10',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
