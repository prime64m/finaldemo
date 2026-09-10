import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Filter, X, ExternalLink, ChevronRight, Landmark, 
  Sprout, GraduationCap, HeartPulse, Building2, Baby, Award, Wallet, FileText, Database, CheckCircle2
} from 'lucide-react';
import { SCHEMES, CATEGORIES, STATES } from '../data/schemesData';

export default function ExploreSchemesPage({ onSelectScheme }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedState, setSelectedState] = useState('All India');
  const [selectedCategorySocial, setSelectedCategorySocial] = useState('ANY');
  const [selectedOccupation, setSelectedOccupation] = useState('ANY');
  const [maxIncomeFilter, setMaxIncomeFilter] = useState(1000000);
  const [allSchemes, setAllSchemes] = useState(SCHEMES);
  const [mongoSyncedCount, setMongoSyncedCount] = useState(0);

  // Fetch live schemes from MongoDB Atlas user API
  useEffect(() => {
    fetch('http://localhost:5000/api/user/schemes')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          const transformedMongoSchemes = data.data.map(item => ({
            id: item._id || `mongo-${Date.now()}`,
            name: item.title,
            department: item.ministry || 'Ministry of Social Welfare',
            category: item.category || 'General',
            isCentral: true,
            shortDescription: item.description || 'Government welfare scheme pushed via Admin portal.',
            mainBenefits: Array.isArray(item.benefits) ? item.benefits.join(', ') : (item.benefits || 'Financial & material assistance'),
            officialUrl: item.applicationUrl || 'https://india.gov.in',
            lastUpdated: new Date(item.updatedAt || Date.now()).toISOString().split('T')[0],
            isDemoData: false,
            isMongoAtlas: true,
            requiredDocuments: item.documentsRequired || ['Aadhaar Card'],
            applicationProcess: `Apply directly online via ${item.applicationUrl || 'official portal'}.`,
            eligibilitySummary: `Eligible for applicants with annual household income below ₹${(item.eligibilityCriteria?.maxIncomeLimit || 250000).toLocaleString('en-IN')}.`,
            eligibilityRules: {
              minAge: item.eligibilityCriteria?.minAge || 18,
              maxAge: item.eligibilityCriteria?.maxAge || 75,
              genderRequirement: 'ANY',
              occupations: ['ANY'],
              maxAnnualIncome: item.eligibilityCriteria?.maxIncomeLimit || 250000,
              incomeBracketLimit: ['Non-Taxpayer', 'Below ₹2.5L'],
              socialCategories: ['ANY'],
              landOwnership: ['ANY'],
              disabilityRequirement: 'ANY',
              states: ['All India']
            }
          }));

          setMongoSyncedCount(transformedMongoSchemes.length);
          // Combine live MongoDB schemes with default catalog (filtering duplicates by name)
          const existingNames = new Set(transformedMongoSchemes.map(s => s.name.toLowerCase()));
          const remainingDefault = SCHEMES.filter(s => !existingNames.has(s.name.toLowerCase()));
          setAllSchemes([...transformedMongoSchemes, ...remainingDefault]);
        }
      })
      .catch(err => console.log('Live MongoDB fetch note:', err));
  }, []);

  // Filter logic
  const filteredSchemes = useMemo(() => {
    return allSchemes.filter((scheme) => {
      // 1. Search keyword
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch = !query || 
        scheme.name.toLowerCase().includes(query) ||
        scheme.department.toLowerCase().includes(query) ||
        scheme.shortDescription.toLowerCase().includes(query) ||
        scheme.category.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      // 2. Category filter
      if (selectedCategory !== 'All Categories' && scheme.category !== selectedCategory) {
        return false;
      }

      // 3. State filter
      if (selectedState !== 'All India') {
        const isAllIndia = scheme.eligibilityRules?.states?.includes('All India');
        const matchesState = isAllIndia || scheme.eligibilityRules?.states?.includes(selectedState);
        if (!matchesState) return false;
      }

      // 4. Social Category filter
      if (selectedCategorySocial !== 'ANY') {
        const isAnySocial = scheme.eligibilityRules?.socialCategories?.includes('ANY');
        const matchesSocial = isAnySocial || scheme.eligibilityRules?.socialCategories?.includes(selectedCategorySocial);
        if (!matchesSocial) return false;
      }

      // 5. Occupation filter
      if (selectedOccupation !== 'ANY') {
        const isAnyOcc = scheme.eligibilityRules?.occupations?.includes('ANY');
        const matchesOcc = isAnyOcc || scheme.eligibilityRules?.occupations?.includes(selectedOccupation);
        if (!matchesOcc) return false;
      }

      // 6. Max Income filter
      if (scheme.eligibilityRules?.maxAnnualIncome && scheme.eligibilityRules.maxAnnualIncome > maxIncomeFilter) {
        return false;
      }

      return true;
    });
  }, [allSchemes, searchTerm, selectedCategory, selectedState, selectedCategorySocial, selectedOccupation, maxIncomeFilter]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedState('All India');
    setSelectedCategorySocial('ANY');
    setSelectedOccupation('ANY');
    setMaxIncomeFilter(1000000);
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'All Categories' || selectedState !== 'All India' || selectedCategorySocial !== 'ANY' || selectedOccupation !== 'ANY' || maxIncomeFilter < 1000000;

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-6">
      
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-xs font-semibold">
            <Search className="w-3.5 h-3.5" />
            <span>Government Schemes Catalog</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-display tracking-tight">
            Explore Government Welfare Schemes
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl">
            Search and filter central and state government schemes, subsidies, pensions, and educational grants.
          </p>
        </div>

        {mongoSyncedCount > 0 && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs">
            <Database className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>{mongoSyncedCount} Live Schemes Synced from MongoDB Atlas</span>
          </div>
        )}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by scheme name, keywords (e.g. farmer, scholarship, pension, housing)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600 text-sm"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Multi-Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-emerald-600 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">State / Central</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-emerald-600 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950"
            >
              {STATES.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Social Category</label>
            <select
              value={selectedCategorySocial}
              onChange={(e) => setSelectedCategorySocial(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-emerald-600 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950"
            >
              <option value="ANY">Any Category</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Occupation</label>
            <select
              value={selectedOccupation}
              onChange={(e) => setSelectedOccupation(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-emerald-600 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950"
            >
              <option value="ANY">Any Occupation</option>
              <option value="Farmer">Farmer</option>
              <option value="Student">Student</option>
              <option value="Homemaker">Homemaker</option>
              <option value="Daily Wage Worker">Daily Wage Worker</option>
              <option value="Self-Employed / Small Business">Self-Employed</option>
              <option value="Retired / Pensioner">Senior / Pensioner</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Max Income: ₹{(maxIncomeFilter / 100000).toFixed(1)} Lakh
            </label>
            <input
              type="range"
              min="100000"
              max="1000000"
              step="50000"
              value={maxIncomeFilter}
              onChange={(e) => setMaxIncomeFilter(Number(e.target.value))}
              className="w-full accent-emerald-600 mt-2"
            />
          </div>

        </div>

        {/* Filter Summary & Clear Option */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span>Showing <strong>{filteredSchemes.length}</strong> of {allSchemes.length} schemes</span>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

      </div>

      {/* Scheme Cards Grid */}
      {filteredSchemes.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
          <Search className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">No Schemes Found Matching Criteria</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs max-w-md mx-auto">
            Try adjusting your search terms or relaxing filter options like category or income limit.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                
                {/* Header Category & Dept */}
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                  <span className="bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                    {scheme.category}
                  </span>
                  {scheme.isMongoAtlas ? (
                    <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <Database className="w-3 h-3 text-purple-400" /> MongoDB Atlas
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {scheme.isCentral ? 'Central Scheme' : 'State Scheme'}
                    </span>
                  )}
                </div>

                {/* Scheme Name */}
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg leading-snug hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  {scheme.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {scheme.department}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {scheme.shortDescription}
                </p>

                {/* Key Benefits Highlight Box */}
                <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 p-3 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Main Benefits</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                    {scheme.mainBenefits}
                  </p>
                </div>

                {/* Eligibility Summary Pill */}
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Eligibility Summary</span>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] line-clamp-2">
                    {scheme.eligibilitySummary}
                  </p>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3 text-xs">
                <button
                  onClick={() => onSelectScheme(scheme)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  title="Visit Official Government Portal"
                >
                  <ExternalLink className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </a>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
