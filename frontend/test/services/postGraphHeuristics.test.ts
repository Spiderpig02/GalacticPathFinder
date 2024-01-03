import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import { postGraphHeuristics } from "../../src/services/postGraphHeuristicMethods";

// Mock data
const algorithmName = "a star";
const mockHeuristics = ["manhattan", "euclidean"];

// Create a mock for axios.post
vi.spyOn(axios, "post").mockResolvedValue({
  status: 200,
  data: mockHeuristics,
});

describe("postGraphHeuristics Service", () => {
  it("should return a list of heuristics for a given algorithm", async () => {
    const heuristics = await postGraphHeuristics(algorithmName);

    expect(heuristics).toBeInstanceOf(Array);
    expect(heuristics).toEqual(mockHeuristics);
  });
});
