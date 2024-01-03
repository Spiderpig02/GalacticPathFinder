import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import { postTraversal } from "../../src/services/postTraversal";

// Mock data
const mockTraversalProps = {
  algorithm: "a star",
  heuristic: "manhattan",
  startPoint: { x: 0, y: 0, weight: 1 },
  endPoint: { x: 2, y: 2, weight: 1 },
  map: [
    { x: 0, y: 0, weight: 0 },
    { x: 0, y: 1, weight: 1 },
    { x: 1, y: 0, weight: 1 },
    { x: 1, y: 1, weight: 1 },
    { x: 2, y: 2, weight: 1 },
  ],
};

const mockSuccessResponse = {
  message: "success",
  path: [
    { x: 0, y: 0, weight: 1 },
    { x: 2, y: 2, weight: 1 },
  ],
  nodeOrder: [
    { x: 0, y: 0, weight: 1 },
    { x: 2, y: 2, weight: 1 },
  ],
};

describe("postTraversal Service", () => {
  it("should return traversal data on successful response", async () => {
    vi.spyOn(axios, "post").mockResolvedValue({
      status: 200,
      data: mockSuccessResponse,
    });

    const response = await postTraversal(mockTraversalProps);
    expect(response).toEqual(mockSuccessResponse);
  });

  it("should handle 400 error response", async () => {
    vi.spyOn(axios, "post").mockResolvedValue({
      status: 400,
      data: { message: "Bad request" },
    });

    const response = await postTraversal(mockTraversalProps);
    expect(response).toBeNull();
  });

  it("should handle 500 error response", async () => {
    vi.spyOn(axios, "post").mockResolvedValue({
      status: 500,
      data: { message: "Internal Server Error" },
    });

    const response = await postTraversal(mockTraversalProps);
    expect(response).toBeNull();
  });

  it("should handle network or other errors", async () => {
    vi.spyOn(axios, "post").mockRejectedValue(new Error("Network error"));

    const response = await postTraversal(mockTraversalProps);
    expect(response).toBeNull();
  });
});
