from collections import deque

class VacuumAgent:
    def __init__(self, room, start_x=0, start_y=0):
        self.room = room
        self.x = start_x
        self.y = start_y
        self.moves = 0

    def move_to(self, target_x, target_y):
        """Move one step towards the target using BFS for pathfinding"""
        if self.x == target_x and self.y == target_y:
            return True  # Already there

        # Simple BFS to find next move (only cardinal directions)
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # left, right, up, down

        # Check if target is adjacent
        for dx, dy in directions:
            nx, ny = self.x + dx, self.y + dy
            if 0 <= nx < self.room.size and 0 <= ny < self.room.size and nx == target_x and ny == target_y:
                self.x = nx
                self.y = ny
                self.moves += 1
                return True

        # If not adjacent, move towards target
        if target_x < self.x:
            self.x -= 1
        elif target_x > self.x:
            self.x += 1
        elif target_y < self.y:
            self.y -= 1
        elif target_y > self.y:
            self.y += 1

        self.moves += 1
        return self.x == target_x and self.y == target_y

    def clean_current_cell(self):
        return self.room.clean_cell(self.x, self.y)

    def find_nearest_dirt(self):
        """Find the nearest dirt using BFS"""
        if not self.room.dirt_positions:
            return None

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

    def auto_clean(self):
        """Automatically clean all dirt"""
        actions = []
        while self.room.dirt_positions:
            dirt = self.find_nearest_dirt()
            if not dirt:
                break

            # Move to dirt
            while not (self.x == dirt[0] and self.y == dirt[1]):
                self.move_to(dirt[0], dirt[1])
                actions.append({'type': 'move', 'position': (self.x, self.y)})

            # Clean
            cleaned = self.clean_current_cell()
            if cleaned:
                actions.append({'type': 'clean', 'position': (self.x, self.y)})

        return actions

    def get_state(self):
        return {
            'position': (self.x, self.y),
            'moves': self.moves
        }

    def reset(self, start_x=0, start_y=0):
        self.x = start_x
        self.y = start_y
        self.moves = 0