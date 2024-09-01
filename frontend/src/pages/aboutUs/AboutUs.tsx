import React from 'react';

const developers = [
  {
    name: 'Daniel Neukirch Hansen',
    github: 'https://github.com/Spiderpig02',
    image: 'https://github.com/Spiderpig02.png?size=100',
  },
  {
    name: 'Jens Martin Norheim Berget',
    github: 'https://github.com/Jensern1',
    image: 'https://github.com/Jensern1.png?size=100',
  },
  {
    name: 'Sverre Nystad',
    github: 'https://github.com/SverreNystad',
    image: 'https://github.com/SverreNystad.png?size=100',
  },
];

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-ss-navy-blue text-white">
      <h1 className="text-3xl font-bold mb-8">About Us</h1>
      <div className="flex justify-center space-x-12">
        {developers.map((developer, index) => (
          <div key={index} className="text-center">
            <a href={developer.github} target="_blank" rel="noopener noreferrer">
              <img
                src={developer.image}
                alt={developer.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <div className="font-semibold text-lg">{developer.name}</div>
            </a>
          </div>
        ))}
      </div>
      <br />
      <section className="max-w-4xl text-center mb-8">
        <p className="text-lg mb-4">
          We are a group of passionate computer science students pursuing our master's degrees at the Norwegian University of Science and Technology (NTNU). Our team is made up of three dedicated developers, each with a unique specialization that drives our collaborative work.
        </p>
        <ul className="text-lg mb-4 list-disc list-inside">
          <li><strong>Daniel Neukirch Hansen</strong> specializes in Artificial Intelligence (AI).</li>
          <li><strong>Jens Martin Norheim Berget</strong> specializing in Software systems (ProgSys).</li>
          <li><strong>Sverre Nystad</strong> specializing in both AI and ProgSys.</li>
        </ul>
        <p className="text-lg mb-4">
          Beyond our academic pursuits, we are active members of <a href="https://www.cogito-ntnu.no/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Cogito NTNU</a>, a technical student organization that offers its members the opportunity to collaborate on developing AI systems. Our involvement in Cogito NTNU has enriched our learning experience, allowing us to apply theoretical knowledge to practical, real-world projects.
        </p>
      </section>

      <section className="max-w-4xl text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Passion</h2>
        <p className="text-lg mb-4">
          We love developing software that solves real problems and enhances learning. Our latest project, <strong>GalacticPathFinder</strong>, was born out of our fascination with pathfinding algorithms. As students, we realized that while pathfinding algorithms are crucial in computer science, understanding them solely through pseudocode can be challenging.
        </p>
      </section>

      <section className="max-w-4xl text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">Why We Created GalacticPathFinder</h2>
        <p className="text-lg mb-4">
          GalacticPathFinder is our solution to make the study of pathfinding algorithms more accessible. We designed it with both students and teachers in mind, aiming to provide a visual and interactive tool that illustrates how different algorithms explore and determine paths. By seeing these algorithms in action, users can gain a deeper understanding of their behavior and efficiency in various scenarios.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
