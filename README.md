# 🏡 Real Estate Analysis Chatbot

### AI-Powered Data Analytics • Django REST API • React Dashboard • Excel Insights • Charts & Exports

---

## 📌 Overview

The **Real Estate Analysis Chatbot** is an AI-assisted web application that analyzes real-estate market data from Excel using a smart NLP-style query system.
Users can:

✔ Search any area (e.g., *“Wakad 2022”*)
✔ View automatically generated **summaries**, **charts**, and **tables**
✔ Compare multiple locations
✔ Export insights as **CSV** or **PDF**
✔ View real-estate trends over years such as **price**, **demand**, and **carpet area**

The system combines:

* **Django REST Framework** (Backend APIs)
* **Pandas** for data processing
* **React + Recharts UI Dashboard**
* **Bootstrap Professional UI**

---

## 🚀 Features

### 🔹 **1. Smart Query-Based Analysis**

Type any area name and the system automatically:

* Filters data
* Computes averages
* Generates meaningful insights
* Displays structured charts

---

### 🔹 **2. Interactive Charts (Recharts)**

* Line chart for price trends
* Bar chart for demand
* Multi-area comparison

---

### 🔹 **3. Data Table with Searchable Results**

* Clean formatted table
* Shows year-wise numbers
* Downloadable

---

### 🔹 **4. Area Comparison**

Compare **2 or more areas** and visualize trends side-by-side.

---

### 🔹 **5. Export Options**

Download results as:

✔ **CSV File**
✔ **PDF Report (jsPDF)**

---

### 🔹 **6. Clean UI/UX**

* Sidebar navigation
* Modern dashboard layout
* Animation-ready components

---

## 📁 Project Structure

```
RealEstate_Chatbot/
│
├── Backend/
│   ├── api/
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── sample.xlsx
│   ├── backend/
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   ├── utils/
│   │   └── index.css
│   ├── public/
│   └── package.json
```

---

## 🖥️ Tech Stack

### **Frontend**

* React.js
* Axios
* Recharts
* Bootstrap

### **Backend**

* Django
* Django REST Framework
* Pandas
* OpenPyXL

---

## 📘 Future Enhancements

* Add **LLM-based natural language analysis** (ChatGPT API)
* Advance filters (YoY %, CAGR)
* Deploy on Vercel + Render
* Dark mode
