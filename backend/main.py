from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
import os

# Load .env
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

# 🔥 CORS (allow all for now)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "https://ecommerce-ai-agent-lhsmkop1j-nikobro1s-projects.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class ResearchRequest(BaseModel):
    niche: str
    country: str
    budget: str

# Health check
@app.get("/")
def home():
    return {"message": "Backend is working"}

# 🔥 AI endpoint
@app.post("/research")
def research(data: ResearchRequest):
    try:
        prompt = f"""
        You are an expert e-commerce product researcher.

        Return your answer in this EXACT format:

        === PRODUCTS ===
        (List 3 products with name, price, why it sells)

        === ADS ===
        (Write 3 TikTok ad ideas)

        ===MARKETING PLAN ===
        (7-day simple plan)

        Niche: {data.niche}
        Country: {data.country}
        Budget: {data.budget}
        """

        response = client.responses.create(
            model="gpt-4.1-mini",
            input=prompt
        )

        return {"result": response.output_text}

    except Exception as e:
        return {"result": f"Error: {str(e)}"}