# How to Run GymXP on Your Phone - Complete Beginner Guide

This guide will walk you through EVERYTHING you need to install and do to run the GymXP app on your phone. Since this is your first time, every step is explained in detail.

---

## PART 1: Tools and Apps You Need to Install on Your Computer (Windows)

You need to install these programs on your Windows PC first. The app code runs on your computer and connects to your phone.

### 1. Node.js (REQUIRED)

What is it? Node.js lets your computer run JavaScript code (the language this app is built in).

- Download: https://nodejs.org
- Version: Download the LTS version (the green button)
- Installation: Run the installer, click Next on everything, then Finish
- Verify: Open PowerShell (search for "PowerShell" in Start menu) and type:

```
node --version
```

You should see something like v20.x.x or v22.x.x

---

### 2. pnpm (REQUIRED - Package Manager)

What is it? pnpm installs all the libraries/packages that the project depends on. This project uses pnpm version 10.

Install it by opening PowerShell and running:

```
npm install -g pnpm@10
```

Verify:

```
pnpm --version
```

You should see 10.x.x

---

### 3. Git (REQUIRED)

What is it? Git lets you download code from GitHub and track changes.

- Download: https://git-scm.com/downloads/win
- Installation: Run the installer, use default settings, click Next everywhere, then Finish
- Verify:

```
git --version
```

---

### 4. PostgreSQL Database (REQUIRED for the Backend API)

What is it? PostgreSQL is a database that stores all the app data (users, branches, etc.)

- Download: https://www.postgresql.org/download/windows/
- Version: Latest version (16 or 17)

Installation steps:
1. Run the installer
2. When asked for a password, set it to: postgres (remember this!)
3. When asked for a port, keep the default: 5432
4. Finish the installation

After installation, create the database:
1. Open PowerShell and run:

```
psql -U postgres
```

2. Enter your password (postgres)
3. Then type:

```
CREATE DATABASE gymxp;
\q
```

---

### 5. Visual Studio Code (RECOMMENDED - Code Editor)

What is it? A free code editor to view and edit the project files.

- Download: https://code.visualstudio.com
- Installation: Run the installer with default settings

---

### 6. Expo Go App (REQUIRED - Install on Your PHONE)

What is it? Expo Go is a free app on your phone that runs the mobile app directly without needing to build it.

- Android: Open Google Play Store and search "Expo Go" then install it
- iPhone: Open Apple App Store and search "Expo Go" then install it

IMPORTANT: Your phone and your computer MUST be on the same Wi-Fi network for this to work!

---

## PART 2: Set Up the Project on Your Computer

### Step 1: Open the project in PowerShell

Open PowerShell and run this command to go to the project folder:

```
cd C:\Users\anasy\Desktop\GymXp-feature-avatar-3d-foundation\GymXp-feature-avatar-3d-foundation
```

### Step 2: Install all dependencies

```
pnpm install
```

This downloads all the libraries the project needs. It may take a few minutes. Wait until it finishes.

### Step 3: Set up the Backend API environment file

```
copy apps\api\.env.example apps\api\.env
```

Now open the file apps\api\.env in Notepad or VS Code and make sure it looks like this:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gymxp"
JWT_SECRET="change-me"
HOST=0.0.0.0
PORT=4000
DEMO_BRAND_ID="brand_gym_city"
```

WARNING: If you set a different PostgreSQL password during installation, change postgres:postgres to postgres:YOUR_PASSWORD

### Step 4: Set up the database tables (Prisma)

Run these commands ONE BY ONE (wait for each to finish before running the next):

Command 1 - Generate database code:

```
pnpm --filter @gymxp/api prisma:generate
```

Command 2 - Create database tables:

```
pnpm --filter @gymxp/api prisma:migrate
```

When asked for a migration name, type: init and press Enter.

Command 3 - Fill database with demo data:

```
pnpm --filter @gymxp/api prisma:seed
```

This fills the database with demo data (demo users, gym branches, etc.)

### Step 5: Set up the Mobile app environment file

```
copy apps\mobile\.env.example apps\mobile\.env
```

### Step 6: Find your computer IP address (IMPORTANT)

Run this command:

```
ipconfig
```

Look for "IPv4 Address" under your Wi-Fi adapter. It will look like: 192.168.1.100 (your number will be different).

Write down this number! You need it.

Now open apps\mobile\.env in Notepad and ADD this line (replace 192.168.1.100 with YOUR IP):

```
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.100:4000
```

---

## PART 3: Run the App

You need TWO PowerShell windows open at the same time.

### PowerShell Window 1 - Start the Backend API Server

```
cd C:\Users\anasy\Desktop\GymXp-feature-avatar-3d-foundation\GymXp-feature-avatar-3d-foundation
pnpm dev:api
```

You should see something like: Server listening on http://0.0.0.0:4000
KEEP THIS WINDOW OPEN! Do not close it.

### PowerShell Window 2 - Start the Mobile App (Expo)

Open a NEW PowerShell window and run:

```
cd C:\Users\anasy\Desktop\GymXp-feature-avatar-3d-foundation\GymXp-feature-avatar-3d-foundation
pnpm dev:mobile
```

After a few seconds, you will see a QR code in the terminal.

---

## PART 4: Open the App on Your Phone

### For Android:
1. Open the Expo Go app on your phone
2. Tap "Scan QR Code"
3. Scan the QR code shown in your PowerShell terminal
4. The app will load on your phone!

### For iPhone:
1. Open your Camera app (not Expo Go)
2. Point it at the QR code in the terminal
3. Tap the notification that appears - it will open in Expo Go
4. The app will load on your phone!

### Demo Login Credentials:

Email: ali@example.com
Password: demo12345

Email: sara@example.com
Password: demo12345

---

## TROUBLESHOOTING - Common Problems and Solutions

### Problem: "pnpm: command not found"
Solution: Close and reopen PowerShell after installing pnpm, or restart your computer.

### Problem: "Cannot connect to database"
Solution: Make sure PostgreSQL is running. Search for "Services" in Start menu, find "postgresql", and make sure it says Running.

### Problem: QR code does not work or app will not load
Solution 1: Make sure your phone and computer are on the SAME Wi-Fi network.
Solution 2: Try pressing the letter "s" in the Expo terminal to switch to Expo Go mode.

### Problem: "Network error" or "API not reachable" inside the app
Solution: Make sure you correctly set EXPO_PUBLIC_API_BASE_URL in apps\mobile\.env to your computer IP address (see Step 6 above). Then restart the mobile app (press Ctrl+C and run pnpm dev:mobile again).

### Problem: "Expo Go version mismatch"
Solution: Update Expo Go on your phone from the app store to the latest version.

---

## QUICK SUMMARY - Everything You Need to Install

On your COMPUTER:
1. Node.js (LTS) - from https://nodejs.org
2. pnpm v10 - run: npm install -g pnpm@10
3. Git - from https://git-scm.com/downloads/win
4. PostgreSQL - from https://www.postgresql.org/download/windows/
5. VS Code - from https://code.visualstudio.com

On your PHONE:
6. Expo Go - from Play Store (Android) or App Store (iPhone)

---

## ALL COMMANDS IN ORDER (Copy and Paste These)

Open PowerShell and run these commands one by one:

```
cd C:\Users\anasy\Desktop\GymXp-feature-avatar-3d-foundation\GymXp-feature-avatar-3d-foundation
```

```
pnpm install
```

```
copy apps\api\.env.example apps\api\.env
```

```
copy apps\mobile\.env.example apps\mobile\.env
```

```
pnpm --filter @gymxp/api prisma:generate
```

```
pnpm --filter @gymxp/api prisma:migrate
```

```
pnpm --filter @gymxp/api prisma:seed
```

```
pnpm dev:api
```

Then open a SECOND PowerShell window and run:

```
cd C:\Users\anasy\Desktop\GymXp-feature-avatar-3d-foundation\GymXp-feature-avatar-3d-foundation
```

```
pnpm dev:mobile
```

Then scan the QR code with Expo Go on your phone. DONE!

---

## DAILY USAGE (After First Setup)

Once everything is set up, you only need these 2 commands each time:

PowerShell Window 1:
```
cd C:\Users\anasy\Desktop\GymXp-feature-avatar-3d-foundation\GymXp-feature-avatar-3d-foundation
pnpm dev:api
```

PowerShell Window 2:
```
cd C:\Users\anasy\Desktop\GymXp-feature-avatar-3d-foundation\GymXp-feature-avatar-3d-foundation
pnpm dev:mobile
```

Then scan the QR code with your phone. Done!

---

TIP: If you ever pull new code from GitHub, run pnpm install again to update dependencies.
