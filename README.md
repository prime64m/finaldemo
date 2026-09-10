# SchemeSaathi (Crevil_TIE) 🏛️

**SchemeSaathi** is a simple, professional, and accessible civic-tech platform that helps Indian families discover government welfare schemes they are eligible for.

## 🌟 The Core Problem
Millions of Indian households are eligible for government welfare programs (subsidies, scholarships, pensions, agricultural grants, housing schemes), but they often don't know which schemes they qualify for or what documents are required.

SchemeSaathi solves this by allowing a family to create **one single family profile** and add **each household member separately** (e.g. Father, Mother, Children, Senior Citizens). Our transparent, **rule-based eligibility engine** compares family and member attributes against eligibility conditions to instantly reveal matching central and state government schemes.

---

## ✨ Features

- **🏠 Home & Hero Portal**: Fast introduction, key statistics counter, 4-step visual guide, category grid, and 1-click hackathon demo presets.
- **👨‍👩‍👧‍👦 Family Profile Manager**: 
  - Collects household information (State, District, Ration Card category like BPL/Antyodaya).
  - Allows adding multiple family members individually with details: Age, Occupation, Annual Income, Social Category (General/OBC/SC/ST/EWS), Education, Disability status, Land ownership, and Special attributes (Widow, Senior Citizen, Pregnant/Lactating).
  - Displays members as clean, editable cards.
- **⚡ Rule-Based Eligibility Engine**: 
  - Transparent matching logic comparing age range, income limits, occupation, state, social category, land, and disability.
  - Generates clear **"Why You Matched"** checkmark reasons and attributes matching members to each scheme.
- **📊 Scheme Dashboard**: 
  - **Eligible Schemes**: Fully satisfied criteria.
  - **Check Details**: Partial matches or items needing specific document verification.
  - **Not Eligible**: Clear explanation of missing criteria.
  - Filter results by **Whole Household** or **Specific Family Member**.
- **🔍 Explore Schemes Catalog**: Search bar with multi-filters (Category, State, Social Category, Occupation, Income slider).
- **📋 Scheme Details Page**: Deep dive view with benefits, document checklist, application guide, and direct links to official government portals.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + Custom Civic Tech Color Palette (Navy, Emerald, Saffron)
- **Icons**: Lucide Icons (`lucide-react`)
- **State Management**: React Hooks + `localStorage` persistence

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm / yarn

### Installation
```bash
# Clone the repository
git clone git@github.com:iharshkumar/Crevil_TIE.git

# Navigate to project directory
cd Crevil_TIE

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
```

---

## 📜 Disclaimer
*Eligibility shown on SchemeSaathi is an initial indication based on information provided in the family profile. Final eligibility, approval, and disbursement are determined by the respective Government Department or official portal. All scheme criteria present in demo data are for demonstration purposes.*
