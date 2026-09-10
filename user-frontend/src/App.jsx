import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FamilyProfilePage from './pages/FamilyProfilePage';
import ExploreSchemesPage from './pages/ExploreSchemesPage';
import EligibleSchemesPage from './pages/EligibleSchemesPage';
import SchemeDetailsPage from './pages/SchemeDetailsPage';
import AboutPage from './pages/AboutPage';
import AssistedHelpWidget from './components/AssistedHelpWidget';
import { DEMO_PROFILES } from './data/demoProfiles';

const LOCAL_STORAGE_KEY = 'schemesaathi_family_profile_v1';
const USER_ACCOUNT_KEY = 'schemesaathi_user_account_v1';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedScheme, setSelectedScheme] = useState(null);

  // Google User Account state
  const [userAccount, setUserAccount] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_ACCOUNT_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (userAccount) {
        localStorage.setItem(USER_ACCOUNT_KEY, JSON.stringify(userAccount));
      } else {
        localStorage.removeItem(USER_ACCOUNT_KEY);
      }
    } catch (e) {
      console.error("Error saving user account:", e);
    }
  }, [userAccount]);

  // Initialize profile from localStorage or default to Rural Farmer Household preset
  const [familyProfile, setFamilyProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error reading localStorage:", e);
    }
    // Fallback default demo profile
    return {
      familyDetails: DEMO_PROFILES[0].familyDetails,
      members: DEMO_PROFILES[0].members
    };
  });

  // Save to localStorage when family profile updates
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(familyProfile));
    } catch (e) {
      console.error("Error saving to localStorage:", e);
    }
  }, [familyProfile]);

  // Scroll to top on page change
  const handlePageChange = (newPage) => {
    setActivePage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load a demo profile preset
  const handleLoadDemoProfile = (preset) => {
    setFamilyProfile({
      familyDetails: preset.familyDetails,
      members: preset.members
    });
    handlePageChange('matched');
  };

  // View scheme details
  const handleSelectScheme = (scheme) => {
    setSelectedScheme(scheme);
    handlePageChange('details');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-500 selection:text-white relative transition-colors duration-300">
      
      {/* Navigation Bar */}
      <Navbar 
        activePage={activePage} 
        setActivePage={handlePageChange} 
        familyProfile={familyProfile}
        loadDemoProfile={handleLoadDemoProfile}
        userAccount={userAccount}
        setUserAccount={setUserAccount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {activePage === 'home' && (
          <HomePage 
            setActivePage={handlePageChange} 
            loadDemoProfile={handleLoadDemoProfile} 
          />
        )}

        {activePage === 'profile' && (
          <FamilyProfilePage 
            familyProfile={familyProfile} 
            setFamilyProfile={setFamilyProfile} 
            setActivePage={handlePageChange}
            loadDemoProfile={handleLoadDemoProfile}
            userAccount={userAccount}
            setUserAccount={setUserAccount}
          />
        )}

        {activePage === 'explore' && (
          <ExploreSchemesPage 
            onSelectScheme={handleSelectScheme} 
          />
        )}

        {activePage === 'matched' && (
          <EligibleSchemesPage 
            familyProfile={familyProfile} 
            setActivePage={handlePageChange} 
            onSelectScheme={handleSelectScheme}
            loadDemoProfile={handleLoadDemoProfile}
          />
        )}

        {activePage === 'details' && (
          <SchemeDetailsPage 
            scheme={selectedScheme} 
            familyProfile={familyProfile} 
            onBack={() => handlePageChange('matched')} 
          />
        )}

        {activePage === 'about' && (
          <AboutPage />
        )}
      </main>

      {/* Beginner Friendly Floating Assistance Widget */}
      <AssistedHelpWidget 
        setActivePage={handlePageChange} 
        loadDemoProfile={handleLoadDemoProfile} 
      />

      {/* Footer */}
      <Footer setActivePage={handlePageChange} />

    </div>
  );
}
