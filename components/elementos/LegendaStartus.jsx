import React from 'react';

const LegendaStatus = () => {
  return (
    <div className="legenda-status fixed bottom-8 right-8 flex flex-col gap-2">
      <div className="status-item flex items-center gap-1">
        <div className="status-cor w-4 h-4 md:w-5 md:h-5 bg-yellow-200 rounded-full"></div>
        <div className="status-label">Análise</div>
      </div>
      <div className="status-item flex items-center gap-1">
        <div className="status-cor w-4 h-4 md:w-5 md:h-5 bg-blue-300 rounded-full"></div>
        <div className="status-label">Aprovado</div>
      </div>
      <div className="status-item flex items-center gap-1">
        <div className="status-cor w-4 h-4 md:w-5 md:h-5 bg-red-300 rounded-full"></div>
        <div className="status-label">Recusado</div>
      </div>
    </div>
  );
};

export default LegendaStatus;
