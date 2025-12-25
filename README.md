# CIH Split Application

## CIH Split Demo Application

## Overview
This project is an **interactive French-language demo application** developed for the **CIH Hackathon Tour**.  
It demonstrates how a CIH customer can explore **Buy Now, Pay Later (BNPL)** financing options and complete payments using the official **CIH Wallet Management Kit APIs**.

⚠️ The application **does not handle wallet creation or activation**.  
It is designed exclusively for customers who already have an **active CIH wallet**.

---

## Features

### Customer Dashboard
After login using provided credentials, the customer can view:
- **Credit score** (internally computed)
- **Available purchasing limit** (*plafond disponible*)
- **Next scheduled installment date** (if applicable)
- **Popular partner products** (Marjane, Electroplanet, Biougnach)
- **Trending promotional products**
- **List of CIH Split partner merchants**

---

### Product Details & Payment Plans
Each product page includes:
- Detailed product information
- A checkout process offering **three payment plans**:
  1. **4-month split payment** with no interest  
  2. **Immediate payment** with extended duration and low interest  
  3. **Deferred payment** (first payment after 2 months) with medium interest  

📌 Interest calculations are performed **within the application** and are **not handled by CIH APIs**.

---

### Purchase Simulation & Confirmation
The purchase flow follows CIH’s **Wallet-to-Merchant transaction process**:

- **Simulation:**  
  `POST /wallet/Transfer/WalletToMerchant?step=simulation`

- **OTP (optional):**  
  `POST /wallet/walletToMerchant/cash/out/otp`

- **Confirmation:**  
  `POST /wallet/Transfer/WalletToMerchant?step=confirmation`

Once the transaction is confirmed, the backend automatically schedules installment reminders.

---

### Automated Notifications
The backend system sends:
- **Email / push notification** one week before each installment
- **Notification / email** on the installment due date  

These notifications are implemented using **cloud messaging services** and are **not part of CIH APIs**.

---

### Wallet Information & History
The application retrieves real wallet data using the following CIH endpoints:

- **Customer profile:**  
  `POST /wallet/clientinfo`

- **Wallet balance:**  
  `GET /wallet/balance?contractid=XXXX`

- **Transaction history:**  
  `GET /wallet/operations?contractid=XXXX`
