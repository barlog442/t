import { ButtonHTMLAttributes, forwardRef, memo } from 'react';
import './styles.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ ...props }, ref) => (
  <button {...props} ref={ref}>
    {props.children}
  </button>
));

export default memo(Button);

Button.displayName = 'Button';
