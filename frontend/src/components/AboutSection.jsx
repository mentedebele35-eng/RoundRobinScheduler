import React from 'react';
import { Info, Zap, BarChart2 } from 'lucide-react';

const AboutSection = () => {
  return (
    <div className="card" style={{ marginTop: '3rem', borderLeft: '4px solid var(--primary)' }}>
      <div className="flex-row" style={{ marginBottom: '1rem' }}>
        <Info color="var(--primary)" />
        <h2>About Round Robin</h2>
      </div>
      
      <p style={{ marginBottom: '1rem' }}>
        <strong>Round Robin (RR)</strong> is a CPU scheduling algorithm where each process is assigned a fixed time slot in a cyclic way. 
        It is designed to give every process a fair share of CPU time.
      </p>

      <div className="grid-cols-2">
        <div>
          <div className="flex-row" style={{ marginBottom: '0.5rem', marginTop: '1rem' }}>
            <Zap color="var(--accent)" size={20} />
            <h3>How it Works</h3>
          </div>
          <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-color)' }}>
            <li>A <strong>Time Quantum</strong> (e.g., 2ms) is defined.</li>
            <li>The scheduler picks the first process from the queue.</li>
            <li>If it finishes within the quantum, it leaves.</li>
            <li>If it takes longer, it is <strong>preempted</strong> and moved to the back of the queue.</li>
          </ul>
        </div>
        
        <div>
            <div className="flex-row" style={{ marginBottom: '0.5rem', marginTop: '1rem' }}>
                <BarChart2 color="var(--primary)" size={20} />
                <h3>Key Metrics</h3>
            </div>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-color)' }}>
                <li><strong>Arrival Time:</strong> When process enters system.</li>
                <li><strong>Burst Time:</strong> Total CPU time needed.</li>
                <li><strong>Turnaround Time:</strong> Completion - Arrival.</li>
                <li><strong>Waiting Time:</strong> Turnaround - Burst.</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
