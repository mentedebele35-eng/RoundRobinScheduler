import React from 'react';

const SchedulerResults = ({ results, log, timeline }) => {
  if (!results || results.length === 0) return null;

  // Calculate total time for Gantt chart scaling
  const maxTime = timeline[timeline.length - 1].end;

  return (
    <div className="card">
      <h2>Simulation Results</h2>

      <div className="gantt-chart">
        {timeline.map((block, index) => {
          const duration = block.end - block.start;
          const widthPercent = (duration / maxTime) * 100;
          
          // Generate deterministic color based on PID
          const pidNum = parseInt(block.pid.replace('P', '')) || 1;
          const hue = (pidNum * 50) % 360;
          const color = `hsl(${hue}, 70%, 60%)`;

          return (
            <div 
              key={index} 
              className="gantt-block" 
              style={{ width: `${widthPercent}%`, backgroundColor: color }}
              title={`Process ${block.pid}: ${block.start} - ${block.end}`}
            >
              {block.pid}
              <span className="time-marker" style={{ left: 0 }}>{block.start}</span>
              {index === timeline.length - 1 && (
                 <span className="time-marker" style={{ left: '100%', transform: 'translateX(-50%)' }}>{block.end}</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid-cols-2" style={{ marginTop: '2rem' }}>
        <div>
          <h3>Metrics</h3>
          <table>
            <thead>
              <tr>
                <th>PID</th>
                <th>Arrival</th>
                <th>Burst</th>
                <th>Completion</th>
                <th>Turnaround</th>
                <th>Waiting</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.pid}>
                  <td>{r.pid}</td>
                  <td>{r.arrival}</td>
                  <td>{r.burst}</td>
                  <td>{r.completion}</td>
                  <td>{r.turnaround}</td>
                  <td>{r.waiting}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div style={{ marginTop: '1rem' }}>
            <strong>Avg Turnaround: </strong>
            {(results.reduce((acc, r) => acc + r.turnaround, 0) / results.length).toFixed(2)}
            <br />
            <strong>Avg Waiting: </strong>
            {(results.reduce((acc, r) => acc + r.waiting, 0) / results.length).toFixed(2)}
          </div>
        </div>

        <div>
          <h3>Execution Log</h3>
          <div style={{ 
            backgroundColor: '#f9fafb', 
            padding: '1rem', 
            borderRadius: '6px', 
            fontFamily: 'monospace',
            maxHeight: '300px',
            overflowY: 'auto',
            border: '1px solid var(--border-color)',
            fontSize: '0.9rem'
          }}>
            {log.map((entry, i) => (
              <div key={i} style={{ marginBottom: '0.25rem' }}>{entry}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulerResults;
