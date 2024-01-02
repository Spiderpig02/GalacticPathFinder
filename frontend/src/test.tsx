import { useEffect, useState } from "react";
import { postGraphHeuristics } from "./services/postGraphHeuristicMethods";
import { getGraphTraversalMethods } from "./services/getGraphTraversalMethods";

const Test = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching graph traversal methods...");
        const traversalMethods = await getGraphTraversalMethods();

        if (!traversalMethods) {
          console.error("Failed to fetch graph traversal methods.");
          return;
        }
        console.log("Graph traversal methods:", traversalMethods[1]);

        console.log("Fetching graph heuristics...");
        const response = await postGraphHeuristics(traversalMethods[1]);

        if (response) {
          console.log("Graph heuristics response:", response);
        } else {
          console.error("Failed to fetch graph heuristics.");
        }
      } catch (error) {
        console.error("Error during data fetching:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Data fetching completed.</p>
          <p>Test</p>
        </div>
      )}
    </div>
  );
};

export default Test;
