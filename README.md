# **MisplaceMe**

MisplaceMe is a web application designed to help students and staff locate lost items on campus, specifically tailored for private universities. It simplifies the process of searching for lost belongings while providing admins with tools to manage reports of found items efficiently. The website is designed to connect people who have lost items with those who have found them. Our platform provides a simple and efficient way to report lost or found items, facilitating reunions and reducing losses.


---

## **Visit MisplaceMe**

You can access the live application here: [MisplaceMe](https://misplace-me.vercel.app/)

---

## **About MisplaceMe**

MisplaceMe helps bridge the gap between lost and found items on campus. It provides two types of access: 

- **General Users**:  
  General users can view a list of lost items, search for specific items by name, and filter results based on location.  

- **Admins**:  
  Admins can log in to manage the list of lost items, including adding, editing, or deleting reports. They can also track the status of reports and maintain a history of submitted reports.

---

## **Features**

### **General User Features**
- **Home Page**:  
  - View a paginated list of lost items.
  - Search for items by name.
  - Filter items by location.

- **About Us Page**:  
  Learn about MisplaceMe and its purpose.

---

### **Admin Features**
- **Login Page**: Admins authenticate their accounts using a secure username and password.
- **Home Page**: An admin-specific view with additional management functionalities.
- **Reports Page**:
    - Contains a table displaying a list of all reports.
    - Admins can:
        - **Edit a Report**: Update the details of a report directly from the table.
        - **Delete a Report**: Remove a report from the list when it is no longer relevant.
- **Make a Report Page**:
    - Provides a form for admins to create reports of lost or found items.
    - Key features of the form:
        - **Preview**: Displays a live preview of the report as details are entered.
        - **Submit**: Submits the report and resets the form.
        - **Cancel**: Clears the form and reverts the preview to its default state.

---

## **Technologies Used**

### **Frontend**
- **React**: Library for building user interfaces.
- **TypeScript**: Provides static type checking.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Select**: Enhanced select inputs.
- **React Icons**: Scalable vector icons.

### **Code Quality**
- **ESLint**: Ensures code consistency and quality.

---

## **Setup Instructions**

To set up the MisplaceMe project locally, follow these steps:

### **1. Clone the Repository**
   ```bash
   git clone https://github.com/Ghreatness-Laboratory/lost-found_bellsuniversity.git
   cd lost-found_bellsuniversity
   ```

### **2. Install Dependencies**
   - Ensure Node.js and npm are installed:
     ```bash
     node -v
     npm -v
     ```
   - Install the required dependencies:
     ```bash
     npm install
     ```

### **3. Run the Development Server**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

### **4. Build for Production**
   - Create a production-ready build:
     ```bash
     npm run build
     ```
   - Deploy the `build/` folder to your hosting service.

---

## **Documentation**

For a detailed overview of the project's functionality, structure, and additional setup information, refer to the official documentation:  
[Read the Documentation](https://saber-spinach-e83.notion.site/MisplaceMe-14ad78cbc32b80cfb136c536e1f58745)
