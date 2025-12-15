
#  Student Fee Dashboard

> **Project Goal:** To design a modern fee dashboard that displays fee summaries and allows invoice downloads.

## 📖 Overview

This project provides a centralized interface for students to manage their financial obligations to their institution. It focuses on clarity and accessibility, ensuring students can quickly see what they owe, pay bills via a mock gateway, and keep records of their transactions.

  * **Target Audience:** Students needing to track payments and avoid missed deadlines.

## 🔗 Quick Links (Deliverables)

| **🚀 Live Project** | [**View Deployment (Vercel)**](https://student-fee-portal.vercel.app/) |
| **📂 Source Code** | [**GitHub Repository**](https://github.com/Victor-430/student-fee-portal) |
| **🖼️ Screenshots** | [**Google Drive Folder**](https://drive.google.com/drive/folders/1ArZlct0Q22itP8iSQmTQPrMKigoZF3Lq) |
| **📊 Presentation** | [**Download PDF Slide**](https://drive.google.com/file/d/1HYwCjKXf7kZW5S20MV68hCc6lvRtiCfc/view?usp=sharing) |
| **📄 Docs** | [**Read Documentation**](https://github.com/Victor-430/student-fee-portal/blob/main/README.md) |


## ✨ Key Features

### 💻 Interface & Functionality

  * **Payment Summary:** Real-time view of total fees, paid amounts, and outstanding balances.
  * **Mock Payment Form:** Simulates credit card entry to test the payment flow.
  * **Transaction History:** Logs past payments using **LocalStorage** (persists after refresh).
  * **PDF Receipts:** Integrated receipt generation for instant invoice downloads.
  * **Smart Alerts:** Visual highlighting for unpaid items and overdue warnings.
  * **Responsive Design:** Optimized data tables and card layouts for mobile and desktop.



## 🛠️ Tech Stack

  * **Frontend Framework:** React.js (Hooks for state management)
  * **Styling:** CSS3 / Styled-components
  * **Logic:** JavaScript (ES6+)
  * **Persistence:** Browser LocalStorage API
  * **Libraries:** `html2pdf.js` (PDF Generation)


## 🎨 Design System

The dashboard utilizes a specific color palette to ensure visual hierarchy and clarity.

| Color Role | Hex Code | Visual |

| **Background** | `#1b3c53` | 🔵 Dark Blue |
| **Primary** | `#abe0f0` | 🔵 Light Blue |
| **Button Action** | `#3182ce` | 🔵 Royal Blue |
| **Success** | `#3db6b1` | 🟢 Teal |
| **Alert/Error** | `#ff3838`, `#dc0000` | 🔴 Red |
| **Warning** | `#ffee99`, `#f5c857` | 🟡 Yellow/Gold |
| **Borders** | `#607b8f` | 🔘 Grey Blue |

-----

## 📦 Installation & Setup

To run this project locally, follow these steps:

1.  **Clone the repository**

    ```bash
    git clone https://github.com/Victor-430/student-fee-portal.git
    ```

2.  **Navigate to the project directory**

    ```bash
    cd student-fee-portal
    ```

3.  **Install dependencies**

    ```bash
    npm install
    ```

4.  **Start the development server**

    ```bash
    npm start
    ```

The application will launch in your browser at `http://localhost:5173`.