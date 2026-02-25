# Vacuum Cleaner Agent Project Overview

## Project Description
This project implements a simple agent-based vacuum cleaner simulation in Python with a Next.js web interface. The vacuum cleaner agent operates in a 2D grid-based room environment where dirt is randomly scattered. The agent automatically navigates to dirt locations using only horizontal and vertical movements (no diagonal moves) to clean them.

## Key Requirements
- **Agent Behavior**: Vacuum moves up/down and left/right (but not diagonally) to reach dirt positions
- **Environment**: 2D grid room with randomly placed dirt
- **Technology Stack**: Python for agent logic and simulation, Next.js for GUI visualization
- **Interaction**: Web-based interface to start simulation and view cleaning process

## Project Structure
```
vacuum-cleaner-project/
├── python-backend/
│   ├── environment.py
│   ├── agent.py
│   ├── server.py
│   └── requirements.txt
└── nextjs-frontend/
    ├── components/
    ├── pages/
    └── package.json
```

## System Architecture

### Backend (Python)
- **Environment Module**: Defines the 10x10 grid room with 10 randomly placed dirt spots
- **Vacuum Agent Module**: Implements the agent's decision-making and movement logic
- **API Server**: Provides endpoints for simulation control and state retrieval (using Flask/FastAPI)

### Frontend (Next.js)
- **Visualization Component**: Renders the room grid, vacuum position, and dirt locations
- **Control Interface**: Buttons to start/pause/reset simulation
- **Real-time Updates**: Displays agent movements and cleaning progress

## Implementation Approach

### Phase 1: Environment Setup
1. Initialize Python project with required dependencies (Flask/FastAPI, numpy for grid operations)
2. Set up Next.js project with basic UI components
3. Establish communication protocol between Python backend and Next.js frontend

### Phase 2: Core Simulation Logic
1. Implement Room class:
   - Grid representation (10x10)
   - Random dirt placement function (10 dirt spots)
   - State tracking (clean/dirty cells)

2. Implement VacuumAgent class:
   - Position tracking
   - Movement logic (up/down/left/right only)
   - Pathfinding algorithm to reach nearest dirt (BFS or A* without diagonal moves)
   - Cleaning action when reaching dirt

3. Simulation controller:
   - Step-by-step execution
   - Performance metrics (moves made, time taken, dirt cleaned)

### Phase 3: Frontend Integration
1. Create grid visualization component
2. Implement real-time state updates from backend
3. Add simulation controls (start, pause, reset)
4. Display agent path and cleaning progress

### Phase 4: Testing and Refinement
1. Unit tests for agent movement and pathfinding
2. Integration tests for backend-frontend communication
3. Performance optimization for larger grids
4. UI/UX improvements

## Technical Considerations
- **Movement Constraints**: Agent can only move to adjacent cells (up, down, left, right) - no diagonal movement allowed
- **Pathfinding**: Use BFS to find shortest path to dirt, ensuring only cardinal direction moves
- **State Management**: Track room state, agent position, and cleaning progress
- **Real-time Updates**: WebSocket or polling for live simulation updates
- **Scalability**: Design for configurable room sizes and dirt density

## Success Criteria
- Agent successfully navigates to all dirt locations using only horizontal/vertical moves
- Clean, intuitive web interface showing the cleaning process
- Accurate simulation of agent behavior and environment changes
- Modular code structure allowing for future enhancements

## Future Enhancements
- Multiple vacuum agents
- Obstacles in the room
- Different cleaning strategies (e.g., spiral pattern)
- Performance analytics and comparison of different algorithms