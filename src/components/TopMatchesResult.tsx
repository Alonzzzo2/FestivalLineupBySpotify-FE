import { FestivalMatchResponse } from '../types';
import ScoreCard from './ScoreCard';

interface TopMatchesResultProps {
    matches: FestivalMatchResponse[];
    onReset: () => void;
    year: number;
}

export default function TopMatchesResult({ matches, onReset, year }: TopMatchesResultProps) {
    // Display only top 10
    const topTen = matches.slice(0, 10);

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

            <div className="space-y-6 mb-6">
                {topTen.map((festival, index) => (
                    <div key={festival.festival.id} className="relative">
                        {/* Rank Badge */}
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
