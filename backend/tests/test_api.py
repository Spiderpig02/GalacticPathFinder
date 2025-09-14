from fastapi.testclient import TestClient

from api import app

client = TestClient(app)


def test_fetch_graph_traversal_methods():
    response = client.get("/graphtraversal/graph-traversal-methods")
    assert response.status_code == 200
    assert "Breadth First Search (BFS)" in response.json()
    assert "Depth First Search (DFS)" in response.json()
    assert "A* (A Star)" in response.json()