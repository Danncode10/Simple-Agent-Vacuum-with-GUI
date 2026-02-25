# Vacuum Cleaner Agent Functionality

## System Overview

The Vacuum Cleaner Agent is a complete simulation system that demonstrates agent-based AI in Python. The system consists of three main components:

1. **Python Backend**: Agent logic and room simulation
2. **FastAPI Server**: REST API for communication
3. **Next.js Frontend**: Visual interface and controls

## Core Components

### Room Environment (`environment.py`)

The room is represented as a 10x10 grid with the following features:

- **Grid Structure**: 2D list of strings representing cell states
- **Dirt Placement**: 10 random dirt spots placed during initialization
- **State Management**: Tracks clean/dirty cells and dirt positions
- **Reset Functionality**: Generates new random dirt distribution

```python
class Room:
    def __init__(self, size=10, dirt_count=10):
        # Creates 10x10 grid with 10 random dirt spots

    def clean_cell(self, x, y):
        # Removes dirt at position (x,y) if present
```

### Vacuum Agent (`agent.py`)

The intelligent agent that navigates and cleans the room:

- **Position Tracking**: Current (x,y) coordinates in the grid
- **Pathfinding**: Uses BFS to find optimal paths to dirt
- **Movement Logic**: Moves up/down/left/right only (no diagonals)
- **Cleaning Action**: Automatically cleans dirt when reaching it
- **Performance Metrics**: Tracks total moves made

```python
class VacuumAgent:
    def __init__(self, room, start_x=0, start_y=0):
        # Agent starts at top-left corner (0,0)

    def auto_clean(self):
        # Main cleaning algorithm - finds and cleans all dirt
```

### API Server (`server.py`)

FastAPI-based REST API providing endpoints for:

- **GET /api/state**: Current room and agent state
- **POST /api/move**: Manual movement (up/down/left/right)
- **POST /api/auto_clean**: Trigger automatic cleaning
- **POST /api/reset**: Reset room with new dirt
- **GET /docs**: Interactive API documentation

## User Interface Features

### Visual Grid Display

- **10x10 Grid**: Visual representation of the room
- **Color Coding**:
  - Blue: Vacuum cleaner position
  - Yellow: Dirt locations
  - Light Blue: Visited cells
  - Gray: Clean floor

### Control Options

1. **Manual Control**:
   - Arrow buttons for directional movement
   - Real-time position updates
   - Automatic cleaning when stepping on dirt

2. **Automatic Mode**:
   - "Auto Clean" button triggers intelligent cleaning
   - Animated movement with 500ms delays
   - Step-by-step visualization of agent behavior

3. **Reset Function**:
   - Generates new random dirt distribution
   - Resets agent position to (0,0)
   - Clears visited cell tracking

## Agent Behavior Details

### Perception
- Knows exact location of all dirt spots
- Tracks current position and move count
- Maintains visited cell history

### Decision Making
- Always chooses nearest dirt as next target
- Uses BFS to calculate optimal path
- Prioritizes X-coordinate movement over Y

### Action Execution
- Moves one cell at a time
- Cleans dirt immediately upon reaching it
- Updates position and statistics in real-time

## Data Flow

```
Frontend Request → FastAPI Server → Agent Logic → Room Update → Response → Frontend Update
```

1. User interacts with frontend controls
2. Frontend sends API request to backend
3. Backend processes request using agent/room logic
4. Room state is updated based on agent actions
5. Updated state is returned to frontend
6. Frontend re-renders with new visual state

## Technical Architecture

### Backend Architecture
```
FastAPI Server
├── Room Class (environment.py)
├── VacuumAgent Class (agent.py)
└── REST Endpoints (server.py)
```

### Frontend Architecture
```
Next.js App
├── VacuumGrid Component
├── State Management (React hooks)
├── API Communication (fetch)
└── Real-time Updates
```

## Key Features

- **Real-time Visualization**: Watch the agent work step-by-step
- **Interactive Controls**: Manual or automatic operation modes
- **Performance Tracking**: Move counter and dirt remaining display
- **Responsive Design**: Works on different screen sizes
- **CORS Enabled**: Proper cross-origin resource sharing
- **Error Handling**: Graceful failure handling and user feedback

## Educational Value

This project demonstrates fundamental AI concepts:

- **Agent-Based Systems**: Autonomous decision-making entities
- **Pathfinding Algorithms**: BFS for optimal route calculation
- **State Management**: Tracking and updating system state
- **User Interface Design**: Visual representation of AI behavior
- **API Design**: RESTful communication between components

The system serves as a practical example of how theoretical AI algorithms can be implemented in real applications.