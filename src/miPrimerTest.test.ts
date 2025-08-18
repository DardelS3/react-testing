import {
  describe,
  it, 
  expect
} from 'vitest';

describe('Mi primer test', () => {
  it('La suma de dos numeros', () => {
    const suma = (a: number, b: number) => a + b;
    const resultado = suma(2,3);
    expect(resultado).toBe(5);
  });

  it('Dos textos iguales', () => {
    const texto1 = 'Hola';
    const texto2 = 'Hola';
    expect(texto1).toBe(texto2);
  });
});