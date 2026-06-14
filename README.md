# Banking Frontend

A modern, responsive banking dashboard built with Next.js and TypeScript. Connects to the [Banking REST API](https://github.com/AdamKatrenic/banking-api) backend.

**Live Demo:** [banking-frontend-steel.vercel.app](https://banking-frontend-steel.vercel.app)  
**Backend API:** [banking-api-production-238c.up.railway.app](https://banking-api-production-238c.up.railway.app/swagger-ui/index.html)

---

## Features

- **Authentication** — Register and login with JWT tokens stored in secure cookies
- **Dashboard** — Overview of all accounts and total balance with animations
- **Account Management** — Create multiple bank accounts (€1,000 starting balance)
- **Transactions** — Deposit, withdraw and transfer funds between accounts
- **Transaction History** — Full history per account with type badges and filtering
- **Transaction Charts** — Bar chart and doughnut chart powered by Chart.js
- **CSV Export** — Download transaction history as a spreadsheet
- **Email Notifications** — Receive email on every transaction
- **Profile Page** — View account info and change password
- **Animations** — Smooth transitions powered by Framer Motion
- **Toast Notifications** — Success and error feedback
- **Protected Routes** — Automatic redirect to login when unauthenticated
- **Responsive Design** — Works on desktop and mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Forms | React Hook Form + Zod |
| HTTP Client | Axios |
| Auth | JWT via js-cookie |
| Charts | Chart.js + react-chartjs-2 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| Deployment | Vercel |

---

## Project Structure

```
app/
├── dashboard/
│   └── page.tsx                  # Main dashboard page
├── login/
│   └── page.tsx                  # Login page
├── register/
│   └── page.tsx                  # Register page
├── profile/
│   └── page.tsx                  # Profile page
├── components/
│   ├── dashboard/
│   │   ├── WelcomeBanner.tsx     # Total balance overview
│   │   ├── AccountCard.tsx       # Single account card
│   │   ├── AccountList.tsx       # List of all accounts
│   │   ├── QuickActions.tsx      # Deposit/Withdraw/Transfer buttons
│   │   ├── RecentTransactions.tsx# Transaction history with filter
│   │   ├── TransactionChart.tsx  # Bar + Doughnut charts
│   │   └── TransactionFilter.tsx # Filter by transaction type
│   ├── layout/
│   │   ├── Navbar.tsx            # Top navigation with logout
│   │   └── PageWrapper.tsx       # Page layout wrapper
│   ├── modals/
│   │   ├── DepositModal.tsx
│   │   ├── WithdrawModal.tsx
│   │   └── TransferModal.tsx
│   └── ui/
│       ├── Button.tsx            # Reusable button
│       ├── Input.tsx             # Reusable input with validation
│       ├── Card.tsx              # Reusable card wrapper
│       └── Badge.tsx             # Transaction type badge
├── hooks/
│   ├── useAccounts.ts            # Accounts data fetching
│   └── useTransactions.ts        # Transactions data fetching
└── lib/
    ├── api.ts                    # Axios instance with JWT interceptor
    ├── auth.ts                   # Auth helpers (get/set/remove token)
    └── types.ts                  # TypeScript interfaces
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Banking REST API running (locally or on Railway)

### Setup

```bash
git clone https://github.com/AdamKatrenic/banking-frontend.git
cd banking-frontend
npm install
```

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:8080` |

---

## Usage

**1. Register** at `/register`

**2. Login** at `/login`

**3. Dashboard** — redirected automatically after login

**4. Create an account** — click **+ New Account**

**5. Select an account** and use Quick Actions:
- **Deposit** — add funds
- **Withdraw** — remove funds
- **Transfer** — send to another account number

**6. Export** — click **Export CSV** to download transaction history

**7. Profile** — click Profile in navbar to view info or change password

---

## Color Scheme

| Color | Hex | Usage |
|---|---|---|
| Background | `#0F1117` | Page background |
| Card | `#1A1D27` | Card backgrounds |
| Border | `#2A2D3A` | Borders |
| Teal | `#00BFA6` | Primary accent |
| Teal Hover | `#00A896` | Hover states |

---

## Related

- [Banking REST API](https://github.com/AdamKatrenic/banking-api) — Spring Boot backend

---

## Author

**Adam Katrenič** — Junior Java & Fullstack Developer

[GitHub](https://github.com/AdamKatrenic) · [LinkedIn](https://linkedin.com/in/adam-katrenic-a730a5406) · [Live Demo](https://banking-frontend-steel.vercel.app)
