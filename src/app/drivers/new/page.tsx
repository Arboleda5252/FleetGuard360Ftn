'use client';
import { useState } from 'react';
import Image from 'next/image';

const NuevoConductor = () => {
  const [foto, setFoto] = useState<string | null>(null);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setFoto(event.target.result);
        }
      };
      lector.readAsDataURL(archivo);
    }
  };

  const eliminarFoto = () => setFoto(null);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="mr-3" />
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-blue-200">Inicio</a>
            <a href="#" className="hover:text-blue-200">Horario</a>
            <a href="#" className="font-semibold hover:text-blue-200">Conductores</a>
          </div>
          <button className="bg-blue-700 hover:bg-blue-800 p-2 rounded-full" aria-label="Cerrar sesión">
            <i className="fas fa-sign-out-alt text-lg" />
          </button>
        </div>
      </nav>

      {/* Formulario */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Nuevo Conductor</h2>
          </div>
          <form className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Columna 1 */}
              <div className="space-y-4">
                <Input id="primerNombre" label="Primer Nombre" required defaultValue="Felipe" />
                <Input id="segundoNombre" label="Segundo Nombre" defaultValue="Augusto" />
                <Input id="primerApellido" label="Primer Apellido" required defaultValue="Valencia" />
                <Input id="segundoApellido" label="Segundo Apellido" defaultValue="Gomez" />
              </div>

              {/* Columna 2 */}
              <div className="space-y-4">
                <Input id="correo" label="Correo Electrónico" type="email" required defaultValue="felipito1985@ejemplo.com" />
                <PasswordInput id="password" label="Contraseña" mostrar={mostrarPassword} toggle={() => setMostrarPassword(!mostrarPassword)} />
                <PasswordInput id="confirmarPassword" label="Confirmar Contraseña" mostrar={mostrarConfirmacion} toggle={() => setMostrarConfirmacion(!mostrarConfirmacion)} />
                <Input id="cedula" label="Número de Cédula" required defaultValue="81000000" />
              </div>

              {/* Columna 3 */}
              <div className="space-y-4">
                <Input id="contacto" label="Número de Contacto" required defaultValue="3003004051" type="tel" />
                <div>
                  <Label htmlFor="tipoLicencia" text="Tipo de Licencia" required />
                  <select
                    id="tipoLicencia"
                    name="tipoLicencia"
                    className="w-full px-3 py-2 border rounded-md"
                    defaultValue="B1 - Automóviles"
                  >
                    <option disabled>💬 Seleccionar</option>
                    <option>A1 - Motocicletas</option>
                    <option>B1 - Automóviles</option>
                    <option>C1 - Camiones</option>
                  </select>
                </div>
                <Input id="vigencia" label="Vigencia Licencia" required defaultValue="MARZO-2029" />
                <Input id="vehiculo" label="Vehículo asignado" defaultValue="REE-852" />
              </div>

              {/* Columna 4 */}
              <div className="flex flex-col items-center justify-center">
                <Label htmlFor="fotoConductor" text="Foto del Conductor" />
                <div className="relative mb-4">
                  <Image
                    src={foto || '/images/avatar-placeholder.png'}
                    alt="Foto del conductor"
                    width={160}
                    height={160}
                    className="rounded-full object-cover border-4 border-gray-200 shadow-sm"
                  />
                  {foto && (
                    <button
                      onClick={eliminarFoto}
                      type="button"
                      aria-label="Eliminar foto"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                    >
                      <i className="fas fa-times text-xs" />
                    </button>
                  )}
                </div>
                <label
                  htmlFor="fotoConductor"
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium"
                >
                  <i className="fas fa-camera mr-2" /> Cambiar foto
                </label>
                <input
                  id="fotoConductor"
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="hidden"
                />
                <p className="mt-2 text-xs text-gray-500">Formatos: JPG, PNG (Max. 2MB)</p>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow text-lg font-medium"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

interface InputProps {
  id: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
  type?: string;
}

const Input = ({ id, label, required, defaultValue, type = 'text' }: InputProps) => (
  <div>
    <Label htmlFor={id} text={label} required={required} />
    <input
      id={id}
      type={type}
      defaultValue={defaultValue}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

interface PasswordInputProps {
  id: string;
  label: string;
  mostrar: boolean;
  toggle: () => void;
}

const PasswordInput = ({ id, label, mostrar, toggle }: PasswordInputProps) => (
  <div>
    <Label htmlFor={id} text={label} />
    <div className="relative">
      <input
        id={id}
        type={mostrar ? 'text' : 'password'}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
        defaultValue=""
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        aria-label="Mostrar u ocultar contraseña"
      >
        <i className={mostrar ? 'fas fa-eye-slash' : 'fas fa-eye'} />
      </button>
    </div>
    <p className="mt-1 text-xs text-gray-500">Dejar en blanco para no cambiar</p>
  </div>
);

interface LabelProps {
  htmlFor: string;
  text: string;
  required?: boolean;
}

const Label = ({ htmlFor, text, required }: LabelProps) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
    {text} {required && <span className="text-red-500">*</span>}
  </label>
);

export default NuevoConductor;
