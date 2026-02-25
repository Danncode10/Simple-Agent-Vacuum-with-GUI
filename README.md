# Vacuum Cleaner Agent Simulation

This project demonstrates a simple agent-based solution in Python for a vacuum cleaner that autonomously cleans a room. It fulfills the requirement for implementing simple agent-based solutions as described in assignment 2.2.

## How It Works

Imagine a 10x10 grid representing a room, like a checkerboard. Some squares have dirt (marked as 'D'), and there's a vacuum cleaner (marked as 'V') that starts in the top-left corner.

The vacuum cleaner is an intelligent agent that:
1. Looks at the entire room to find the closest dirt
2. Moves directly to that dirt using the shortest path (only moving up, down, left, or right - no diagonal moves)
3. Cleans the dirt when it reaches it
4. Repeats this process until all dirt is cleaned

The agent uses a pathfinding algorithm called Breadth-First Search (BFS) to always find the most efficient route to the nearest dirt. This ensures the vacuum doesn't waste time moving unnecessarily.

## Key Features

- **10x10 Grid Room**: A square room with 100 possible positions
- **10 Random Dirt Spots**: Dirt is placed randomly each time you reset
- **Intelligent Pathfinding**: The agent always takes the shortest path to dirt
- **Visual Feedback**: Watch the vacuum move and clean in real-time
- **Manual Control**: You can also control the vacuum manually with arrow buttons
- **Visited Tracking**: See where the vacuum has been (light blue squares)

## Technology Used

- **Backend**: Python with FastAPI for the agent logic and room simulation
- **Frontend**: Next.js with React for the visual interface
- **Pathfinding**: Breadth-First Search algorithm for optimal movement

## How to Run

1. Clone this repository
2. Run the start script: `./start.sh`
3. Open your browser to `http://localhost:3000` to see the simulation

The start script will automatically:
- Install all required Python and Node.js dependencies
- Start the backend server on port 5001
- Start the frontend on port 3000

## Controls

- **Manual Control**: Use the arrow buttons to move the vacuum manually
- **Auto Clean**: Click "Auto Clean" to watch the agent work automatically
- **Reset**: Click "Reset" to generate new random dirt and reset the vacuum position

## API Documentation

The backend provides a FastAPI interface. Visit `http://127.0.0.1:5001/docs` for interactive API documentation.

## Understanding the Agent Behavior

The vacuum cleaner agent demonstrates basic AI principles:
- **Perception**: Knows the location of all dirt and its current position
- **Decision Making**: Chooses the nearest dirt as the next target
- **Action**: Moves efficiently to the target and cleans it
- **Goal**: Complete room cleaning with minimal unnecessary movement

This simple agent shows how even basic algorithms can solve complex problems efficiently.