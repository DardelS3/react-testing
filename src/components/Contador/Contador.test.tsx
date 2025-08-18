import { describe, it, expect} from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Contador } from './Contador';

describe('<Contador />', () => {
  it('debería renderizar el valor inicial', () => {
    render(<Contador />);
    const counterValue = screen.getByText('Contador: 0');
    expect(counterValue).toBeInTheDocument();
  })

  it('debería incrementar el contador', async () => {
    render(<Contador />);
    const boton = screen.getByText('Incrementar');
    await act(async () => {
      fireEvent.click(boton);
    });
    const counterValue = screen.getByText('Contador: 1');
    expect(counterValue).toBeInTheDocument();
  });
})
