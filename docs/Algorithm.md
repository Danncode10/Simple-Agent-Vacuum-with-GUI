# Vacuum Cleaner Agent Algorithm

## Overview

The vacuum cleaner agent uses a **Breadth-First Search (BFS)** algorithm to find the most efficient path to dirt locations in a 10x10 grid room. This ensures the agent always takes the shortest possible route to clean dirt.

## How BFS Works

Breadth-First Search is a graph traversal algorithm that explores all nodes at the current depth level before moving to the next level. In this implementation:

1. **Graph Representation**: The 10x10 grid is treated as a graph where each cell is a node
2. **Neighbors**: Each cell has up to 4 neighbors (up, down, left, right) - no diagonal movement allowed
3. **Distance Calculation**: BFS finds the minimum number of moves to reach any dirt location

## Agent Decision Process

```
While there is dirt in the room:
    1. Find the nearest dirt using BFS
    2. Calculate the shortest path to that dirt
    3. Move step-by-step along the path
    4. Clean the dirt when reached
    5. Repeat for next nearest dirt
```

## BFS Implementation Details

```python
def find_nearest_dirt(self):
    visited = set()
    queue = deque([(self.x, self.y, 0)])  # x, y, distance
    visited.add((self.x, self.y))

    while queue:
        x, y, dist = queue.popleft()
        if (x, y) in self.room.dirt_positions:
            return x, y

        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < self.room.size and 0 <= ny < self.room.size and (nx, ny) not in visited:
                visited.add((nx, ny))
                queue.append((nx, ny, dist + 1))

    return None
```

## Movement Strategy

The agent uses a simple but effective movement strategy:

1. **Check Adjacent**: If target dirt is adjacent (1 step away), move directly to it
2. **Path Following**: Otherwise, move in the direction that reduces distance to target
3. **Priority**: X-coordinate movement takes precedence, then Y-coordinate

## Why BFS?

- **Optimality**: Guarantees the shortest path in an unweighted grid
- **Completeness**: Will find a solution if one exists
- **Efficiency**: O(rows × columns) time complexity for the grid search
- **Simplicity**: Easy to implement and understand

## Limitations

- No diagonal movement (as per requirements)
- Doesn't consider obstacles (room has no walls)
- Single agent (no coordination with other agents)
- No learning or adaptation to room layout

## Performance

For a 10x10 grid:
- **Space Complexity**: O(100) for the queue and visited set
- **Time Complexity**: O(100) per dirt search
- **Total Moves**: Varies based on dirt distribution, but always optimal

This algorithm demonstrates how basic AI techniques can solve complex problems efficiently.