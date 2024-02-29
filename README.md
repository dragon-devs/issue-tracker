# Issue Tracker

Issue Tracker is a fully authenticated web application implemented with Sentry for issue tracking. It is responsive and optimized for both mobile and desktop use. The application allows users to create, update, delete, and assign issues to a user. It features a detailed issues page, where users can view all relevant information about each issue. Additionally, users can filter issues by status and utilize a pagination system for easier navigation.

## Key Features

- **Authentication:** Fully authenticated system for secure user access.
- **Sentry Integration:** Implementation of Sentry for effective issue tracking and error monitoring.
- **Responsive Design:** Optimized for both mobile and desktop devices, ensuring a seamless user experience across all platforms.
- **Issue Management:** Create, update, delete, and assign issues with ease.
- **Detailed Issues Page:** View comprehensive details about each issue, including status, assignee, and more.
- **Filtering and Pagination:** Filter issues by status and navigate through them efficiently using a pagination system.
- **Dashboard:** Access a dashboard to see the latest issues and detailed issue information, presented with interactive charts.

## Technologies Used

- Frontend: React.js, Next.js, Radix-ui
- Backend: Next14 routers, Typescript
- Database: Mysql, Prisma
- Sentry: Error tracking and monitoring

## Getting Started

To get started with Issue Tracker, follow these steps:

1. **Clone the repository:**
```bash
git clone https://github.com/dragon-devs/issue-tracker.git
```
2. **Install dependencies:**

```bash
cd issue-tracker
npm install
```

3. **Run migrations:**
```bash
npx prisma migrate dev
```

4. **Run the development server:**

```
npm run dev
```


6. **Access the application:**

Visit [http://localhost:3000](http://localhost:3000) in your web browser.

## Contributing

Contributions to Issue Tracker are welcome! If you'd like to contribute, please follow these guidelines:

- Fork the repository and create your branch from `main`.
- Make sure your code adheres to the established code style.
- Test your changes thoroughly.
- Submit a pull request, describing the changes you've made.

## License

Issue Tracker is licensed under the [MIT License](LICENSE).

## Support

For support, bug reports, or feature requests, please [open an issue](https://github.com/dragon-devs/issue-tracker/issues).

## About

Issue Tracker is developed and maintained by [dragon-devs](https://dragon-devs.vercel.app).
