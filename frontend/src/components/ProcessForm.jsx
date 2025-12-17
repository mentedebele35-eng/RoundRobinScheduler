import React, { useState } from 'react';
import { Plus, Play, Trash2, RefreshCw, X } from 'lucide-react';

const ProcessForm = ({ onSimulate }) => {
  const [processes, setProcesses] = useState([
    { pid: 'P1', arrival: 0, burst: 10 },
    { pid: 'P2', arrival: 1, burst: 4 },
    { pid: 'P3', arrival: 2, burst: 5 },
    { pid: 'P4', arrival: 3, burst: 3 },
  ]);
  const [quantum, setQuantum] = useState(2);

  const addProcess = () => {
    const nextId = processes.length + 1;
    // Find unique ID
    let id = `P${nextId}`;
    let counter = nextId;
    while (processes.some(p => p.pid === id)) {
        counter++;
        id = `P${counter}`;
    }
    setProcesses([...processes, { pid: id, arrival: 0, burst: 5 }]);
  };

  const updateProcess = (index, field, value) => {
    const newProcesses = [...processes];
    newProcesses[index][field] = value;
    setProcesses(newProcesses);
  };

  const removeProcess = (index) => {
    setProcesses(processes.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setProcesses([]);
  };

  const randomize = () => {
    const count = Math.floor(Math.random() * 4) + 3; // 3 to 6 processes
    const newProcs = [];
    for (let i = 1; i <= count; i++) {
        newProcs.push({
            pid: `P${i}`,
            arrival: Math.floor(Math.random() * 5),
            burst: Math.floor(Math.random() * 10) + 1
        });
    }
    setProcesses(newProcs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (processes.length === 0) return;
    const validProcesses = processes.map(p => ({
      ...p,
      arrival: parseInt(p.arrival) || 0,
      burst: parseInt(p.burst) || 1
    }));
    onSimulate(validProcesses, parseInt(quantum) || 1);
  };

  return (
    <div className="card">
      <div className="flex-row" style={{ justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2>Configuration</h2>
        <div className="flex-row">
            <button type="button" className="secondary" onClick={randomize} title="Randomize Data">
                <RefreshCw size={16} /> Randomize
            </button>
            <button type="button" className="danger" onClick={clearAll} title="Clear All">
                <Trash2 size={16} /> Clear
            </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontWeight: 600, marginRight: '1rem' }}>Time Quantum (ms): </label>
          <input 
            type="number" 
            min="1" 
            value={quantum} 
            onChange={(e) => setQuantum(e.target.value)} 
            style={{ width: '100px' }}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Processes</h3>
          <div className="flex-col">
            {processes.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--secondary)', padding: '2rem', border: '2px dashed var(--border-color)', borderRadius: '0.5rem' }}>
                    No processes added. Click "Add Process" to start.
                </div>
            )}
            {processes.map((p, index) => (
                <div key={index} className="flex-row" style={{ 
                    padding: '0.75rem', 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-color)' 
                }}>
                <span style={{ minWidth: '40px', fontWeight: 'bold' }}>{p.pid}</span>
                <div className="flex-row" style={{ flex: 1 }}>
                    <input
                        type="number"
                        placeholder="Arrival Time"
                        value={p.arrival}
                        onChange={(e) => updateProcess(index, 'arrival', e.target.value)}
                        title="Arrival Time"
                    />
                    <input
                        type="number"
                        placeholder="Burst Time"
                        value={p.burst}
                        onChange={(e) => updateProcess(index, 'burst', e.target.value)}
                        title="Burst Time"
                    />
                </div>
                <button 
                    type="button" 
                    className="danger"
                    onClick={() => removeProcess(index)}
                    style={{ padding: '0.5rem' }}
                >
                    <X size={18} />
                </button>
                </div>
            ))}
          </div>
        </div>

        <div className="flex-row" style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <button type="button" className="secondary" onClick={addProcess}>
            <Plus size={18} /> Add Process
          </button>
          <button type="submit" style={{ marginLeft: 'auto' }}>
            <Play size={18} /> Run Simulation
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProcessForm;
