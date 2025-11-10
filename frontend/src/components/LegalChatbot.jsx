import React, { useState, useEffect } from 'react';
import { Search, Scale, BookOpen, AlertCircle, ChevronDown, X, Check, Loader } from 'lucide-react';

const API_URL = 'http://localhost:5000';

const LegalChatbot = () => {
  const [allKeywords, setAllKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/keywords`);
        if (!response.ok) {
          throw new Error('Failed to fetch keywords. Please make sure the backend server is running.');
        }
        const data = await response.json();
        setAllKeywords(data.keywords || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchKeywords();
  }, []);

  // Define a set of appealing colors for keywords
  const keywordColors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-indigo-500',
    'bg-yellow-500', 'bg-pink-500', 'bg-teal-500'
  ];

  const getKeywordColor = (keyword) => {
    const index = allKeywords.indexOf(keyword);
    return keywordColors[index % keywordColors.length];
  };

  const handleKeywordToggle = (keyword) => {
    setSelectedKeywords(prev =>
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const handleSearch = async () => {
    try {
      setError(null);
      setIsLoading(true);
      setShowResults(true);
      const response = await fetch(`${API_URL}/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keywords: selectedKeywords }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch search results.');
      }
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedKeywords([]);
    setSearchResults([]);
    setShowResults(false);
    setExpandedCategory(null);
    setError(null);
  };

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const groupedResults = searchResults.reduce((acc, rule) => {
    const category = rule.Category[0];
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(rule);
    return acc;
  }, {});

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 font-sans antialiased">
      {/* 
        BACKGROUND IMAGE:
        - Place your desired background image in the `public` folder.
        - Rename the image to `lady-justice.jpg` or update the URL below.
      */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/lady-justice.jpg')" }}
      ></div>
      
      <div className="relative z-10 container mx-auto p-4 md:p-8 lg:p-12 max-w-4xl">
        <header className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            <Scale className="inline-block h-12 w-12 md:h-16 md:w-16 text-blue-600 mr-3" />
            Legal Expert System
          </h1>
          <p className="text-xl text-gray-700 font-light">Your intelligent guide to Indian Penal Code (IPC) and Bharatiya Nyaya Sanhita (BNS) sections</p>
        </header>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-10 mb-8 border border-blue-200">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-5 flex items-center">
              <Search className="mr-4 text-blue-600" size={28} />
              Select Keywords to Begin
            </h2>
            {allKeywords.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {allKeywords.map(keyword => (
                  <button
                    key={keyword}
                    onClick={() => handleKeywordToggle(keyword)}
                    className={`
                      px-5 py-2 rounded-full text-base font-medium transition-all duration-300 ease-in-out
                      ${selectedKeywords.includes(keyword)
                        ? `${getKeywordColor(keyword)} text-white shadow-lg transform scale-105`
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
                      }
                      flex items-center
                    `}
                  >
                    {selectedKeywords.includes(keyword) && <Check size={18} className="inline mr-2" />}
                    {keyword}
                  </button>
                ))}
              </div>
            ) : (
              <p>Loading keywords...</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleSearch}
              disabled={selectedKeywords.length === 0 || isLoading}
              className="
                bg-blue-600 text-white px-10 py-4 rounded-lg font-bold text-xl shadow-lg
                hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105
                disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
                flex items-center justify-center
              "
            >
              {isLoading ? <Loader className="animate-spin mr-3" size={24} /> : <Search className="mr-3" size={24} />}
              {isLoading ? 'Searching...' : 'Search Legal Sections'}
            </button>
            <button
              onClick={handleReset}
              className="
                bg-gray-500 text-white px-10 py-4 rounded-lg font-bold text-xl shadow-lg
                hover:bg-gray-600 transition-all duration-300 ease-in-out transform hover:scale-105
                flex items-center justify-center
              "
            >
              <X className="mr-3" size={24} /> Reset Keywords
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-10 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {showResults && !isLoading && !error && (
          <div className="mt-10 bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-10 border border-green-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <BookOpen className="mr-4 text-green-600" size={28} />
              Search Results
            </h2>
            {Object.keys(groupedResults).length > 0 ? (
              <div className="space-y-5">
                {Object.entries(groupedResults).map(([category, rules]) => (
                  <div key={category} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <button
                      onClick={() => toggleCategory(category)}
                      className={`
                        w-full flex justify-between items-center p-5 bg-gray-50 hover:bg-gray-100 focus:outline-none
                        transition-all duration-300 ease-in-out
                        ${expandedCategory === category ? 'bg-blue-100 text-blue-800' : 'text-gray-800'}
                      `}
                    >
                      <h3 className="text-xl font-semibold">{category} ({rules.length})</h3>
                      <ChevronDown
                        className={`transform transition-transform duration-300 ${
                          expandedCategory === category ? 'rotate-180 text-blue-600' : 'text-gray-500'
                        }`}
                        size={24}
                      />
                    </button>
                    {expandedCategory === category && (
                      <div className="p-5 border-t border-gray-200 bg-white">
                        {rules.map((rule, index) => (
                          <div key={index} className="mb-4 p-4 bg-blue-50 rounded-md border-l-4 border-blue-400 shadow-sm last:mb-0">
                            <p className="font-bold text-lg text-gray-900 mb-1">{rule.Description}</p>
                            <div className="flex flex-wrap items-center text-gray-700 text-sm">
                              <Scale className="mr-2 text-red-600" size={18} />
                              <span className="font-semibold mr-1">IPC:</span> {rule.IPC}
                              <span className="mx-3 text-gray-400">|</span>
                              <span className="font-semibold mr-1">BNS:</span> {rule.BNS}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50/80 backdrop-blur-sm rounded-lg border border-gray-200">
                <AlertCircle className="mx-auto text-yellow-500 h-16 w-16 mb-6" />
                <p className="text-2xl font-semibold text-gray-700 mb-2">No matching legal sections found.</p>
                <p className="text-lg text-gray-500">Try selecting a different combination of keywords or fewer keywords.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalChatbot;