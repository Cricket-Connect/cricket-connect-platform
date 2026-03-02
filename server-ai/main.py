from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class MatchData(BaseModel):
    team_a_runs: int
    team_b_runs: int

@app.get("/")
def read_root():
    return {"message": "Cricket Connect AI Service is LIVE"}

@app.post("/analyze-score")
def analyze_score(data: MatchData):
    # This is where Shubham & Shivansh will add the Reliability Logic
    total_runs = data.team_a_runs + data.team_b_runs
    return {
        "total_runs": total_runs,
        "status": "Verified by AI"
    }