import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import { getGraphTraversalMethods } from "../../src/services/getGraphTraversalMethods";

// Mock data
const mockTraversalMethods = ["a star", "dijkstra"];

// Create a mock for axios.get
vi.spyOn(axios, "get").mockResolvedValue({
  status: 200,
  data: mockTraversalMethods,
});

describe("getGraphTraversalMethods Service", () => {
  it("should return a list of graph traversal methods", async () => {
    const methods = await getGraphTraversalMethods();

    expect(methods).toBeInstanceOf(Array);
    expect(methods).toEqual(mockTraversalMethods);
  });
});
