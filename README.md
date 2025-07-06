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



POST /users
     ↓
userController.js (calls User.create())
     ↓
userModel.js (`pre('save')` middleware runs)
     ↓
autoIncrement.js (`getNextSequence()` is called)
     ↓
counterModel.js
     ↓
Updates `seq` and returns next number
     ↓
New user is saved with:
  userId: 6,
  customId: USR006


🧠 Mongoose Middleware / Hook Guide
This project uses Mongoose middleware (also known as hooks) to automatically generate:

✅ A unique, incremental userId (e.g., 1, 2, 3, ...)

✅ A formatted custom ID customId (e.g., USR001, USR002, ...)

These IDs are created automatically when a new user is saved, using the pre('save') middleware function in Mongoose.

📌 What is Middleware in Mongoose?
Middleware are functions that run before or after certain operations in Mongoose, such as:

Hook	When It Runs
     pre('save')	Before saving a document
     post('save')	After a document is saved
     pre('find')	Before querying documents
     pre('remove')	Before deleting a document

These functions allow you to:

Modify data

Add custom values (like IDs)

Perform validation

Trigger side-effects like sending emails, logging, etc.

⚙ How We Use pre('save') in This Project
Whenever a new user is created, the following happens automatically:

     js
     Copy
     Edit
     userSchema.pre("save", async function (next) {
     if (this.isNew) {
     const { userId, customId } = await getNextSequence("userId", "USR");
     this.userId = userId;
     this.customId = customId;
     }
     next();
     });
🔍 Explanation
     Line	Purpose
     pre('save')	Tells Mongoose to run the function before saving the user
     this.isNew	Ensures it only runs for new users, not updates
     getNextSequence()	Gets the next number (1, 2, 3...) and formats it as USR001, USR002, etc.
     this.userId = ...	Assigns the raw number
     this.customId = ...	Assigns the formatted custom string
     next()	Continues to save the user in the database

📁 Related Files and Their Purpose
     File	Description
     models/userModel.js	Contains the user schema and pre('save') hook
     models/counterModel.js	Stores the last used serial number (e.g., { id: "userId", seq: 3 })
     utils/autoIncrement.js	Reusable logic to fetch the next serial number and generate formatted ID

🧪 Example Output in MongoDB
     json
     Copy
     Edit
     {
     "_id": "64ba...",
     "userId": 7,
     "customId": "USR007",
     "name": "Himal Pandey",
     "email": "himal@example.com",
     ...
     }
✅ Benefits of This Approach
     Automatically generated, human-readable IDs.

     Easy tracking of users by number (e.g., USR007).

     Reusable logic for other models (e.g., STD001 for students).

🔁 Reusability
     This ID system is modular. You can use the same logic for other collections:

     js
     Copy
     Edit
     getNextSequence("studentId", "STD"); // ➜ STD001, STD002, ...
     getNextSequence("adminId", "ADM");   // ➜ ADM001, ADM002, ...