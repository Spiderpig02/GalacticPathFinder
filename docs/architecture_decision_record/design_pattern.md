# ADR 001: Adoption of Strategy Pattern for Interchangeable Pathfinding Algorithms

## Status
**Proposed** by *Sverre Nystad*

## Context
We need a way to implement different pathfinding algorithms in our system. The algorithms should be interchangeable, meaning that different algorithms can be used dynamically at runtime. The algorithms should also be easily testable in isolation.

## Decision

We should adopt the Strategy Pattern for our pathfinding algorithms. This design pattern enables the algorithms to be interchangeable, allowing different algorithms to be used dynamically at runtime. The Strategy Pattern will be implemented in such a way that it adheres to the Open/Closed Principle, meaning the system will be open for extension (allowing new algorithms to be added) but closed for modification (existing code will not need to be changed when new algorithms are added).

## Rational
- **Flexibility:** By using the Strategy Pattern, new pathfinding algorithms can be introduced without affecting the existing code, enhancing flexibility.
- **Maintainability:** This approach simplifies the maintenance of the codebase as changes or additions to the algorithms won't necessitate widespread modifications.
- **Adherence to Open/Closed Principle:** This principle is a key aspect of SOLID design principles, promoting more robust and less error-prone code.
- **Improved Testing:** Individual algorithms can be tested in isolation, leading to more effective unit testing.
- **Scalability:** As new pathfinding needs arise, the system can easily scale by adding new strategies without impacting existing functionality.
- **Decoupling:** The Strategy Pattern decouples the algorithm implementation from its usage, reducing dependencies and increasing modularity.* 


## Alternatives
- **Hardcoding:** The algorithms could be hardcoded into the system, but this would make the system less flexible and more difficult to maintain.
- **State Pattern:** The State Pattern is similar to the Strategy Pattern, but it is used to change the behavior of an object when its internal state changes. Since the pathfinding algorithms will not be changing their behavior, the State Pattern is not a good fit for this use case.
- **Functional Programming:** By passing calleble functions as arguments, the algorithms could be implemented in a functional programming style. This approach would be more would be easy to implement in the python backend, but it could be hard to enforce the contract between the algorithms and the rest of the system.