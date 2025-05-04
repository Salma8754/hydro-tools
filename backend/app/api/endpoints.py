from fastapi import APIRouter
from app.api.models import DikeInput, DikeOutput, DistanceInput, DistanceOutput
import math

router = APIRouter()



@router.post("/dike", response_model=DikeOutput)
def calculate_dike(data: DikeInput):
    # Dummy computation
    height = data.flow_rate * 0.1
    width = data.slope * 100
    volume = height * width * 0.5
    return DikeOutput(height=height, width=width, volume=volume)

@router.post("/distance", response_model=DistanceOutput)
def calculate_distance(data: DistanceInput):
    R = 6371.0
    
    lat1_rad = math.radians(data.lat1)
    lon1_rad = math.radians(data.lon1)
    lat2_rad = math.radians(data.lat2)
    lon2_rad = math.radians(data.lon2)
    
    # Haversine formula
    dlon = lon2_rad - lon1_rad
    dlat = lat2_rad - lat1_rad
    a = math.sin(dlat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    distance = R * c
    
    return DistanceOutput(distance_km=round(distance, 2))
