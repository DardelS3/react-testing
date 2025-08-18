import {
  describe,
  it,
  expect,
  vi
} from 'vitest';
import { 
  render,
  screen,
  fireEvent,
  act
} from '@testing-library/react'
import { Button } from './Button';

describe('<Button />', () => {
  it('Debería renderizar un botón', () => {
    render(<Button label="Click me" />);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  it('Debería ejecutar la función onClick', async () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    const button = screen.getByText('Click me');
    await act(async () => {
      fireEvent.click(button);
    });
    expect(handleClick).toHaveBeenCalledTimes(1);
  })
});