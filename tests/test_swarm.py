import pytest
from agent_swarm import ScoutAgent, AllocatorAgent, CommunicatorAgent, run_swarm_optimization, DYNAMIC_HAZARDS

def test_scout_agent_mapping():
    scout = ScoutAgent("TEST-SCOUT", (0.0, 0.0))
    result = scout.assess_hazard_zone("Flooding test report")
    assert result["status"] == "BOUNDARIES_MAPPED"
    assert len(result["detected_hazards"]) > 0

def test_allocator_trajectory_latency_budget():
    allocator = AllocatorAgent("TEST-ALLOCATOR")
    path_length, collision_risk, tick_latency_ms = allocator.calculate_trajectory(
        (0.0, 0.0), (10.0, 10.0), DYNAMIC_HAZARDS
    )
    assert path_length > 0
    assert tick_latency_ms < 15.0  # Asserts Track 05 hard constraint latency budget

def test_swarm_optimization_execution():
    res = run_swarm_optimization("Emergency dispatch test")
    assert res["fitness_score"] == 96.4
    assert "sdg_alignment" in res
