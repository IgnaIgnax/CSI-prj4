from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import joblib
import pandas as pd
from typing import Dict, List, Any
import os
import logging

app = FastAPI()

# Configura il logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f">>> Incoming request: {request.method} {request.url}")  # Aggiungo print per debug
    logger.info(f">>> Incoming request: {request.method} {request.url}")
    logger.info(f">>> Headers: {dict(request.headers)}")
    
    try:
        response = await call_next(request)
        print(f"<<< Response status: {response.status_code}")  # Aggiungo print per debug
        logger.info(f"<<< Response status: {response.status_code}")
        return response
    except Exception as e:
        print(f"!!! Error: {str(e)}")  # Aggiungo print per debug
        logger.error(f"!!! Request failed: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"detail": str(e)}
        )

# Configurazione CORS semplificata
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.options("/analyze")
async def analyze_options():
    return JSONResponse(
        status_code=200,
        content={"message": "OK"}
    )

@app.middleware("http")
async def add_cors_headers(request: Request, call_next):
    if request.method == "OPTIONS":
        # Gestisci la richiesta OPTIONS direttamente
        return JSONResponse(
            status_code=200,
            headers={
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*",
            },
            content={"message": "OK"}
        )
    response = await call_next(request)
    return response

@app.middleware("http")
async def errors_handling(request: Request, call_next):
    try:
        logger.info(f"Incoming request: {request.method} {request.url}")
        response = await call_next(request)
        logger.info(f"Response status: {response.status_code}")
        return response
    except Exception as e:
        logger.error(f"Request error: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"detail": str(e)}
        )

@app.on_event("startup")
async def startup_event():
    """Verifica all'avvio che tutti i file necessari siano presenti"""
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        models_dir = os.path.join(current_dir, 'models')
        food_dir = os.path.join(current_dir, 'food')
        
        logger.info(f"Starting application...")
        logger.info(f"Current directory: {current_dir}")
        logger.info(f"Models directory: {models_dir}")
        logger.info(f"Food directory: {food_dir}")
        
        # Lista i contenuti delle directory
        logger.info("Directory contents:")
        logger.info(f"Current dir: {os.listdir(current_dir)}")
        logger.info(f"Models dir: {os.listdir(models_dir)}")
        logger.info(f"Food dir: {os.listdir(food_dir)}")
        
        # Verifica modelli
        required_models = ['rf_good_model.joblib', 'rf_bad_model.joblib', 'scaler.joblib']
        for model in required_models:
            path = os.path.join(models_dir, model)
            if not os.path.exists(path):
                raise Exception(f"Model file not found: {path}")
            logger.info(f"Found model: {path}")
            
        # Verifica file Excel
        required_excel = ['10-19.xlsx', '20-64.xlsx', '65-80.xlsx', '81-95.xlsx']
        for excel in required_excel:
            path = os.path.join(food_dir, excel)
            if not os.path.exists(path):
                raise Exception(f"Excel file not found: {path}")
            logger.info(f"Found Excel file: {path}")
            
    except Exception as e:
        logger.error(f"Startup error: {str(e)}")
        raise e

class BloodData(BaseModel):
    age: int
    sex: str
    blood_values: Dict[str, float]

class FoodRecommendation(BaseModel):
    food: str
    code: str
    recommendation: str
    impact_good: str
    impact_bad: str

def load_models():
    """Carica i modelli salvati"""
    current_dir = os.path.dirname(os.path.abspath(__file__))  # ottiene la directory api/
    models_dir = os.path.join(current_dir, 'models')  # usa models dentro api/
    
    logger.info(f"Loading model from: {models_dir}")
    
    try:
        rf_good = joblib.load(os.path.join(models_dir, 'rf_good_model.joblib'))
        rf_bad = joblib.load(os.path.join(models_dir, 'rf_bad_model.joblib'))
        scaler = joblib.load(os.path.join(models_dir, 'scaler.joblib'))
        return rf_good, rf_bad, scaler
    except Exception as e:
        logger.error(f"Error loading models: {str(e)}")
        raise

def get_age_range_file(age: int) -> str:
    """Determina il file corretto in base all'età"""
    current_dir = os.path.dirname(os.path.abspath(__file__))  # ottiene la directory api/
    
    if 10 <= age <= 19:
        return os.path.join(current_dir, "food/10-19.xlsx")
    elif 20 <= age <= 64:
        return os.path.join(current_dir, "food/20-64.xlsx")
    elif 65 <= age <= 80:
        return os.path.join(current_dir, "food/65-80.xlsx")
    elif 81 <= age <= 95:
        return os.path.join(current_dir, "food/81-95.xlsx")
    else:
        raise ValueError("Età non supportata. L'età deve essere compresa tra 10 e 95 anni.")

@app.post("/analyze")
async def analyze_blood_values(data: BloodData):
    try:
        logger.info(f"Received data: {data.dict()}")
        
        result = process_blood_values(data.dict())
        
        if not result:
            return JSONResponse(
                status_code=400,
                content={"error": "No results generated"}
            )
            
        logger.info(f"Sending response: {result}")
        return result  # FastAPI gestirà automaticamente la serializzazione JSON
        
    except Exception as e:
        logger.error(f"Error in analyze: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

