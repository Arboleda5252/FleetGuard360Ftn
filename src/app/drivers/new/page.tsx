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

    // Verificar que se muestren entradas con valores por defecto
    expect(screen.getByLabelText(/Primer Nombre/i)).toHaveValue('Felipe');
    expect(screen.getByLabelText(/Segundo Nombre/i)).toHaveValue('Augusto');
    expect(screen.getByLabelText(/Primer Apellido/i)).toHaveValue('Valencia');
    expect(screen.getByLabelText(/Segundo Apellido/i)).toHaveValue('Gómez');
  });

  test('se alterna la visibilidad de la contraseña', () => {
    render(<NuevoConductor />);

    // Buscar el input de contraseña y el botón para alternar visibilidad
    const inputPassword = screen.getByLabelText(/Contraseña/i);
    const toggleButton = screen.getByLabelText(/Mostrar u ocultar contraseña/i);

    // Estado inicial: debería tener el atributo type "password"
    expect(inputPassword).toHaveAttribute('type', 'password');

    // Al hacer clic se alterna a "text"
    fireEvent.click(toggleButton);
    expect(inputPassword).toHaveAttribute('type', 'text');

    // Volver a hacer clic para volver a "password"
    fireEvent.click(toggleButton);
    expect(inputPassword).toHaveAttribute('type', 'password');
  });

  test('al seleccionar una foto se actualiza el estado y se puede eliminar', async () => {
    const { container } = render(<NuevoConductor />);
    const dummyData = 'data:image/png;base64,dummyData';
    const mockFile = new File(['contenido ficticio'], 'foto.png', { type: 'image/png' });

    // Simular el FileReader para cargar la imagen exitosamente
    jest.spyOn(window, 'FileReader').mockImplementation(() => {
      return {
        onload: null,
        readAsDataURL: function (_file: File) {
          if (this.onload) {
            this.onload({ target: { result: dummyData } } as ProgressEvent<FileReader>);
          }
        }
      } as unknown as FileReader;
    });

    // Debido a que el input es "oculto", se busca por su id
    const inputFile = container.querySelector('#fotoConductor') as HTMLInputElement;
    expect(inputFile).toBeInTheDocument();

    // Simular el evento de cambio (seleccionar archivo)
    fireEvent.change(inputFile, { target: { files: [mockFile] } });

    // Verificar que la imagen se actualice
    await waitFor(() => {
      const img = screen.getByAltText(/Foto del conductor/i);
      expect(img).toHaveAttribute('src', dummyData);
    });

    // Verificar que se muestre el botón para eliminar la foto y funcione
    const deleteButton = screen.getByRole('button', { name: /Eliminar foto/i });
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const img = screen.getByAltText(/Foto del conductor/i);
      // Tras eliminar, se debería ver la imagen por defecto
      expect(img).toHaveAttribute('src', '/images/avatar-placeholder.png');
    });
  });

  test('muestra mensaje de error si falla la carga de la imagen', async () => {
    const { container } = render(<NuevoConductor />);

    // Simular fallo en la carga del archivo: se invoca el onerror
    jest.spyOn(window, 'FileReader').mockImplementation(() => {
      return {
        onerror: null,
        readAsDataURL: function (_file: File) {
          if (this.onerror) {
            this.onerror(new Error('Error al cargar el archivo'));
          }
        }
      } as unknown as FileReader;
    });

    const inputFile = container.querySelector('#fotoConductor') as HTMLInputElement;
    const mockFile = new File(['contenido de error'], 'foto.png', { type: 'image/png' });

    // Simular la selección de archivo
    fireEvent.change(inputFile, { target: { files: [mockFile] } });

    // Se espera que se muestre un mensaje de error en la interfaz
    await waitFor(() => {
      expect(screen.getByText(/Error al cargar la imagen/i)).toBeInTheDocument();
    });
  });

  test('se renderiza el botón de envío del formulario', () => {
    render(<NuevoConductor />);
    // Verificar que exista el botón con el texto "Registrador"
    expect(screen.getByRole('button', { name: /Registrador/i })).toBeInTheDocument();
  });
});
