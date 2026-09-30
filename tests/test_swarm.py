import pytest
import time
from agent_swarm import (
    ScoutAgent,
    AllocatorAgent,
    CommunicatorAgent,
    run_swarm_optimization
)

# 1. Base Agent & Output Schema Validation
def test_full_pipeline_sdg_telemetry_output():
    """Verify end-to-end swarm execution returns valid UN SDG 9.4 telemetry."""
    crisis_report = "Flooding reported at GPS Lat 17.3850, Long 78.4867. Immediate asset dispatch required."
    telemetry = run_swarm_optimization(crisis_report)
    
    assert isinstance(telemetry, dict)
    assert telemetry.get("sdg_target") == "9.4"
    assert "decision_latency_ms" in telemetry
    assert "collision_risk_margin" in telemetry
    assert telemetry.get("swarm_status") in ["synced", "operational", "active"]


# 2. ScoutAgent Edge Case: Empty, Null, or Malformed Crisis Reports
def test_scout_agent_empty_and_malformed_input():
    """Verify ScoutAgent handles empty text or missing GPS coordinates without crashing."""
    scout = ScoutAgent()
    
    # Test empty report input
    res_empty = scout.assess_hazard_zone("")
    assert res_empty is not None
    assert "spatial_coordinates" in res_empty
    
    # Test report with no coordinates mentioned
    res_no_coords = scout.assess_hazard_zone("General distress call in sector 4 without explicit markers.")
    assert res_no_coords is not None
    assert res_no_coords.get("status") == "assessed"


# 3. AllocatorAgent Edge Case: Strict Latency & Fallback Enforcement
def test_allocator_latency_budget():
    """Ensure trajectory decision latency strictly respects the sub-15ms budget."""
    allocator = AllocatorAgent()
    scout_mock_data = {
        "spatial_coordinates": [17.3850, 78.4867],
        "hazard_matrix": [[0.1, 0.2], [0.3, 0.4]],
        "status": "assessed"
    }
    
    start = time.perf_counter()
    traj_res = allocator.calculate_trajectory(scout_mock_data)
    elapsed_ms = (time.perf_counter() - start) * 1000.0
    
    assert elapsed_ms < 15.0, f"Trajectory calculation exceeded budget: {elapsed_ms:.2f}ms"
    assert traj_res.get("collision_risk") <= 0.002, "Collision risk margin exceeded safety threshold"


# 4. CommunicatorAgent Edge Case: Telemetry Network Synchronization
def test_communicator_sync_resilience():
    """Verify CommunicatorAgent handles multi-node telemetry state synchronization."""
    communicator = CommunicatorAgent()
    mock_traj = {
        "trajectory": [[17.3850, 78.4867], [17.3855, 78.4870]],
        "latency_ms": 8.5,
        "collision_risk": 0.001
    }
    
    sync_res = communicator.sync_swarm_state(mock_traj)
    assert sync_res is not None
    assert sync_res.get("status") in ["synced", "operational", "active"]
