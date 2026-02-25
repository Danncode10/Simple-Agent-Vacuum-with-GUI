'use client';

import React, { useState } from 'react';

interface Cell {
  type: 'empty' | 'dirt' | 'vacuum';
}

const VacuumGrid: React.FC = () => {
  // Mock data: 10x10 grid
  const gridSize = 10;
  const dirtCount = 10;

  // Generate random dirt positions
  const [dirtPositions] = useState<Set<string>>(() => {
    const positions = new Set<string>();
    while (positions.size < dirtCount) {
      const x = Math.floor(Math.random() * gridSize);
      const y = Math.floor(Math.random() * gridSize);
      positions.add(`${x}-${y}`);
    }
    return positions;
  });

  // Vacuum position
  const vacuumX = 0;
  const vacuumY = 0;

  // Create grid
  const grid: Cell[][] = [];
  for (let y = 0; y < gridSize; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < gridSize; x++) {
      let type: Cell['type'] = 'empty';
      if (x === vacuumX && y === vacuumY) {
        type = 'vacuum';
      } else if (dirtPositions.has(`${x}-${y}`)) {
        type = 'dirt';
      }
      row.push({ type });
    }
    grid.push(row);
  }

  const getCellColor = (type: Cell['type']) => {
    switch (type) {
      case 'vacuum':
        return 'bg-blue-500';
      case 'dirt':
        return 'bg-brown-600';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Vacuum Cleaner Environment</h1>
      <div className="grid grid-cols-10 gap-1 border-2 border-gray-400 p-4 bg-white">
        {grid.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`w-8 h-8 ${getCellColor(cell.type)} border border-gray-300 flex items-center justify-center text-xs font-bold`}
            >
              {cell.type === 'vacuum' && 'V'}
              {cell.type === 'dirt' && 'D'}
            </div>
          ))
        )}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>V: Vacuum | D: Dirt | Empty: Clean floor</p>
      </div>
    </div>
  );
};

export default VacuumGrid;