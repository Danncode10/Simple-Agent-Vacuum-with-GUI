from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from environment import Room
from agent import VacuumAgent
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global state
room = Room()
agent = VacuumAgent(room)

class MoveRequest(BaseModel):
    direction: str

class ResetRequest(BaseModel):
    dirt_count: int = 10

@app.get("/api/state")
def get_state():
    return {
        "room": room.get_state(),
        "agent": agent.get_state()
    }

@app.post("/api/reset")
def reset(req: ResetRequest):
    room.reset(req.dirt_count)
    agent.reset()
    return {"message": "Reset successful"}

@app.post("/api/move")
def manual_move(req: MoveRequest):
    direction = req.direction
    dx, dy = 0, 0
    if direction == 'up':
        dy = -1
    elif direction == 'down':
        dy = 1
    elif direction == 'left':
        dx = -1
    elif direction == 'right':
        dx = 1

    new_x = agent.x + dx
    new_y = agent.y + dy

    if 0 <= new_x < room.size and 0 <= new_y < room.size:
        agent.x = new_x
        agent.y = new_y
        agent.moves += 1
        # Auto clean if on dirt
        cleaned = agent.clean_current_cell()
        return {
            "success": True,
            "position": (agent.x, agent.y),
            "cleaned": cleaned
        }
    return {"success": False, "message": "Invalid move"}

@app.post("/api/auto_clean")
def auto_clean():
    actions = agent.auto_clean()
    return {
        "actions": actions,
        "final_state": {
            "room": room.get_state(),
            "agent": agent.get_state()
        }
    }

@app.post("/api/step_auto")
def step_auto():
    """Perform one step of auto cleaning"""
    if not room.dirt_positions:
        return {"done": True, "message": "All dirt cleaned"}

    dirt = agent.find_nearest_dirt()
    if not dirt:
        return {"done": True, "message": "No reachable dirt"}

    # Move towards dirt
    reached = agent.move_to(dirt[0], dirt[1])
    action = {"type": "move", "position": (agent.x, agent.y)}

    if reached:
        # Clean
        cleaned = agent.clean_current_cell()
        if cleaned:
            action = {"type": "clean", "position": (agent.x, agent.y)}

    return {
        "done": False,
        "action": action,
        "room": room.get_state(),
        "agent": agent.get_state()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5001)
