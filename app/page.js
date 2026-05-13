'use client';
import { useState } from "react";
import Alumno from "./alumno";

export default function Home() {

  const [mensaje, setMensaje] = useState('');

  function cambiarMensaje(){
    setMensaje('hola alumnos');
  }

  
  return (
    <div style={estilos.contenedor}>
      <button onClick={() => cambiarMensaje()} style={estilos.boton}>Cambia mensaje</button>
      <p>Mensaje: {mensaje}</p>

      <Alumno></Alumno>
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
