import { useState, useMemo, useEffect } from 'react';
import { useState, useEffect } from 'react';
import { FestivalMatchResponse } from '../types';
import ScoreCard from './ScoreCard';
import { SORT_PREFERENCES, SORT_LABELS, SortPreference } from '../constants';
import { getSortPreferenceFromCookie, setSortPreferenceCookie } from '../utils/cookieUtils';

interface TopMatchesResultProps {
    onReset: () => void;
    year: number;
    mode: 'liked' | 'playlist';
}

type SortOption = 'rank' | 'tracks' | 'artists';

// Constants
const SORT_PREFERENCE_KEY_PREFIX = 'festivalMatcher_sortPreference_';
const VALID_SORT_OPTIONS: SortOption[] = ['rank', 'tracks', 'artists'];

// Helper function to get localStorage key based on mode
const getSortPreferenceKey = (mode: 'liked' | 'playlist') => {
    return `${SORT_PREFERENCE_KEY_PREFIX}${mode}`;
};

// Helper function to load sort preference from localStorage
const loadSortPreference = (mode: 'liked' | 'playlist'): SortOption => {
    try {
        const key = getSortPreferenceKey(mode);
        const saved = localStorage.getItem(key);
        if (saved && VALID_SORT_OPTIONS.includes(saved as SortOption)) {
            return saved as SortOption;
        }
    } catch (error) {
        // If localStorage is not available or fails, return default
        console.warn('Failed to load sort preference from localStorage:', error);
    }
    return 'rank';
};

// Helper function to save sort preference to localStorage
const saveSortPreference = (mode: 'liked' | 'playlist', sortBy: SortOption) => {
    try {
        const key = getSortPreferenceKey(mode);
        localStorage.setItem(key, sortBy);
    } catch (error) {
        // If localStorage is not available or fails, silently fail
        console.warn('Failed to save sort preference to localStorage:', error);
    }
};
mode: 'liked' | 'playlist';
playlistUrl ?: string;
}

export default function TopMatchesResult({ onReset, year, mode, playlistUrl }: TopMatchesResultProps) {
    const [matches, setMatches] = useState<FestivalMatchResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initialize sort preference from cookie
    const [sortPreference, setSortPreference] = useState<SortPreference>(
        () => getSortPreferenceFromCookie() || SORT_PREFERENCES.RANKING
    );

    // Raw data from API (unsorted)
    const [rawMatches, setRawMatches] = useState<FestivalMatchResponse[]>([]);


    // Fetch data once on mount or when parameters change
    useEffect(() => {
        const abortController = new AbortController();

        const fetchWithAbort = async () => {
            setLoading(true);
            setError(null);

            try {
                let url = '';
                let fetchOptions: RequestInit = { credentials: 'include', signal: abortController.signal };

                if (mode === 'liked') {
                    url = `${import.meta.env.VITE_API_BASE_URL}/festivalmatching/by-year/${year}`;
                } else {
                    const params = new URLSearchParams({ playlistUrl: playlistUrl || '' });
                    url = `${import.meta.env.VITE_API_BASE_URL}/festivalmatching/by-year/${year}/playlist?${params}`;
                }

                const res = await fetch(url, fetchOptions);

                if (!res.ok) {
                    throw new Error('Failed to fetch festival matches');
                }

                const data = await res.json();

                if (Array.isArray(data)) {
                    setRawMatches(data);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err) {
                // Ignore abort errors
                if (err instanceof Error && err.name === 'AbortError') {
                    return;
                }

                const message =
                    err instanceof Error
                        ? err.message
                        : 'Error fetching festival matches. Please try again.';
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchWithAbort();

        // Cleanup: abort the request if component unmounts or dependencies change
        return () => {
            abortController.abort();
        };
    }, [year, mode, playlistUrl]);

    // Sort data client-side whenever sort preference changes
    useEffect(() => {
        if (rawMatches.length === 0) {
            setMatches([]);
            return;
        }

        const sorted = [...rawMatches];

        if (sortPreference === SORT_PREFERENCES.MATCHED_ARTISTS) {
            sorted.sort((a, b) => b.matchedArtistsCount - a.matchedArtistsCount);
        } else if (sortPreference === SORT_PREFERENCES.MATCHED_TRACKS) {
            sorted.sort((a, b) => b.matchedTracksCount - a.matchedTracksCount);
        } else {
            // Default to Ranking (tracksPerShow)
            sorted.sort((a, b) => b.tracksPerShow - a.tracksPerShow);
        }

        setMatches(sorted);
    }, [rawMatches, sortPreference]);

    const handleSortChange = (newSort: SortPreference) => {
        setSortPreference(newSort);
        setSortPreferenceCookie(newSort);
    };

    // Display only top 10
    const topTen = sortedMatches.slice(0, 10);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-white mb-2">
                    Top Festivals for {year}
                </h2>
                <p className="text-gray-400">
                    Showing top {topTen.length} matches based on your music taste
                </p>
            </div>

            {/* Sorting Controls */}
            <div className="mb-6 bg-gray-800 p-4 rounded-lg">
                <label htmlFor="sort-select" className="block text-gray-300 mb-2 font-semibold">
                    Sort by:
                </label>
                <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-green-500"
                >
                    <option value="rank">🏆 Rank (Default)</option>
                    <option value="tracks">🎵 Number of Liked Songs</option>
                    <option value="artists">👥 Number of Liked Artists</option>
                </select>
            </div>

            {/* Sort Options */}
            <div className="mb-6 flex flex-wrap justify-center gap-3">
                {Object.values(SORT_PREFERENCES).map((sortOption) => (
                    <button
                        key={sortOption}
                        onClick={() => handleSortChange(sortOption)}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${sortPreference === sortOption
                            ? 'bg-green-500 text-white shadow-lg scale-105'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                            }`}
                        aria-label={`Sort by ${SORT_LABELS[sortOption]}`}
                        aria-pressed={sortPreference === sortOption}
                    >
                        {SORT_LABELS[sortOption]}
                    </button>
                ))}
            </div>

            {loading && (
                <div className="text-center text-white mb-6">
                    <p>Loading festivals...</p>
                </div>
            )}

            {error && (
                <div className="mb-6 p-3 bg-red-900 text-red-200 rounded">
                    {error}
                </div>
            )}

            <div className="space-y-6 mb-6">
                {topTen.map((festival, index) => (
                    <div key={festival.festival.id} className="relative">
                        {/* Rank Badge - Shows current sort position */}
                        <div className="absolute -left-4 top-4 z-10">
                            <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                                #{index + 1}
                            </div>
                        </div>

                        {/* Festival Card with left margin for rank badge */}
                        <div className="ml-6">
                            <ScoreCard
                                festival={festival}
                                onVisitClashFinder={() => window.open(festival.url, '_blank')}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={onReset}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded transition duration-200"
            >
                ← Try Another Year
            </button>
        </div>
    );
}
