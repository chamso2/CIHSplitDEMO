CIH Split Application README
CIH Split Demo Application

Overview

This project is an interactive French-language demo CIH Split application built for the CIH Hackathon Tour. It showcases how a CIH customer can explore buy-now-pay-later (BNPL) financing options and complete payments using the official Wallet Management Kit APIs.

The application does not handle wallet creation or activation. It only supports customers who already have an active CIH wallet.

**Features

Customer Dashboard** After login through received credentials, the user sees:

Credit score (internally computed)

Available purchasing limit (“plafond disponible”)

Next scheduled installment date (if applicable)

Popular partner products (Marjane, Electroplanet, Biougnach)

Trending promotional products

List of CIH Split partners

Product Details & Payment Plans
Each product page displays:

Product information Checkout process has three payment plan options: 4-month split payments with no interest

Immediate payment with extended duration and small interest

Deferred payment (first payment after 2 months) with medium interest

The interest calculations are performed inside the application, not through CIH APIs.

Purchase Simulation & Confirmation
The purchase flow follows CIH’s Wallet-to-Merchant transaction API:

-Simulation: POST /wallet/Transfer/WalletToMerchant?step=simulation

-OTP (optional): POST /wallet/walletToMerchant/cash/out/otp

-Confirmation: POST /wallet/Transfer/WalletToMerchant?step=confirmation

Once confirmed, the backend schedules installment reminders.

Automated Notifications
The backend sends:

Email/push notification one week before each installment

Notification/ Emai on the day of the installment

This is implemented via cloud messaging and is not part of CIH APIs.

Wallet Information & History
The app retrieves real wallet information using:

Customer profile: POST /wallet/clientinfo

Balance: GET /wallet/balance?contractid=XXXX

Transaction history: GET /wallet/operations?contractid=XXXX
