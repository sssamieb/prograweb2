import { useState, useEffect } from 'react';

function App() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);


  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');


  useEffect(() => {
    fetch('http://localhost:3000/api/clientes')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return res.json();
      })
      .then((data) => {
        setClientes(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setError('No se pudo conectar con el servidor');
        setCargando(false);
      });
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoCliente = { nombre, correo, telefono, direccion };

    fetch('http://localhost:3000/api/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoCliente),
    })
      .then((res) => res.json())
      .then((clienteCreado) => {
        setClientes([...clientes, clienteCreado]);
        setNombre('');
        setCorreo('');
        setTelefono('');
        setDireccion('');
      })
      .catch((err) => console.error('Error al registrar:', err));
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Gestión de Clientes</h1>

      {cargando && <p>Cargando clientes...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
        <h3>Registrar Nuevo Cliente</h3>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Nombre" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="email" 
            placeholder="Correo" 
            value={correo} 
            onChange={(e) => setCorreo(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Teléfono" 
            value={telefono} 
            onChange={(e) => setTelefono(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Dirección" 
            value={direccion} 
            onChange={(e) => setDireccion(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 15px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Guardar Cliente
        </button>
      </form>

      <h3>Lista de Clientes</h3>
      {clientes.map((cliente) => (
        <div key={cliente.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '10px', background: '#fff' }}>
          <p><strong>ID:</strong> {cliente.id}</p>
          <p><strong>Nombre:</strong> {cliente.nombre}</p>
          <p><strong>Correo:</strong> {cliente.correo}</p>
          <p><strong>Teléfono:</strong> {cliente.telefono}</p>
          <p><strong>Dirección:</strong> {cliente.direccion}</p>
        </div>
      ))}
    </div>
  );
}

export default App;