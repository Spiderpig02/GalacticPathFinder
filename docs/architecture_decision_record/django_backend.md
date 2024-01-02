# ADR 002: Choice of Django for Backend
## Status
Accepted

## Context
Our project requires a robust and scalable web application. We need a reliable and efficient backend framework. After evaluating several options, we have narrowed down our choices to Django for the backend.

## Decision
We have decided to use Django as our backend framework.

## Rationale
### Django (Backend)
There are several reasons why we have chosen Django as our backend framework:
- **Maturity and Stability:** Django is a mature framework with a large community and extensive documentation.
- **Security:** Django provides built-in security features, protecting against common attacks.
- **Scalability:** It can handle high traffic and is suitable for both small and large-scale projects.

But the main reason is not technical. Django is the framework that the team is going to use in the future in the subject `TDT4237 - Software Security and Data Privacy`. Therefore, it is a good opportunity to learn Django and get familiar with it.

## Consequences
- **Learning Curve:** The team may need time to adapt to Django as they are not familiar with them.
- **Development Time:** Initial setup and learning might take more time compared to simpler frameworks.
- **Performance Considerations:** Django, while performant, may introduce complexities that need careful handling for optimal performance.

## Alternatives Considered
- **Node.js with Express for backend:** Rejected due to lesser built-in features compared to Django.
- **Flask for backend:** Would be a good choice, it is lightweight and easy to learn and has everything we need. However, we have decided to use Django as it is the framework that the team is going to use in the future in the subject `TDT4237 - Software Security and Data Privacy`.