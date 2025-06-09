import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [promos, setPromos] = useState([]);
  const [code, setCode] = useState('');
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch('/promotions')
      .then(res => res.json())
      .then(setPromos);
  }, []);

  const apply = () => {
    fetch('/promotions/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, amount: parseInt(amount, 10) })
    })
      .then(res => res.json())
      .then(setResult);
  };

  return (
    <div className="app">
      <h1>Promotion Engine</h1>
      <div>
        <input value={code} onChange={e => setCode(e.target.value)} placeholder="Code" />
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        <button onClick={apply}>Apply</button>
      </div>
      {result && (
        <div className="result">New amount: {result.amount}</div>
      )}
      <ul>
        {promos.map(p => (
          <li key={p.id}>{p.name} - {p.code}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
