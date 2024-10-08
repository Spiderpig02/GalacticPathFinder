import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const developers = [
  {
    name: "Daniel Neukirch Hansen",
    specialization: "Artificial Intelligence",
    image: "https://github.com/Spiderpig02.png?size=100",
    description:
      "Daniel specializes in AI, bringing advanced machine learning models to life.",
    github: "https://github.com/Spiderpig02",
    linkedin: "https://www.linkedin.com/in/daniel-neukirch-hansen-475895263/",
  },
  {
    name: "Jens Martin Norheim Berget",
    specialization: "Programming and Systems Development",
    image: "https://github.com/jmnorheim.png?size=100",
    description:
      "Jens focuses on ProgSys, ensuring our systems are robust and scalable.",
    github: "https://github.com/jmnorheim",
    linkedin:
      "https://www.linkedin.com/in/jens-martin-norheim-berget-87560b141/",
  },
  {
    name: "Sverre Nystad",
    specialization: "AI & Programming and Systems Development",
    image: "https://github.com/SverreNystad.png?size=100",
    description:
      "Sverre bridges AI and ProgSys, integrating cutting-edge AI into reliable systems.",
    github: "https://github.com/SverreNystad",
    linkedin: "https://www.linkedin.com/in/sverre-nystad/",
  },
];

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gradient-to-r pt-20 from-ss-navy-blue via-purple-900 to-ss-navy-blue text-white ">
      <h1 className="text-5xl font-extrabold mb-4">About Us</h1>
      <p className="text-xl text-gray-200 mb-12 text-center max-w-2xl">
        We are a team of dedicated computer science students specializing in AI
        and systems development, pursuing our master's degrees at the Norwegian
        University of Science and Technology (NTNU) in Trondheim, Norway. Our
        mission is to make complex algorithms accessible and easy to understand
        through interaction and visualization.
      </p>

      <div className="flex flex-wrap justify-center lg:space-x-8">
        {developers.map((developer, index) => (
          <div
            key={index}
            className="group bg-white shadow-lg rounded-xl overflow-hidden max-w-xs transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            <div className="flex justify-center mt-6">
              <img
                src={developer.image}
                alt={developer.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-md"
              />
            </div>
            <div className="p-6 text-center transition-colors group-hover:text-white">
              <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-white">
                {developer.name}
              </h3>
              <p className="text-gray-700 mt-2 group-hover:text-white">
                {developer.specialization}
              </p>
              <p className="text-gray-800 mt-4 text-sm group-hover:text-white">
                {developer.description}
              </p>
              <div className="flex justify-center mt-4 space-x-4">
                <a
                  href={developer.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="text-gray-800 group-hover:text-white text-2xl" />
                </a>
                <a
                  href={developer.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-gray-800 group-hover:text-white text-2xl" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <br />

      <section className="max-w-4xl text-center mb-8">
        <p className="text-lg mb-4">
          Beyond our academic pursuits, we are active members of{" "}
          <a
            href="https://www.cogito-ntnu.no/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 underline hover:text-blue-400"
          >
            Cogito NTNU
          </a>
          , a technical student organization that offers its members the
          opportunity to collaborate on developing AI systems. Our involvement
          in Cogito NTNU has allowed us to apply theoretical knowledge to
          practical, real-world projects.
        </p>
      </section>

      <section className="max-w-4xl text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Our Passion</h2>
        <p className="text-lg mb-4">
          We love developing software that solves real problems and makes
          learning complex subjects easier. Our latest project,{" "}
          <strong className="text-pink-300">GalacticPathFinder</strong>, was
          born out of our fascination with pathfinding algorithms. As students,
          we realized that while pathfinding algorithms are crucial in computer
          science, understanding them solely through pseudocode can be
          challenging.
        </p>
      </section>

      <section className="max-w-4xl text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Why We Created GalacticPathFinder
        </h2>
        <p className="text-lg mb-4">
          GalacticPathFinder is our solution to make the study of pathfinding
          algorithms more accessible to anyone. We designed it with both
          students and teachers in mind, aiming to provide a visual and
          interactive tool that illustrates how different algorithms explore a
          world with obstacles and determine paths. By seeing these algorithms
          in action, users can gain a deeper understanding of their behavior and
          efficiency in different scenarios.
        </p>
      </section>

      <section className="max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-4">Feel free to reach out!</h2>
        <p className="text-lg">
          We are excited to share our project with you and hope you have as much
          fun using it as we had developing it. If you’re interested in what we
          do or have any questions, feel free to reach out via LinkedIn or
          Github.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
