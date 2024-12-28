# Developer Documentation for eCommerce Website

This document serves as a detailed guide for developers working on the eCommerce website project, built with the MERN stack. It outlines the structure, technologies, and best practices to follow for a successful implementation.

---

## **Project Overview**

The eCommerce website includes the following features:

- **Frontend**: React.js with responsive styling (Tailwind CSS/Bootstrap).
- **Backend**: Node.js with Express.js for API handling.
- **Database**: MongoDB Atlas for storing user, product, and order data.
- **Integrations**: Razorpay for payments, Meta Ads, and Google Ads for marketing.
- **Hosting**: Hostinger for both frontend and backend services.

---

## **Setup and Installation**

### **1. Prerequisites**

- Node.js and npm installed.
- MongoDB Atlas account.
- Razorpay developer account.
- Meta Ads Manager and Google Ads account.
- Hostinger hosting plan.

### **2. Local Development Setup**

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   cd client && npm install
   ```

3. **Environment variables:**

   Create a `.env` file in the root folder:

   ```env
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret>
   RAZORPAY_KEY_ID=<Your Razorpay Key ID>
   RAZORPAY_SECRET=<Your Razorpay Secret>
   META_PIXEL_ID=<Your Meta Pixel ID>
   GOOGLE_ADS_TAG_ID=<Your Google Ads Tag ID>
   ```

4. **Run the development servers:**

   ```bash
   npm run dev  # Runs both client and server concurrently
   ```

---

## **Project Structure**

### **1. Frontend (React.js)**

```
client/
├── public/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom hooks
│   ├── services/         # API integration
│   ├── context/          # Global state management
│   ├── utils/            # Utility functions
│   └── App.js            # Main application file
├── package.json          # Frontend dependencies
└── tailwind.config.js    # Tailwind CSS configuration
```

### **2. Backend (Node.js + Express.js)**

```
server/
├── controllers/          # Logic for API routes
├── models/               # Mongoose schemas
├── routes/               # Express routes
├── middleware/           # Custom middleware (e.g., auth)
├── utils/                # Utility functions
├── config/               # Configuration files
├── app.js                # Express app setup
├── server.js             # Server entry point
└── package.json          # Backend dependencies
```

---

## **Key Functionalities**

### **1. Authentication**

- **JWT-based authentication** for secure login and user sessions.
- Social login options (Google, Facebook) can be added for convenience.

### **2. Product Management**

- **CRUD operations** for products via the admin panel.
- Products stored in MongoDB with details:
  - Name, description, price, stock, category, images.

### **3. Payment Gateway (Razorpay)**

- Integration via Razorpay SDK.
- Payment flow:
  1. User proceeds to checkout.
  2. Backend generates a Razorpay order ID.
  3. Frontend handles payment completion.
  4. Backend verifies the payment signature.

### **4. Marketing Integration**

- **Meta Ads**:
  - Add Meta Pixel to track user events.
  - Implement custom events for conversions (Add to Cart, Purchase).
- **Google Ads**:
  - Integrate Google Tag Manager for tracking and analytics.

### **5. Responsive Design**

- Use Tailwind CSS for a mobile-first approach.
- Test responsiveness on popular devices and browsers.

### **6. Deployment**

- **Frontend**:
  - Build the React app using:

    ```bash
    npm run build
    ```

  - Upload build files to Hostinger.
- **Backend**:
  - Deploy Node.js app to Hostinger VPS.
  - Ensure proper environment variable setup.
- **Database**:
  - Use MongoDB Atlas for cloud-based database hosting.

---

## **API Endpoints**

### **1. Authentication**

- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/login`: Authenticate user and return token.

### **2. Products**

- `GET /api/products`: Fetch all products.
- `GET /api/products/:id`: Fetch a single product.
- `POST /api/products`: Add a new product (Admin only).
- `PUT /api/products/:id`: Update product details (Admin only).
- `DELETE /api/products/:id`: Delete a product (Admin only).

### **3. Orders**

- `POST /api/orders`: Place a new order.
- `GET /api/orders/:id`: Fetch order details.
- `PUT /api/orders/:id`: Update order status (Admin only).

### **4. Payments**

- `POST /api/payments/create-order`: Generate Razorpay order ID.
- `POST /api/payments/verify`: Verify payment signature.

---

## **Best Practices**

1. **Code Quality**:
   - Follow consistent coding standards (Prettier, ESLint).
   - Write comments for complex logic.

2. **Security**:
   - Use HTTPS for secure communication.
   - Validate user inputs to prevent SQL injection or XSS.
   - Store sensitive data (passwords, API keys) securely.

3. **Scalability**:
   - Use efficient database indexing.
   - Optimize API responses with caching (e.g., Redis).

4. **Testing**:
   - Write unit tests for critical components (Jest, Mocha).
   - Perform end-to-end testing for major user flows.

---

## **Conclusion**

This documentation provides a comprehensive guide for developers. Follow the structure and best practices to ensure a robust and scalable eCommerce solution. For any queries, reach out to the project manager or lead developer.

## **Overview**

The backend is built using Node.js, Express.js, and MongoDB. It includes functionality for user authentication, product management, order management, and payment processing. The backend uses JWT for authentication and authorization.

## **Key Components**

Models: Define the data structure for users, products, and orders.
Controllers: Handle the business logic for various operations.
Routes: Define the API endpoints and map them to the appropriate controller functions.
Middleware: Handle authentication and authorization.
Models
User Model (server/models/userModel.js): Defines the schema for user data, including fields for name, email, password, and isAdmin.

Product Model (server/models/productModel.js): Defines the schema for product data, including fields for name, description, price, stock, category, and images.

Order Model (server/models/orderModel.js): Defines the schema for order data, including fields for user, products, totalPrice, and status.

Controllers
Auth Controller (server/controllers/authController.js): Handles user registration, login, and adding new admin users.

register: Registers a new user.
login: Authenticates a user and returns a JWT token.
addAdmin: Adds a new admin user (to be implemented).
Product Controller (server/controllers/productController.js): Handles CRUD operations for products.

getProducts: Fetches all products.
getProduct: Fetches a single product by ID.
addProduct: Adds a new product (admin only).
updateProduct: Updates a product by ID (admin only).
deleteProduct: Deletes a product by ID (admin only).
Order Controller (server/controllers/orderController.js): Handles order management.

placeOrder: Places a new order.
getOrder: Fetches order details by ID.
updateOrderStatus: Updates the status of an order (admin only).
Payment Controller (server/controllers/paymentController.js): Handles payment processing with Razorpay.

createOrder: Generates a Razorpay order ID.
verifyPayment: Verifies the payment signature.
Routes
Auth Routes (server/routes/authRoutes.js): Defines routes for user authentication and admin creation.

POST /api/auth/signup: Registers a new user.
POST /api/auth/login: Authenticates a user.
POST /api/auth/admin/create: Adds a new admin user (to be implemented).
Product Routes (server/routes/productRoutes.js): Defines routes for product management.

GET /api/products: Fetches all products.
GET /api/products/:id: Fetches a single product by ID.
POST /api/products: Adds a new product (admin only).
PUT /api/products/:id: Updates a product by ID (admin only).
DELETE /api/products/:id: Deletes a product by ID (admin only).
Order Routes (server/routes/orderRoutes.js): Defines routes for order management.

POST /api/orders: Places a new order.
GET /api/orders/:id: Fetches order details by ID.
PUT /api/orders/:id: Updates the status of an order (admin only).
Payment Routes (server/routes/paymentRoutes.js): Defines routes for payment processing.

POST /api/payments/create-order: Generates a Razorpay order ID.
POST /api/payments/verify: Verifies the payment signature.
Middleware
Auth Middleware (server/middleware/authMiddleware.js): Protects routes by ensuring the user is authenticated.

Admin Middleware (server/middleware/adminMiddleware.js): Protects admin routes by ensuring the user is an admin.
