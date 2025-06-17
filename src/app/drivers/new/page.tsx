// NuevoConductor.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NuevoConductor from './NuevoConductor';

describe('Componente NuevoConductor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('se renderiza correctamente el menú y los campos del formulario', () => {
    render(<NuevoConductor />);
    
    // Verificar que se rendericen los enlaces del menú
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/Horario/i)).toBeInTheDocument();
    expect(screen.getByText(/Conductores/i)).toBeInTheDocument();
    // Verificar que se muestren inputs con valores por defecto
    expect(screen.getByLabelText(/Primer Nombre/i)).toHaveValue('Felipe');
    expect(screen.getByLabelText(/Segundo Nombre/i)).toHaveValue('Augusto');
    expect(screen.getByLabelText(/Primer Apellido/i)).toHaveValue('Valencia');
    expect(screen.getByLabelText(/Segundo Apellido/i)).toHaveValue('Gómez');
  });

  test('se alterna la visibilidad de la contraseña', () => {
    render(<NuevoConductor />);
    // Buscamos el input de contraseña y el botón para alternar su visibilidad.
    const inputPassword = screen.getByLabelText(/Contraseña/i);
    const toggleButton = screen.getByLabelText(/Mostrar u ocultar contraseña/i);
    
    // Estado inicial (mostrar = false) -> debería tener tipo "password"
    expect(inputPassword).toHaveAttribute('type', 'password');
    
    // Simular clic para alternar visibilidad
    fireEvent.click(toggleButton);
    expect(inputPassword).toHaveAttribute('type', 'text');
  });

  test('al seleccionar una foto se actualiza el estado y se puede eliminar', async () => {
    const { container } = render(<NuevoConductor />);
    
    // Simulamos el FileReader para que llame a onload con un resultado simulado
    const dummyData = 'data:image/png;base64,dummyData';
    const file = new File(['dummy content'], 'foto.png', { type: 'image/png' });
    
    // "Mockear" FileReader
    jest.spyOn(window, 'FileReader').mockImplementation(() => {
      return {
        onload: null,
        readAsDataURL: function(_file: File) {
          if (this.onload) {
            // Simulamos el evento onload del FileReader
            this.onload({ target: { result: dummyData } } as ProgressEvent<FileReader>);
          }
        },
      } as unknown as FileReader;
    });
    // Debido a que el input es "oculto" y no tiene un label estándar, lo buscamos por id
    const fileInput = container.querySelector('#fotoConductor') as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();
    // Simular el evento de cambio (seleccionar archivo)
    fireEvent.change(fileInput, { target: { files: [file] } });
    // Verificar que la imagen se actualice (se mostrará en el <Imagen>)
    await waitFor(() => {
      const img = screen.getByAltText(/Foto del conductor/i);
      expect(img).toHaveAttribute('src', dummyData);
    });
    // Verificar que el botón para eliminar la foto se muestre y funcione
    const deleteButton = screen.getByRole('button', { name: /Eliminar foto/i });
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    await waitFor(() => {
      const img = screen.getByAltText(/Foto del conductor/i);
      // Tras eliminar, se debería mostrar la imagen por defecto
      expect(img).toHaveAttribute('src', '/images/avatar-placeholder.png');
    });
  });

  test('se renderiza el botón de envío del formulario', () => {
    render(<NuevoConductor />);
    // Verifica que el botón con texto "Registrador" esté presente
    expect(screen.getByRole('button', { name: /Registrador/i })).toBeInTheDocument();
  });
});
