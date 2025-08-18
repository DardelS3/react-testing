import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Calculator } from './Calculator';

describe('<Calculator />', () => {
  const useCasesTest = [
    { a: 5, b: 3, operation: 'add', expected: 8 },
    { a: 5, b: 3, operation: 'subtract', expected: 2 },
    { a: 5, b: 3, operation: 'multiply', expected: 15 },
    { a: 6, b: 3, operation: 'divide', expected: 2 },
    { a: 6, b: 0, operation: 'divide', expected: 'Error' },
    { a: 5, b: 3, operation: 'modulus', expected: 'Invalid operation' }
  ]

  it.each(useCasesTest)(
    'Debería retornar $expected cuando $a y $b son $operation',
    ({ a, b, operation, expected }) => {
      render(<Calculator a={a} b={b} operation={operation} />);
      const result = screen.getByText(`Result: ${expected}`);
      expect(result).toBeInTheDocument();
    })
})