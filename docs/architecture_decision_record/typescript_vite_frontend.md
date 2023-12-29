# ADR 003: Choice of Frontend Technology

## Status
Proposed

## Context
We need to select a suitable frontend technology that complements our backend choice and meets our project requirements. The frontend technology should offer robustness, scalability, and a modern development experience to create a responsive and interactive user interface.

## Decision
We have decided to use React with typescript as our frontend technology.

## Alternatives Considered
- **Plain HTML, CSS, and JavaScript:** Rejected due to the lack of modern development experience and scalability.
- **Vue.js:** Rejected due to the lack of familiarity with the framework.
- **Angular:** Rejected due to the lack of familiarity with the framework.
- **React with JavaScript:** Rejected due to the lack of type safety. Strongly typed languages are more robust and less error-prone. Even though Typescript is only a gloryfied linting tool, it still provides a better development experience compared to plain JavaScript.
