# Frontend README

This README provides an overview of the frontend implementation for the prompt management application. It covers the technologies used, installation instructions, project structure, and additional details about the application.

## Technologies Used
- **Next.js**: I chose Next.js for its ease of use and my limited prior experience with the framework. Next.js provides benefits such as server-side rendering, simplified routing, and efficient performance.
- **NextAuth**: NextAuth is used for authentication in the frontend application. It simplifies the implementation of authentication flows, including various providers and session management, reducing the development time and effort required for authentication.
- **Tailwind CSS**: I utilized Tailwind CSS for its utility-first approach, which makes styling and UI design easier and more efficient.
- **SWR**: SWR is a React data fetching library that simplifies data fetching and caching. I used SWR to handle data fetching from APIs, as it provides automatic caching, revalidation, and error handling.


## Installation
1. Clone the repository: 
```bash
git clone https://github.com/soroushahrari/assignment-frontend.git
```
2. Install dependencies: 
```bash
npm install
```
3. Rename the `.env.example` file to `.env.local` and update the necessary environment variables for NextAuth configuration.
4. Start the development server: 
```bash
npm run dev
```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
The project structure is organized as follows:
- `/app`: Contains the main application files.
- `/components`: Contains React components used throughout the application.
- `/hooks`: Contains custom hooks used for data fetching.
- `/interfaces`: Contains TypeScript interfaces used for defining data structures.
- `/providers`: Contains providers used for integrating NextAuth into the application.

## Deployment
The frontend application is deployed on Vercel. The application can be accessed at [Frontend Application](https://assignment-frontend-amber.vercel.app/login).