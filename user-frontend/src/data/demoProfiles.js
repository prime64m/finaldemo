// Pre-configured demo profiles for 1-click hackathon testing

export const DEMO_PROFILES = [
  {
    id: "rural-farmer-karnataka",
    title: "Rural Farmer Family (Karnataka)",
    subtitle: "4 members • Farmer household • BPL Card • Small landholding",
    familyDetails: {
      familyName: "Ramesh Gowda Household",
      email: "ramesh.gowda@example.com",
      mobile: "9876543210",
      state: "Karnataka",
      district: "Mandya",
      rationCard: "BPL",
      residenceType: "Rural"
    },
    members: [
      {
        id: "mem-1",
        name: "Ramesh Gowda",
        age: 52,
        gender: "Male",
        relationship: "Head of Family",
        occupation: "Farmer",
        education: "High School / 10th",
        annualIncome: 180000,
        incomeBracket: "Below ₹2.5L",
        socialCategory: "OBC",
        disability: "No Disability",
        landOwnership: "Small/Marginal Farmer < 2 Hectares",
        specialAttributes: []
      },
      {
        id: "mem-2",
        name: "Sunitha Gowda",
        age: 47,
        gender: "Female",
        relationship: "Spouse",
        occupation: "Homemaker",
        education: "Primary School",
        annualIncome: 0,
        incomeBracket: "Non-Taxpayer",
        socialCategory: "OBC",
        disability: "No Disability",
        landOwnership: "Landless",
        specialAttributes: []
      },
      {
        id: "mem-3",
        name: "Ananya Gowda",
        age: 19,
        gender: "Female",
        relationship: "Daughter",
        occupation: "Student",
        education: "Higher Secondary / 12th",
        annualIncome: 0,
        incomeBracket: "Non-Taxpayer",
        socialCategory: "OBC",
        disability: "No Disability",
        landOwnership: "Landless",
        specialAttributes: []
      },
      {
        id: "mem-4",
        name: "Varun Gowda",
        age: 14,
        gender: "Male",
        relationship: "Son",
        occupation: "Student",
        education: "High School / 10th",
        annualIncome: 0,
        incomeBracket: "Non-Taxpayer",
        socialCategory: "OBC",
        disability: "No Disability",
        landOwnership: "Landless",
        specialAttributes: []
      }
    ]
  },
  {
    id: "urban-worker-maharashtra",
    title: "Urban Low-Income Family (Maharashtra)",
    subtitle: "4 members • Daily wage worker • PwD Member • Senior Widow",
    familyDetails: {
      familyName: "Shinde Family",
      email: "ganesh.shinde@example.com",
      mobile: "9812345678",
      state: "Maharashtra",
      district: "Thane",
      rationCard: "BPL",
      residenceType: "Urban"
    },
    members: [
      {
        id: "mem-101",
        name: "Ganesh Shinde",
        age: 38,
        gender: "Male",
        relationship: "Head of Family",
        occupation: "Daily Wage Worker",
        education: "High School / 10th",
        annualIncome: 120000,
        incomeBracket: "Below ₹2.5L",
        socialCategory: "SC",
        disability: "PwD >= 40%",
        landOwnership: "Landless",
        specialAttributes: []
      },
      {
        id: "mem-102",
        name: "Savita Shinde",
        age: 34,
        gender: "Female",
        relationship: "Spouse",
        occupation: "Self-Employed / Small Business",
        education: "Primary School",
        annualIncome: 40000,
        incomeBracket: "Below ₹2.5L",
        socialCategory: "SC",
        disability: "No Disability",
        landOwnership: "Landless",
        specialAttributes: []
      },
      {
        id: "mem-103",
        name: "Parvati Shinde",
        age: 64,
        gender: "Female",
        relationship: "Mother",
        occupation: "Retired / Pensioner",
        education: "Illiterate",
        annualIncome: 0,
        incomeBracket: "Non-Taxpayer",
        socialCategory: "SC",
        disability: "No Disability",
        landOwnership: "Landless",
        specialAttributes: ["Senior Citizen", "Widow"]
      },
      {
        id: "mem-104",
        name: "Priya Shinde",
        age: 8,
        gender: "Female",
        relationship: "Daughter",
        occupation: "Student",
        education: "Primary School",
        annualIncome: 0,
        incomeBracket: "Non-Taxpayer",
        socialCategory: "SC",
        disability: "No Disability",
        landOwnership: "Landless",
        specialAttributes: []
      }
    ]
  },
  {
    id: "student-widow-up",
    title: "Student & Widow Household (Uttar Pradesh)",
    subtitle: "3 members • Antyodaya Card • EWS Category • College Student",
    familyDetails: {
      familyName: "Vimla Devi Household",
      email: "vimla.devi@example.com",
      mobile: "9765432109",
      state: "Uttar Pradesh",
      district: "Varanasi",
      rationCard: "Antyodaya AAY",
      residenceType: "Semi-Urban"
    },
    members: [
      {
        id: "mem-201",
        name: "Vimla Devi",
        age: 48,
        gender: "Female",
        relationship: "Head of Family",
        occupation: "Homemaker",
        education: "Primary School",
        annualIncome: 50000,
        incomeBracket: "Non-Taxpayer",
        socialCategory: "EWS",
        disability: "No Disability",
        landOwnership: "Landless",
        specialAttributes: ["Widow"]
      },
      {
        id: "mem-202",
        name: "Amit Kumar",
        age: 20,
        gender: "Male",
        relationship: "Son",
        occupation: "Student",
        education: "Graduate",
        annualIncome: 0,
        incomeBracket: "Non-Taxpayer",
        socialCategory: "EWS",
        disability: "No Disability",
        landOwnership: "Landless",
        specialAttributes: []
      },
      {
        id: "mem-203",
        name: "Khushi Kumar",
        age: 16,
        gender: "Female",
        relationship: "Daughter",
        occupation: "Student",
        education: "Higher Secondary / 12th",
        annualIncome: 0,
        incomeBracket: "Non-Taxpayer",
        socialCategory: "EWS",
        disability: "No Disability",
        landOwnership: "Landless",
        specialAttributes: []
      }
    ]
  }
];
