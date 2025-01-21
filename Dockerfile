FROM python:3.9-slim

WORKDIR /app

# Installa le dipendenze necessarie per scikit-learn e altre librerie
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copia requirements.txt e installa le dipendenze Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia il resto del codice
COPY . .

# Esponi la porta 8000
EXPOSE 8000

# Comando per avviare l'applicazione
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]