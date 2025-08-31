import { describe, it, expect, vi, Mock } from 'vitest';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import { SessionProvider } from '../../context/AuthContext'
import { MemoryRouter } from 'react-router-dom';
import { getAuth } from '../../services/getAuth'
import { Login } from './Login';

vi.mock('../../services/getAuth', () => {
  return {
    getAuth: vi.fn()
  }
})

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

const mockNavigate = vi.fn();
const mockGetAuth = getAuth as Mock;

describe('<Login />', () => {
  const handleLogin = () => {
    return render(
      <SessionProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </SessionProvider>
    )
  }

  it('Debería mostrar un mensaje de error', async () => {
    mockGetAuth.mockRejectedValue(new Error('Error de autenticación'));
    handleLogin();
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'wrongUser' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongPass' } });
      fireEvent.click(submitButton);
    });

    const errorMessage = await screen.findByText('Error de autenticación');
    expect(errorMessage).toBeInTheDocument();
  })

  it('Debería redirigir a /orders', async () => {
    mockGetAuth.mockResolvedValue({ success: true });
    handleLogin();

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'validUser' } });
      fireEvent.change(passwordInput, { target: { value: 'validPassword' } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockGetAuth).toHaveBeenCalledWith('validUser', 'validPassword');
      expect(mockNavigate).toHaveBeenCalledWith('/orders');
    });
  });

  it('Debería mostrar la contraseña al hacer click en el botón para mostrar la contraseña', () => {
    handleLogin();
    const toggleButton = screen.getByRole('button', { name: 'show' });

    // Simulate clicking to show password, then check button changes to 'Hide'
    act(() => {
      fireEvent.click(toggleButton);
    });

    expect(screen.getByRole('button', { name: 'hide' })).toBeInTheDocument();
    const passwordInput = screen.getByPlaceholderText('Password');

    act(() => {
      fireEvent.click(toggleButton);
    });

    expect(passwordInput).toHaveAttribute('type', 'password');
  });
})