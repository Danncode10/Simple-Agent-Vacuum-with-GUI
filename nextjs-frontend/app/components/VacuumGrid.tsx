'use client';

import React, { useState, useEffect } from 'react';

interface Cell {
  type: 'empty' | 'dirt' | 'vacuum';
  visited: boolean;
}

interface RoomState {
  grid: string[][];
  dirt_positions: [number, number][];
}

interface AgentState {
  position: [number, number];
  moves: number;
}

interface GameState {
  room: RoomState;
  agent: AgentState;
}

const VacuumGrid: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoRunning, setAutoRunning] = useState(false);
  const [visited, setVisited] = useState<Set<string>>(new Set());

  const API_BASE = 'http://127.0.0.1:5001/api';

  useEffect(() => {
    fetchState();
  }, []);

  const fetchState = async () => {
    try {
      const response = await fetch(`${API_BASE}/state`);
      const data = await response.json();
      setGameState(data);
    } catch (error) {
      console.error('Failed to fetch state:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMove = async (direction: string) => {
    try {
      const response = await fetch(`${API_BASE}/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction }),
      });
      const data = await response.json();
      if (data.success) {
        setVisited(prev => new Set(prev).add(`${data.position[0]}-${data.position[1]}`));
        await fetchState();
      }
    } catch (error) {
      console.error('Move failed:', error);
    }
  };

  const handleAutoClean = async () => {
    setAutoRunning(true);
    try {
      const response = await fetch(`${API_BASE}/auto_clean`, {
        method: 'POST',
      });
      const data = await response.json();
      const actions = data.actions;

      // Animate actions
      for (let i = 0; i < actions.length; i++) {
        setTimeout(() => {
          const action = actions[i];
          if (action.type === 'move') {
            setVisited(prev => new Set(prev).add(`${action.position[0]}-${action.position[1]}`));
            setGameState(prev => prev ? {
              ...prev,
              agent: { ...prev.agent, position: action.position, moves: prev.agent.moves + 1 }
            } : null);
          } else if (action.type === 'clean') {
            setGameState(prev => prev ? {
              ...prev,
              room: {
                ...prev.room,
                dirt_positions: prev.room.dirt_positions.filter(([x, y]) => x !== action.position[0] || y !== action.position[1]),
                grid: prev.room.grid.map((row, y) =>
                  row.map((cell, x) =>
                    x === action.position[0] && y === action.position[1] ? 'clean' : cell
                  )
                )
              }
            } : null);
          }
        }, i * 500); // 500ms delay per action
      }

      // Set final state after animation
      setTimeout(() => {
        setGameState(data.final_state);
        setAutoRunning(false);
      }, actions.length * 500 + 100);

    } catch (error) {
      console.error('Auto clean failed:', error);
      setAutoRunning(false);
    }
  };

  const handleReset = async () => {
    try {
      await fetch(`${API_BASE}/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dirt_count: 10 }),
      });
      setVisited(new Set());
      await fetchState();
    } catch (error) {
      console.error('Reset failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">Failed to load game state</div>
      </div>
    );
  }

  const { room, agent } = gameState;
  const gridSize = room.grid.length;

  // Create grid with vacuum
  const grid: Cell[][] = room.grid.map((row, y) =>
    row.map((cell, x) => {
      let type: Cell['type'] = cell === 'dirt' ? 'dirt' : 'empty';
      if (x === agent.position[0] && y === agent.position[1]) {
        type = 'vacuum';
      }
      return { type, visited: visited.has(`${x}-${y}`) };
    })
  );

  const getCellColor = (type: Cell['type'], isVisited: boolean) => {
    if (type === 'vacuum') return 'bg-blue-500';
    if (type === 'dirt') return 'bg-yellow-600';
    if (isVisited) return 'bg-blue-200';
    return 'bg-gray-200';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Vacuum Cleaner Environment</h1>

      <div className="grid grid-cols-10 gap-1 border-2 border-gray-400 p-4 bg-white mb-4">
        {grid.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`w-8 h-8 ${getCellColor(cell.type, cell.visited)} border border-gray-300 flex items-center justify-center text-xs font-bold`}
            >
              {cell.type === 'vacuum' && 'V'}
              {cell.type === 'dirt' && 'D'}
            </div>
          ))
        )}
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <p>Moves: {agent.moves} | Dirt remaining: {room.dirt_positions.length}</p>
      </div>

      {/* Manual Controls */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Manual Control</h2>
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => handleMove('up')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            ↑ Up
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => handleMove('left')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              ← Left
            </button>
            <button
              onClick={() => handleMove('right')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              → Right
            </button>
          </div>
          <button
            onClick={() => handleMove('down')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            ↓ Down
          </button>
        </div>
      </div>

      {/* Auto Controls */}
      <div className="flex gap-4">
        <button
          onClick={handleAutoClean}
          disabled={autoRunning}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {autoRunning ? 'Cleaning...' : 'Auto Clean'}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>V: Vacuum | D: Dirt | Light Blue: Visited | Gray: Clean floor</p>
      </div>
    </div>
  );
};

export default VacuumGrid;
