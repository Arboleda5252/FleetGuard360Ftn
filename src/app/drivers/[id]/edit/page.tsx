'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaSignOutAlt, FaEye, FaEyeSlash, FaTimes, FaCamera } from 'react-icons/fa';

export default function EditDriver() {
  const [form, setForm] = useState({
    primerNombre: 'Felipe',
    segundoNombre: 'Augusto',
    primerApellido: 'Valencia',
    segundoApellido: 'Gomez',
    correo: 'felipito1985@ejemplo.com',
    cedula: '81000000',
    contacto: '3003004051',
    tipoLicencia: 'A1 - Motocicletas',
    vigencia: 'MARZO-2029',
    vehiculo: 'REE-852',
    password: '',
    confirmPassword: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [photoPreview, setPhotoPreview] = useState('https://via.placeholder.com/300x300');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPhotoPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoRemove = () => setPhotoPreview('https://via.placeholder.com/300x300');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí manejas el envío de datos
    console.log('Formulario enviado:', form);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-blue-200">Inicio</a>
            <a href="#" className="hover:text-blue-200">Horario</a>
            <a href="#" className="font-semibold hover:text-blue-200">Conductores</a>
          </div>
          <button className="bg-blue-700 hover:bg-blue-800 p-2 rounded-full">
            <FaSignOutAlt />
          </button>
        </div>
      </nav>

      {/* Formulario */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Editar información del conductor</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Columna 1 */}
              <div className="space-y-4">
                <Input label="Primer Nombre" name="primerNombre" value={form.primerNombre} onChange={handleChange} required />
                <Input label="Segundo Nombre" name="segundoNombre" value={form.segundoNombre} onChange={handleChange} />
                <Input label="Primer Apellido" name="primerApellido" value={form.primerApellido} onChange={handleChange} required />
                <Input label="Segundo Apellido" name="segundoApellido" value={form.segundoApellido} onChange={handleChange} />
              </div>

              {/* Columna 2 */}
              <div className="space-y-4">
                <Input label="Correo Electrónico" type="email" name="correo" value={form.correo} onChange={handleChange} required />
                <PasswordInput label="Contraseña" name="password" value={form.password} onChange={handleChange} visible={passwordVisible} toggleVisible={() => setPasswordVisible(!passwordVisible)} />
                <PasswordInput label="Confirmar Contraseña" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} visible={confirmVisible} toggleVisible={() => setConfirmVisible(!confirmVisible)} />
                <Input label="Número de Cédula" name="cedula" value={form.cedula} onChange={handleChange} required />
              </div>

              {/* Columna 3 */}
              <div className="space-y-4">
                <p className="block text-sm font-medium text-gray-700 mb-1">Tipo de Licencia</p>
                <select name="tipoLicencia" value={form.tipoLicencia} onChange={handleSelectChange} className="w-full px-3 py-2 border rounded-md">
                  <option value="">💬 Seleccionar</option>
                  <option value="A1 - Motocicletas">A1 - Motocicletas</option>
                  <option value="B1 - Automóviles">B1 - Automóviles</option>
                  <option value="C1 - Camiones">C1 - Camiones</option>
                </select>
                <Input label="Vigencia Licencia" name="vigencia" value={form.vigencia} onChange={handleChange} required />
                <Input label="Vehículo Asignado" name="vehiculo" value={form.vehiculo} onChange={handleChange} />
              </div>

              {/* Columna 4 - Foto */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <p className="text-sm font-medium text-gray-700">Foto del Conductor</p>
                <div className="relative">
                  <Image 
                  src={photoPreview} 
                  alt="Foto" 
                  className="rounded-full object-cover border-4 border-gray-200 shadow-sm"
                  width={40}
                  height={40}
                  />
                  <button type="button" onClick={handlePhotoRemove} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">
                    <FaTimes size={10} />
                  </button>
                </div>
                <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                  <FaCamera className="inline mr-2" /> Cambiar foto
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                </label>
                <p className="text-xs text-gray-500">Formatos: JPG, PNG (Max. 2MB)</p>
              </div>
            </div>

            {/* Botones */}
            <div className="mt-8 flex justify-center space-x-6">
              <button type="submit" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-lg font-medium">Guardar Cambios</button>
              <a href="/eliminar-perfil" className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md text-lg font-medium">Eliminar Conductor</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Input component
type InputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
};

function Input({ label, name, value, onChange, required, type = 'text' }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
      <input type={type} name={name} value={value} onChange={onChange} required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
    </div>
  );
}

// PasswordInput component
type PasswordInputProps = {
  readonly label: string;
  readonly name: string;
  readonly value: string;
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly visible: boolean;
  readonly toggleVisible: () => void;
};

function PasswordInput({ label, name, value, onChange, visible, toggleVisible }: PasswordInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input type={visible ? 'text' : 'password'} name={name} value={value} onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        <button type="button" onClick={toggleVisible} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {visible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <p className="mt-1 text-xs text-gray-500">Dejar en blanco para no cambiar</p>
    </div>
  );
}
