'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function EliminarConductor() {
  const [foto] = useState('/images/foto-conductor.jpg');
  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="mr-3" />
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-blue-200 transition-colors">Inicio</a>
            <a href="#" className="hover:text-blue-200 transition-colors">Horario</a>
            <a href="#" className="font-semibold hover:text-blue-200 transition-colors">Conductores</a>
          </div>
          <button className="bg-blue-700 hover:bg-blue-800 p-2 rounded-full transition-colors" aria-label="Cerrar sesión">
            <i className="fas fa-sign-out-alt text-lg"></i>
          </button>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Eliminar Conductor</h2>
          </div>
          <form className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="space-y-4">
                <Field id="nombre1" label="Primer Nombre" value="Felipe" required />
                <Field id="nombre2" label="Segundo Nombre" value="Augusto" />
                <Field id="apellido1" label="Primer Apellido" value="Valencia" required />
                <Field id="apellido2" label="Segundo Apellido" value="Gomez" />
              </div>
              <div className="space-y-4">
                <Field id="correo" label="Correo Electrónico" type="email" value="felipito1985@ejemplo.com" required />
                <PasswordField id="pass1" label="Contraseña" value="********" />
                <PasswordField id="pass2" label="Confirmar Contraseña" value="Felipe1985*" />
                <Field id="cedula" label="Número de Cédula" value="81000000" required />
              </div>
              <div className="space-y-4">
                <Field id="contacto" label="Número de Contacto" value="3003004051" required />
                <SelectField id="licencia" label="Tipo de Licencia" options={["A1 - Motocicletas", "B1 - Automóviles", "C1 - Camiones"]} selected="A1 - Motocicletas" />
                <Field id="vigencia" label="Vigencia Licencia" value="MARZO-2029" required />
                <Field id="vehiculo" label="Vehículo asignado" value="REE-852" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <label htmlFor="fotoConductor" className="text-sm font-medium text-gray-700 mb-2">Foto del Conductor</label>
                <div className="relative mb-4">
                  <Image
                    src={foto}
                    alt="Foto del conductor"
                    width={160}
                    height={160}
                    className="rounded-full object-cover border-4 border-gray-200 shadow-sm"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 w-full bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start">
                  <i className="fas fa-exclamation-triangle text-red-500 text-xl mr-3 pt-1"></i>
                  <div>
                    <p className="text-sm text-red-700 font-semibold">
                      ADVERTENCIA: Esta acción eliminará permanentemente todos los datos del conductor.
                    </p>
                    <p className="text-sm text-red-700 mt-1">
                      Para confirmar por favor escriba su contraseña:
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <input
                    id="confirmPass"
                    type="password"
                    placeholder="Ingrese su contraseña"
                    className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-sm text-lg font-medium transition-colors"
                  >
                    Confirmar Eliminación
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Reusable components with corrected typing
function Field({ id, label, value, required = false, type = 'text' }: { id: string, label: string, value: string, required?: boolean, type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        disabled
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
      />
    </div>
  );
}

function PasswordField({ id, label, value }: { id: string, label: string, value: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          id={id}
          type="password"
          value={value}
          disabled
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <i className="fas fa-eye" />
        </span>
      </div>
    </div>
  );
}

function SelectField({ id, label, options, selected }: { id: string, label: string, options: string[], selected: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        id={id}
        defaultValue={selected}
        disabled
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
      >
        <option disabled>💬 Seleccionar</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
