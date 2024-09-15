# GalacticPathFinder

GalacticPathFinder is an interactive web application designed to visualize and aid understanding of pathfinding-algorithms like A* (A-star), Breadth-First-Search (BFS) and others. It allows users to create grids, set start and end points, visualize the algorithm's step-by-step process, and experiment with different heuristics. This tool is ideal for students, educators, and anyone interested in algorithm visualization and AI pathfinding techniques. It is made with a Django backend and React Typescript frontend.

Visit the deployed application [here](https://galacticpathfinder.com/).
<div align="center">
<img src="docs/images/GalacticPathfinderLogo.png" width="50%">
</div>

## Features:

- [x] **Create Grids/Graphs:** Users can generate grids or graphs on which the A\* algorithm operates.
- [x] **Set Start and End Points:** Flexibility to define start and end points to visualize pathfinding.
- [x] **Visualize Algorithm:** Step-by-step visualization of the A\* algorithm in action.
- [x] **Customize Heuristics:** Experiment with different heuristics to see how they influence the pathfinding process.
- [x] **Web Deployment:** Accessible on the World Wide Web for widespread use and demonstration.

## Setup

### Prerequisites
- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/products/docker-desktop/)

### Clone repository
Clone the repository to your local machine:
```bash
git clone https://github.com/Spiderpig02/GalacticPathFinder.git
```

## Usage
To run the application, navigate to the root directory of the project and run the following command:
```bash	
docker compose up --build
```

## Testing
To run the E2E tests, navigate to the `frontend` directory of the project and run the following command:
```bash
npm run test:e2e
```

## Contributors

<table align="center">
  <tr>
    <td align="center">
        <a href="https://github.com/Spiderpig02">
            <img src="https://github.com/Spiderpig02.png?size=100" width="100px;" alt="Daniel Neukirch Hansen"/><br />
            <sub><b>Daniel Neukirch Hansen</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/jmnorheim">
            <img src="https://github.com/jmnorheim.png?size=100" width="100px;" alt="Jens Martin Norheim Berget"/><br />
            <sub><b>Jens Martin Norheim Berget</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/SverreNystad">
            <img src="https://github.com/SverreNystad.png?size=100" width="100px;"/><br />
            <sub><b>Sverre Nystad</b></sub>
        </a>
    </td>
  </tr>
</table>
