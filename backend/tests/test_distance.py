from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

def test_distance_paris_ny():
    """Test distance between Paris and New York"""
    response = client.post(
        "/distance",
        json={
            "lat1": 48.8566,  # Paris
            "lon1": 2.3522,
            "lat2": 40.7128,  # New York
            "lon2": -74.0060
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "distance_km" in data
    # Actual distance is approximately 5837 km
    assert 5800 <= data["distance_km"] <= 5900

def test_distance_same_point():
    """Test distance between same coordinates"""
    response = client.post(
        "/distance",
        json={
            "lat1": 48.8566,
            "lon1": 2.3522,
            "lat2": 48.8566,
            "lon2": 2.3522
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["distance_km"] == 0

def test_distance_london_tokyo():
    """Test distance between London and Tokyo"""
    response = client.post(
        "/distance",
        json={
            "lat1": 51.5074,  # London
            "lon1": -0.1278,
            "lat2": 35.6762,  # Tokyo
            "lon2": 139.6503
        }
    )
    assert response.status_code == 200
    data = response.json()
    # Actual distance is approximately 9560 km
    assert 9500 <= data["distance_km"] <= 9600

def test_invalid_coordinates():
    """Test with invalid coordinates"""
    response = client.post(
        "/distance",
        json={
            "lat1": 91.0,  
            "lon1": 0.0,
            "lat2": 0.0,
            "lon2": 0.0
        }
    )
    assert response.status_code == 422  # Validation error

def test_missing_coordinates():
    """Test with missing coordinates"""
    response = client.post(
        "/distance",
        json={
            "lat1": 48.8566,
            "lon1": 2.3522
            # Missing lat2 and lon2
        }
    )
    assert response.status_code == 422  