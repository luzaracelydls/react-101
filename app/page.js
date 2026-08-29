'use client';
import { useState } from "react";
import Alumno from "./alumno";

const alumnos = [
  { id: 1, nombre: 'Ana' },
  { id: 2, nombre: 'Luis' },
  { id: 3, nombre: 'María' },
];

export default function Home() {

  const [mensaje, setMensaje] = useState('');

  function cambiarMensaje(){
    setMensaje('hola alumnos');
  }

  
  return (
    <div style={estilos.contenedor}>
      <button onClick={() => cambiarMensaje()} style={estilos.boton}>Cambia mensaje</button>
      <p>Mensaje: {mensaje}</p>

      {alumnos.map((alumno) => (
        <Alumno key={alumno.id} nombre={alumno.nombre} />
      ))}
    </div>
  );
}

const estilos = {
  contenedor: {
    backgroundColor: '#DCCDE8',
    color: '#00100B'
  },
  boton: {
    backgroundColor: '#14BDEB',
    color: '#00100B'
  }
}
