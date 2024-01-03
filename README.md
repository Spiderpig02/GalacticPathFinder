# GalacticPathFinder

GalacticPathFinder is an interactive web application designed to visualize and understand the A\* pathfinding and other pathfinding algorithms. It allows users to create grids, set start and end points, visualize the algorithm's step-by-step process, and experiment with different heuristics. This tool is ideal for students, educators, and anyone interested in algorithm visualization and AI pathfinding techniques. It is made with Django backend and React Typescript frontend.

<div align="center">
<img src="docs/images/GalacticPathfinderLogo.png" width="50%">
</div>

## Features:

- [x] **Create Grids/Graphs:** Users can generate grids or graphs on which the A\* algorithm operates.
- [x] **Set Start and End Points:** Flexibility to define start and end points to visualize pathfinding.
- [ ] **Visualize Algorithm:** Step-by-step visualization of the A\* algorithm in action.
- [ ] **Customize Heuristics:** Experiment with different heuristics to see how they influence the pathfinding process.
- [ ] **Web Deployment:** Accessible on the World Wide Web for widespread use and demonstration.

## Setup

### Prerequisites
- [Git](https://git-scm.com/downloads)
- [Python 3.8](https://www.python.org/downloads/release/python-380/)
- [Node.js 20.x or newer](https://nodejs.org/en/download/)

### Clone repository
Clone the repository to your local machine:
```bash
git clone https://github.com/Spiderpig02/GalacticPathFinder.git
```

### Frontend
To setup the frontend one must install all the dependencies:
```bash
cd frontend
npm install
```


### Backend
To setup the backends one must install all the dependencies:
```bash
cd backend
```

#### Virtual Environment (Recommended)

<details> 
<summary><strong>🚀 A better way to set up repositories </strong></summary>

A virtual environment in Python is a self-contained directory that contains a Python installation for a particular version of Python, plus a number of additional packages. Using a virtual environment for your project ensures that the project's dependencies are isolated from the system-wide Python and other Python projects. This is especially useful when working on multiple projects with differing dependencies, as it prevents potential conflicts between packages and allows for easy management of requirements.

1. **To set up and use a virtual environment for GalacticPathFinder:**
    First, install the virtualenv package using pip. This tool helps create isolated Python environments.
    ```bash
    pip install virtualenv
    ```

2. **Create virtual environment**
    Next, create a new virtual environment in the project directory. This environment is a directory containing a complete Python environment (interpreter and other necessary files).
    ```bash
    python -m venv venv
    ```

4. **Activate virtual environment**
    To activate the environment, run the following command:
    * For windows:
        ```bash
        source ./venv/Scripts/activate
        ```

    * For Linux / MacOS:
        ```bash
        source venv/bin/activate
        ```

</details>

### Install dependencies
With the virtual environment activated, install the project dependencies:
```bash
pip install -r requirements.txt
```
The requirements.txt file contains a list of packages necessary to run GalacticPathFinder. Installing them in an activated virtual environment ensures they are available to the project without affecting other Python projects or system settings.


## Usage

### Frontend
```bash	
cd frontend
npm run dev
```

### Backend
```bash
cd backend
python manage.py runserver
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
        <a href="https://github.com/Jensern1">
            <img src="https://github.com/Jensern1.png?size=100" width="100px;" alt="Jens Martin Norheim Berget"/><br />
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
