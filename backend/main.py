from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

print("API KEY:", os.getenv("OPENAI_API_KEY"))

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResearchRequest(BaseModel):
    niche: str
    country: str
    budget: str

@app.get("/")
def home():
    return {"message": "Backend is working"}

@app.post("/research")
def research(data: ResearchRequest):

    prompt = f"""
    Find 3 winning products for:
    Niche: {data.niche}
    Country: {data.country}
    Budget: {data.budget}
    """

    response = client.responses.create(
        model="gpt-4.1-mini",
        input=prompt
    )

    return {"result": response.output_text}