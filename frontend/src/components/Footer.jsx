import React from 'react';
import { Github, Heart, Code2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">

        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2 text-white/40 font-mono text-xs uppercase tracking-widest">
            <Code2 size={14} />
            <span>Process Scheduling Simulation Engine v2.0</span>
          </div>
          
          <div className="h-px w-24 bg-white/10"></div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: '800' }}>Supervised by</span>
              <span style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 'bold' }}>Gashaw A(Msc.)</span>
            </div>

            <div className="h-px w-12 bg-white/5 mb-2"></div>

            <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: '800' }}>Developed by</span>
            <span style={{ 
              fontWeight: '900', 
              color: '#00f2ff', 
              fontFamily: "'JetBrains Mono', monospace", 
              fontSize: '1.2rem', 
              textShadow: '0 0 15px rgba(0, 242, 255, 0.8), 0 0 30px rgba(0, 242, 255, 0.4)',
              letterSpacing: '-0.02em'
            }}>Mentesnot Debele (NSR/659/16)</span>
            <span style={{ 
              fontWeight: '900', 
              color: '#00f2ff', 
              fontFamily: "'JetBrains Mono', monospace", 
              fontSize: '1.2rem', 
              textShadow: '0 0 15px rgba(0, 242, 255, 0.8), 0 0 30px rgba(0, 242, 255, 0.4)',
              letterSpacing: '-0.02em'
            }}>Biniyam Taye (NSR/190/16)</span>
            
            <p className="text-[0.65rem] text-white/30 uppercase font-black tracking-[0.3em]" style={{ marginTop: '15px' }}>
              AMU 16 Batch 2018 E.C.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
