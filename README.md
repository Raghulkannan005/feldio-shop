# User Documentation for eCommerce Website

This document provides an overview of the eCommerce website project, built with the MERN stack. It outlines the features, technologies, and functionalities available to users.

---

## **Project Overview**

The eCommerce website includes the following features:

- **Frontend**: React.js with responsive styling (Tailwind CSS/Bootstrap).
- **Backend**: Node.js with Express.js for API handling.
- **Database**: MongoDB Atlas for storing user, product, and order data.
- **Integrations**: Razorpay for payments, Meta Ads, and Google Ads for marketing.
- **Hosting**: Hostinger for both frontend and backend services.

---

## **Features**

### **1. User Authentication**

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

## **User Guide**

### **1. Browsing Products**

- Users can browse through a list of products available on the website.
- Each product displays its name, description, price, stock, category, and images.

### **2. Product Details**

- Users can click on a product to view its detailed information.
- The product details page includes a larger image, detailed description, price, and stock availability.

### **3. Adding Products to Cart**

- Users can add products to their cart from the product details page.
- The cart displays all selected products, their quantities, and the total price.

### **4. Checkout Process**

- Users can proceed to checkout from the cart page.
- The checkout process includes entering shipping details and selecting a payment method.
- Payments are processed securely via Razorpay.

### **5. Order Management**

- Users can view their order history and track the status of their orders.
- Order details include the list of products, quantities, total price, and current status (Pending, Shipped, Delivered, Cancelled).

### **6. User Account Management**

- Users can create an account, log in, and manage their profile.
- Profile management includes updating personal information and changing the password.

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

This documentation provides an overview of the eCommerce website for users. It outlines the features, functionalities, and best practices to ensure a robust and scalable eCommerce solution. For any queries, reach out to the support team or visit the help center.

