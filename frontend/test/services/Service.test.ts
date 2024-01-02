import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import { getGraphTraversalMethods } from "../../src/services/getGraphTraversalMethods";

// Create a mock for axios.get
vi.spyOn(axios, "get").mockResolvedValue({ data: [{ name: "A*" }] });

describe("Service", () => {
  it("should return a list of graph traversal methods", async () => {
    const methods = await getGraphTraversalMethods();
    expect(methods).toEqual([{ name: "A*" }]);
  });
});
