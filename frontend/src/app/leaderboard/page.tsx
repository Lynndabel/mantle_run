'use client';
import { useGeneralLeaderboard } from '@/hooks/useMantleRunner';
import Link from 'next/link';

export default function LeaderboardPage() {
  const { leaderboard, isLoading } = useGeneralLeaderboard(20);

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-6 bg-gradient-to-b from-purple-900 via-blue-900 to-black">
      <div className="max-w-5xl mx-auto">
        <div 
          className="nes-container with-title is-centered pixel-art" 
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
        >
          <p className="title pixel-font text-primary text-base sm:text-lg md:text-xl">
            LEADERBOARD
          </p>
          
          <div className="text-center mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-gray-700">
              Top players across all stages
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-8 sm:py-12">
              <div className="inline-block animate-bounce mb-3">🎮</div>
              <p className="text-sm sm:text-base text-gray-700">Loading leaderboard...</p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-4xl sm:text-5xl mb-3">🏆</div>
              <p className="text-sm sm:text-base text-gray-700 font-semibold mb-2">
                No games played yet. Be the first!
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Complete a stage to appear on the leaderboard
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-2 sm:px-0">
                <table className="nes-table is-bordered w-full text-xs sm:text-sm">
                  <thead>
                    <tr>
                      <th className="px-2 py-2 sm:px-3 sm:py-2">Rank</th>
                      <th className="px-2 py-2 sm:px-3 sm:py-2">Player</th>
                      <th className="px-2 py-2 sm:px-3 sm:py-2 hidden sm:table-cell">Stage</th>
                      <th className="px-2 py-2 sm:px-3 sm:py-2">Score</th>
                      <th className="px-2 py-2 sm:px-3 sm:py-2 hidden md:table-cell">Coins</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry) => (
                      <tr 
                        key={`${entry.player}-${entry.timestamp}`}
                        className="hover:bg-yellow-50 transition-colors"
                      >
                        <td className="text-center px-2 py-2 sm:px-3 sm:py-2">
                          <span className="text-base sm:text-lg">
                            {entry.rank === 1 && '🥇'}
                            {entry.rank === 2 && '🥈'}
                            {entry.rank === 3 && '🥉'}
                            {entry.rank > 3 && entry.rank}
                          </span>
                        </td>
                        <td className="px-2 py-2 sm:px-3 sm:py-2">
                          <span className="font-mono text-xs sm:text-sm break-all">
                            <span className="hidden sm:inline">
                              {entry.player.slice(0, 6)}...{entry.player.slice(-4)}
                            </span>
                            <span className="sm:hidden">
                              {entry.player.slice(0, 4)}...{entry.player.slice(-3)}
                            </span>
                          </span>
                        </td>
                        <td className="text-center px-2 py-2 sm:px-3 sm:py-2 hidden sm:table-cell">
                          <span className="inline-flex items-center justify-center px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-semibold">
                            {entry.stage}
                          </span>
                        </td>
                        <td className="text-center px-2 py-2 sm:px-3 sm:py-2">
                          <span className="font-bold text-sm sm:text-base">
                            {entry.score.toLocaleString()}
                          </span>
                          {/* Show stage on mobile in score column */}
                          <span className="sm:hidden block text-xs text-gray-500 mt-0.5">
                            Stage {entry.stage}
                          </span>
                        </td>
                        <td className="text-center px-2 py-2 sm:px-3 sm:py-2 hidden md:table-cell">
                          <span className="inline-flex items-center gap-1">
                            <span>🪙</span>
                            <span>{entry.coinsCollected}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Summary stats on mobile */}
          {!isLoading && leaderboard.length > 0 && (
            <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:hidden">
              <div className="text-center p-2 bg-gray-100 rounded">
                <p className="text-xs text-gray-600">Total Players</p>
                <p className="text-lg font-bold">{leaderboard.length}</p>
              </div>
              <div className="text-center p-2 bg-gray-100 rounded">
                <p className="text-xs text-gray-600">High Score</p>
                <p className="text-lg font-bold">
                  {Math.max(...leaderboard.map(e => e.score)).toLocaleString()}
                </p>
              </div>
            </div>
          )}

          <div className="mt-4 sm:mt-6 text-center">
            <Link href="/">
              <button className="nes-btn is-primary text-xs sm:text-sm px-4 py-2">
                ← Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
