from pydantic import BaseModel, Field

class DikeInput(BaseModel):
    flow_rate: float
    slope: float

class DikeOutput(BaseModel):
    height: float
    width: float
    volume: float

class DistanceInput(BaseModel):
    lat1: float = Field(..., ge=-90, le=90, description="Latitude of first point (-90 to 90)")
    lon1: float = Field(..., ge=-180, le=180, description="Longitude of first point (-180 to 180)")
    lat2: float = Field(..., ge=-90, le=90, description="Latitude of second point (-90 to 90)")
    lon2: float = Field(..., ge=-180, le=180, description="Longitude of second point (-180 to 180)")

class DistanceOutput(BaseModel):
    distance_km: float 