import random

class Room:
    def __init__(self, size=10, dirt_count=10):
        self.size = size
        self.grid = [['clean' for _ in range(size)] for _ in range(size)]
        self.dirt_positions = set()
        self._place_dirt(dirt_count)

    def _place_dirt(self, count):
        placed = 0
        while placed < count:
            x = random.randint(0, self.size - 1)
            y = random.randint(0, self.size - 1)
            if self.grid[y][x] == 'clean':
                self.grid[y][x] = 'dirt'
                self.dirt_positions.add((x, y))
                placed += 1

    def is_dirt(self, x, y):
        return (x, y) in self.dirt_positions

    def clean_cell(self, x, y):
        if (x, y) in self.dirt_positions:
            self.dirt_positions.remove((x, y))
            self.grid[y][x] = 'clean'
            return True
        return False

    def get_state(self):
        return {
            'grid': self.grid,
            'dirt_positions': list(self.dirt_positions)
        }

    def reset(self, dirt_count=10):
        self.grid = [['clean' for _ in range(self.size)] for _ in range(self.size)]
        self.dirt_positions = set()
        self._place_dirt(dirt_count)