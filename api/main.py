from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
from typing import Dict, List
import os

app = FastAPI()

# Modifica la configurazione CORS per la produzione
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Per sviluppo locale
        "https://bloodbytes.vercel.app",  # Il tuo dominio Vercel
        # Aggiungi altri domini se necessario
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # Aggiungi OPTIONS
    allow_headers=["*"],  # Permetti tutti gli headers per il debug
)

class BloodParameters(BaseModel):
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
    
    print(f"Loading model from: {models_dir}")
    
    try:
        rf_good = joblib.load(os.path.join(models_dir, 'rf_good_model.joblib'))
        rf_bad = joblib.load(os.path.join(models_dir, 'rf_bad_model.joblib'))
        scaler = joblib.load(os.path.join(models_dir, 'scaler.joblib'))
        return rf_good, rf_bad, scaler
    except Exception as e:
        print(f"Error loading models: {str(e)}")
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

@app.post("/analyze", response_model=List[FoodRecommendation])
async def analyze_blood_values(params: BloodParameters):
    try:
        # Validate age
        if not 10 <= params.age <= 95:
            raise HTTPException(status_code=400, detail="L'età deve essere compresa tra 10 e 95 anni")
        
        # Validate sex
        if params.sex.upper() not in ['M', 'F']:
            raise HTTPException(status_code=400, detail="Il sesso deve essere 'M' o 'F'")

        # Load models
        rf_good, rf_bad, scaler = load_models()
        
        # Get food data based on age
        food_file = get_age_range_file(params.age)
        food_data = pd.read_excel(food_file)
        
        # Prepare features
        feature_order = [
            'Age', 'Sex',
            'Blood_Colesterolo', 'Blood_Colesterolo_HDL', 'Blood_Trigliceridi',
            'Blood_Glucosio', 'Blood_Vitamina_D', 'Blood_Ferro', 'Blood_Creatinina',
            'Mean', 'Carbohydrates', 'Fiber', 'Sugars', 'Protein',
            'Total_Fat', 'Saturated_Fat', 'Monounsaturated_Fat',
            'Polyunsaturated_Fat', 'Iron', 'Vitamin_C'
        ]
        
        # Create test data
        test_data_rows = []
        for _, food_row in food_data.iterrows():
            test_row = {
                **params.blood_values,
                'Age': params.age,
                'Sex': 0 if params.sex.upper() == 'M' else 1,
                'Mean': float(food_row['Mean']),
                'Carbohydrates': float(food_row['Carbohydrates']),
                'Fiber': float(food_row['Fiber']),
                'Sugars': float(food_row['Sugars']),
                'Protein': float(food_row['Protein']),
                'Total_Fat': float(food_row['Total_Fat']),
                'Saturated_Fat': float(food_row['Saturated_Fat']),
                'Monounsaturated_Fat': float(food_row['Monounsaturated_Fat']),
                'Polyunsaturated_Fat': float(food_row['Polyunsaturated_Fat']),
                'Iron': float(food_row['Iron']),
                'Vitamin_C': float(food_row['Vitamin_C'])
            }
            test_data_rows.append(test_row)
        
        test_df = pd.DataFrame(test_data_rows)
        test_df = test_df[feature_order]
        
        # Scale features
        numeric_features = test_df.select_dtypes(include=['float64', 'int64']).columns
        test_df[numeric_features] = scaler.transform(test_df[numeric_features])
        
        # Make predictions
        good_predictions = rf_good.predict(test_df)
        bad_predictions = rf_bad.predict(test_df)
        
        # Prepare recommendations
        recommendations = []
        for i, (_, food_row) in enumerate(food_data.iterrows()):
            recommendation = (
                "To be recommended" if (good_predictions[i] == 0 and bad_predictions[i] == -1) or
                                    (good_predictions[i] == 0 and bad_predictions[i] == 1)
                else "Not recommended" if good_predictions[i] == 1 and bad_predictions[i] == 0
                else "Take in moderation" if (good_predictions[i] == -1 and bad_predictions[i] == 0) or
                                                   (good_predictions[i] == 1 and bad_predictions[i] == -1)
                else "Neutro" if (good_predictions[i] == -1 and bad_predictions[i] == -1) or
                                (good_predictions[i] == -1 and bad_predictions[i] == 1)
                else "Non classificato"
            )
            
            # Aggiungi log prima di creare la raccomandazione
            print("Food row:", food_row)
            print("Good prediction:", good_predictions[i])
            print("Bad prediction:", bad_predictions[i])
            print("CODE value:", food_row['CODE'])
            
            recommendations.append(FoodRecommendation(
                food=str(food_row['Food']),        # Forza la conversione a stringa
                code=str(food_row['CODE']),        # Forza la conversione a stringa
                recommendation=str(recommendation), # Forza la conversione a stringa
                impact_good=str(good_predictions[i]),
                impact_bad=str(bad_predictions[i])
            ))
            
            # Aggiungi log dopo
            print("Created recommendation:", recommendations[-1])
        
        return recommendations
        
    except Exception as e:
        print("Error details:", str(e))  # Aggiungi questo log
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

