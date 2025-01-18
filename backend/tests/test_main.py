from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_get_points_returns_different_values():
    """Test that consecutive calls to get_points return different values"""
    # Make two consecutive calls
    response1 = client.get("/api/points")
    response2 = client.get("/api/points")
    
    # Verify successful responses
    assert response1.status_code == 200
    assert response2.status_code == 200
    
    # Get the points from both responses
    points1 = response1.json()["points"]
    points2 = response2.json()["points"]
    
    # Verify we got the expected number of points
    assert len(points1) == 10000
    assert len(points2) == 10000
    
    # Verify the points are different
    # We'll compare the first point from each response
    # They should be different due to the time-based seed
    assert points1[0] != points2[0]
