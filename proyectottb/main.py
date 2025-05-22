from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import os
from typing import List
from generar_graficos import generar_graficos_animados  # import correcto

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CSV_DIR = "csv"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "public", "gifs")
os.makedirs(OUTPUT_DIR, exist_ok=True)

csv_files = {

    "solar": "12 solar-energy-consumption.csv",
    "solar": "04 share-electricity-renewables.csv",

    "wind": "08 wind-generation.csv",
    "hydro": "05 hydropower-consumption.csv",
    "geothermal": "17 installed-geothermal-capacity.csv"
}

data = {}
for key, filename in csv_files.items():
    path = os.path.join(CSV_DIR, filename)
    try:
        df = pd.read_csv(path)
        data[key] = df
    except Exception as e:
        print(f"Error cargando {filename}: {e}")

class CalculoInput(BaseModel):
    pais: str
    anio: int
    consumo_kwh: float

class GraficosInput(BaseModel):
    pais: str
    anio: int

class CalculoOutput(BaseModel):
    proporcion_renovable: float
    consumo_renovable_estimado: float
    porcentaje_estimado: float

@app.get("/paises", response_model=List[str])
def listar_paises():
    paises = set()
    for df in data.values():
        if 'Entity' in df.columns:
            paises.update(df['Entity'].dropna().unique())
    return sorted(paises)

@app.post("/calcular-renovable", response_model=CalculoOutput)
def calcular_renovable(datos: CalculoInput):
    total_renovable_twh = 0.0
    for df in data.values():
        if 'Entity' not in df.columns or 'Year' not in df.columns:
            continue

        df_filtrado = df[(df['Entity'] == datos.pais) & (df['Year'] == datos.anio)]
        if not df_filtrado.empty:
            for col in df_filtrado.columns:
                if col not in ['Entity', 'Year'] and pd.api.types.is_numeric_dtype(df_filtrado[col]):
                    valor = df_filtrado[col].values[0]
                    if pd.notna(valor):
                        total_renovable_twh += valor
                        break

    if total_renovable_twh == 0:
        raise HTTPException(status_code=404, detail="Datos insuficientes para el cálculo")

    total_renovable_kwh = total_renovable_twh * 1_000_000_000
    proporcion = total_renovable_kwh / datos.consumo_kwh
    consumo_renovable = proporcion * datos.consumo_kwh
    porcentaje = (consumo_renovable / datos.consumo_kwh) * 100

    return CalculoOutput(
        proporcion_renovable=proporcion,
        consumo_renovable_estimado=consumo_renovable,
        porcentaje_estimado=porcentaje
    )

@app.get("/generar-graficos")
def generar_graficos():
    try:
        output_path = os.path.join("D:\\TalentoTech\\Repos\\proyectottf\\public\\gifs\\")
        os.makedirs(output_path, exist_ok=True)
        generar_todos_los_graficos(output_path)
        return {"message": "Gráficos generados exitosamente."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
