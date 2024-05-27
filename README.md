# Exam FED2 Noroff Holidaze Espen Henriksen Snerten

![image](/public/Holidaze.png)

- [live link - Holidaze](https://holidaze-snerten.netlify.app/)

This was my final exam during my time studying at Noroff Noroff Higher Vocational College, the task was to build a web application that demonstrates CRUD capabilities using an [API](https://docs.noroff.dev/docs/v2) that was provided for us.

## Exam Report & Rationale
#### Introduction
This report outlines the development process, coding choices, and design decisions made throughout my front-end development project. The main purpose of this exam was to demonstrate CRUD (Create, Read, Update, Delete) functionality using the designated API provided in the project brief.

#### Learning Experience
This project was an immensely valuable learning experience. I encountered several design and coding challenges, and although the final product meets all required user stories, there is significant room for improvement in both the UI and the code quality.

#### Initial Planning
I began the project by thoroughly reading through the API documentation and creating a plan for the structure I envisioned. As I am still learning React and Tailwind, my code reflects a beginner's approach, with areas that could benefit from better structuring and compartmentalization for improved readability.

#### Design Phase
After planning, I moved on to the design phase. Constrained to using an approved CSS framework, I aimed for a solid vision despite some antiquated UI choices. For instance, the user profile page currently toggles between booked venues and all venues, which is not optimal UX. A table format would be neater and more manageable. However, due to time constraints, I proceeded with my initial design.

#### Coding Process
The bulk of the work was done during the coding process, starting with the site architecture. I adhered to the DRY (Don't Repeat Yourself) principle as much as possible but recognize that further decomposition of the code is needed.

#### Routing and Navigation
I used TanStack routing, a familiar tool for me, to establish basic navigation. Following this, I implemented login and registration features. Since the authentication endpoint was similar to the previous version of the API, I reused code from my semester project, adjusting the payload to include the Venue Manager boolean input. The login form now includes an additional key required to post to the API.

#### Home Page
On the homepage, I created a simple form primarily for design purposes, along with a GET request that displays the latest three venues posted. This feature could be enhanced with a button to load more venues or a carousel displaying additional venues.

#### Venue List Page
The venue list page includes sorting, search, and filtering functionalities. However, only the sorting works satisfactorily. I discovered too late that the API has a search endpoint, which would improve the search functionality significantly. Pagination works using the provided limit and page query parameters, but filtering is limited to the current page. Backend filtering would resolve this issue.

#### Individual Venue Page
For the individual venue page, I used demark-pro/react-booking-calendar for booking functionality. Non-logged-in users can view available dates but cannot book the venue. The user experience here can be improved by providing a complete preview of the booking before finalizing it.

#### User Profile Page
The user profile page posed the most significant design challenge. Initially, I struggled with the layout, and it was too late in the development process when I realized that consolidating all CRUD functionalities into a single table would greatly enhance UX. While the current design works, it could be significantly better.

#### User Feedback
User feedback on successful posts or updates is currently provided via a modal, which feels outdated. Implementing Toast notifications would offer a more modern and user-friendly experience, which I plan to rework in the future.

#### Conclusion
Overall, this project represents a substantial improvement in design and user experience compared to my previous semester assignment. The current version includes functional modals and animations across most elements, making it satisfying to use. However, there is still considerable room for improvement, and I view this as a beta version.

#### Summary
Reflecting on this project, I have mixed feelings. There is much to improve, but I can see significant progress in my skills from project to project. This project was both fun and frustrating—fun because I had a clear understanding of what to do, and frustrating because better options often occurred to me too late due to the deadline constraints. Overall, this was a valuable test of the skills I have acquired during my time studying front-end development at Noroff.

## Built With

- [React](https://react.dev/)
- [Tailwind](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Tanstack Routing](https://tanstack.com/router/latest)
- [Axios](https://axios-http.com/)
- [React Awesome Reveal](https://react-awesome-reveal.morello.dev/)
- [demark-pro/react-booking-calendar](https://www.npmjs.com/package/@demark-pro/react-booking-calendar)

## Getting Started

### Installing

1. Clone the repo:

```bash
git clone https://github.com/EspenSnerten/FED2-Exam-Holidaze-Espen-Henriksen-Snerten/tree/main
```

# Contributing to [FED2-Exam-Holidaze-Espen-Henriksen-Snerten]

Thank you for considering contributing to this project! I appreciate your time and effort. This document outlines the guidelines for contributing to my project. Please take a moment to review it before getting started.

## Getting Started

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your contributions: `git checkout -b feature/your-feature-name`.
3. Make your desired changes or additions.
4. Test your changes thoroughly to ensure they work as intended.
5. Commit your changes with a descriptive commit message: `git commit -m "Add feature: your feature name"`.
6. Push your changes to your forked repository: `git push origin feature/your-feature-name`.
7. Create a pull request (PR) from your forked repository to the main repository.

## Guidelines

- Ensure your code follows the existing code style and conventions.
- Write clear, concise, and meaningful commit messages.
- Include documentation for any new features or changes you make.
- Be respectful and considerate of others when discussing or reviewing code.
- Be responsive to any feedback or comments on your pull request.
- Avoid submitting multiple unrelated changes in a single pull request. Please create separate PRs for each feature or bug fix.

## Contact

My mail account:(espensnert@hotmail.com)

## Acknowledgments

The icons used in this project are from [Fontawesome](https://fontawesome.com/)
The picture used for the background is from [Unsplash](https://unsplash.com/)
