Folder structure for Full stack development

project-root/
│
├── config/                  # Configuration files (db, environment, etc.)
│   └── db.js
│   └── config.env
│
├── controllers/            # Controllers - handle request/response logic
│   └── userController.js
│   └── productController.js
│
├── models/                 # Models - Mongoose or Sequelize schemas
│   └── User.js
│   └── Product.js
│
├── routes/                 # Routes - define endpoints and link to controllers
│   └── userRoutes.js
│   └── productRoutes.js
│
├── views/                  # Views - e.g., EJS, Pug, or frontend templates
│   └── layouts/
│   └── users/
│   └── products/
│
├── middlewares/            # Custom middleware (auth, logger, error handlers)
│   └── authMiddleware.js
│   └── errorHandler.js
│
├── public/                 # Static files (CSS, JS, images)
│   └── css/
│   └── js/
│   └── images/
│
├── services/               # Business logic layer or reusable services
│   └── emailService.js
│   └── paymentService.js
│
├── utils/                  # Utility/helper functions
│   └── logger.js
│   └── validator.js
│
├── tests/                  # Unit and integration tests
│   └── user.test.js
│
├── app.js                  # Main Express app
├── server.js               # Starts the server (optional split from app.js)
├── package.json
└── README.md
