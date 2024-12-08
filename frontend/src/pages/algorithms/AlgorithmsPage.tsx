import React from "react";

import { useNavigate } from "react-router-dom";



const algorithms = [
  {
    name: "A* (A-Star)",
    description:
      "A* is a popular pathfinding algorithm that uses heuristics to find the shortest path efficiently. It combines the benefits of Dijkstra's algorithm and a greedy best-first search, making it both optimal and complete. By maintaining a balance between exploration and the goal, A* can find paths in complex spaces faster than other algorithms, especially when an appropriate heuristic is used.",
  },
  {
    name: "Breadth-First Search (BFS)",
    description:
      "BFS is a fundamental graph traversal algorithm that explores nodes level by level, ensuring the shortest path in unweighted graphs. It starts from the initial node and explores all its neighbors before moving to the next level of nodes. While simple, BFS guarantees finding the shortest path in situations where edge costs are uniform.",
  },
  {
    name: "Depth-First Search (DFS)",
    description:
      "DFS is a graph traversal technique that explores as far as possible along each branch before backtracking. This makes it suitable for exploring deep paths quickly, though it doesn't guarantee finding the shortest path. DFS can be useful for discovering connected components in a graph or solving puzzles that require exploring all possibilities.",
  },
];

const heuristics = [
  {
    name: "Manhattan Heuristic",
    description:
      "The Manhattan heuristic is often used in grid-based pathfinding problems. It calculates the distance between two points as the sum of the absolute differences of their x and y coordinates. This heuristic is particularly useful in environments where movement is restricted to horizontal and vertical directions, such as a city grid.",
  },
  {
    name: "Euclidean Heuristic",
    description:
      "The Euclidean heuristic calculates the straight-line distance between two points, as if using a ruler. It is typically used in environments where movement can occur in any direction. This heuristic provides an accurate estimate for the shortest path in open areas without obstacles.",
  },
];

const AlgorithmsPage: React.FC = () => {
  const navigate = useNavigate(); 


  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gradient-to-r pt-20 from-ss-navy-blue via-purple-900 to-ss-navy-blue text-white ">
      <h1 className="text-5xl font-extrabold mb-4">Pathfinding Algorithms</h1>
      <p className="text-xl text-gray-200 mb-12 text-center max-w-2xl">
        Explore the key algorithms behind GalacticPathFinder, each designed to tackle different kinds of pathfinding challenges. Learn how A*, BFS, and DFS work to solve complex navigation problems in dynamic environments.
      </p>

      <div className="flex flex-wrap justify-center lg:space-x-8">
        {algorithms.map((algorithm, index) => (
          <div
            key={index}
            className="group bg-white shadow-lg rounded-xl overflow-hidden max-w-xs transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            <div className="p-6 text-center transition-colors group-hover:text-white">
              <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-white">
                {algorithm.name}
              </h3>
              <p className="text-gray-800 mt-4 text-sm group-hover:text-white">
                {algorithm.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <br />

      <section className="max-w-4xl text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Heuristics Explained</h2>
        <p className="text-lg mb-4">
          Heuristics are crucial components of pathfinding algorithms like A*, helping them make decisions more efficiently. Below are two commonly used heuristics in pathfinding:
        </p>
        <div className="flex flex-wrap justify-center lg:space-x-8">
          {heuristics.map((heuristic, index) => (
            <div
              key={index}
              className="group bg-white shadow-lg rounded-xl overflow-hidden max-w-xs transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            >
              <div className="p-6 text-center transition-colors group-hover:text-white">
                <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-white">
                  {heuristic.name}
                </h3>
                <p className="text-gray-800 mt-4 text-sm group-hover:text-white">
                  {heuristic.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Interactive Visualizations</h2>
        <p className="text-lg mb-4">
          Watch the algorithms in action! Use our interactive visualization tool below to see how A*, BFS, and DFS explore the grid and find paths. This tool will help you better understand the differences in their behaviors and efficiency.
        </p>
        <button className="bg-pink-500 text-white py-2 px-6 rounded-lg hover:bg-pink-600 transition-all"
        onClick={() => navigate("/")}>
            Try Visualization Tool
        </button>
      </section>

      <section className="max-w-4xl text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Algorithm Comparison Table</h2>
        <p className="text-lg mb-4">
          Below is a summary of the key features of each algorithm, including their complexity, completeness, and optimality.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-black rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2">Algorithm</th>
                <th className="px-4 py-2">Time Complexity</th>
                <th className="px-4 py-2">Space Complexity</th>
                <th className="px-4 py-2">Complete</th>
                <th className="px-4 py-2">Optimal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">A*</td>
                <td className="border px-4 py-2">O(b^d)</td>
                <td className="border px-4 py-2">O(b^d)</td>
                <td className="border px-4 py-2">Yes</td>
                <td className="border px-4 py-2">Yes (with an admissible heuristic)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">BFS</td>
                <td className="border px-4 py-2">O(b^d)</td>
                <td className="border px-4 py-2">O(b^d)</td>
                <td className="border px-4 py-2">Yes</td>
                <td className="border px-4 py-2">Yes (for unweighted graphs)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">DFS</td>
                <td className="border px-4 py-2">O(b^m)</td>
                <td className="border px-4 py-2">O(bm)</td>
                <td className="border px-4 py-2">No</td>
                <td className="border px-4 py-2">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-4xl text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Why Learn These Algorithms?</h2>
        <p className="text-lg mb-4">
          Pathfinding algorithms are a core part of computer science, enabling
          efficient navigation in games, robotics, and network routing. By
          understanding how A*, BFS, and DFS work, you'll gain insights into how
          different algorithms perform under various conditions and why one
          might be better suited to a particular problem than the others.
        </p>
      </section>
    </div>
  );
};

export default AlgorithmsPage;
