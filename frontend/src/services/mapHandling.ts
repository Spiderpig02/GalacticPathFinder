import { tiles } from "../components/mapGrid/MapGrid.tsx";
/**
 * Uploads a csv of the map to the storage
 * @param map The map to upload
 */
export const uploadMap = (csvMap: string) => {
  let map: Node[] = [];
  try {
    // Check if the map is valid
    map = parseCSV(csvMap);
  } catch (error) {
    console.error("Invalid map:", error);
    return;
  }

  tiles.value = map;
  console.log("Map uploaded:", map);
};

function parseCSV(csvText: string): Node[] {
  const lines = csvText.split("\n");
  const nodes = [];
  for (let line of lines) {
    const [x, y, weight] = line.split(",");
    nodes.push({
      x: parseFloat(x),
      y: parseFloat(y),
      weight: parseFloat(weight),
    });
  }
  return nodes;
}

/**
 * Downloads a map from to the client
 */
export const downloadMap = () => {
  console.log("Map downloaded:", tiles);
  // Convert the nodes to a CSV
  let csvContent: string = parseNodes(tiles.value);
  console.log(csvContent);

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-16BE;" });

  // Create a link and trigger the download
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "map.csv";
  document.body.appendChild(link);
  link.click();

  // Teardown
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

function parseNodes(map: Node[]): string {
  let csvText = "";
  for (let node of map) {
    csvText += `${node.x},${node.y},${node.weight}\n`;
  }
  return csvText;
}

// Types
export interface Node {
  x: number;
  y: number;
  weight: number;
}
