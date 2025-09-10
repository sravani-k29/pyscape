import React from 'react';

const DuelLeaderboard = () => {
  const leaderboardData = [
    { rank: 1, username: '@code_ninja', wins: 142, losses: 57, points: 2450 },
    { rank: 2, username: '@algo_queen', wins: 131, losses: 62, points: 2310 },
    { rank: 3, username: '@py_master', wins: 118, losses: 58, points: 2100 },
    { rank: 4, username: '@data_wiz', wins: 102, losses: 63, points: 1950 },
    { rank: 5, username: '@tech_guru', wins: 96, losses: 45, points: 1820 },
    { rank: 6, username: '@coding_beast', wins: 88, losses: 52, points: 1740 },
    { rank: 7, username: '@dev_star', wins: 82, losses: 48, points: 1680 },
    { rank: 8, username: '@machine_learner', wins: 75, losses: 43, points: 1590 },
    { rank: 9, username: '@js_expert', wins: 70, losses: 40, points: 1520 },
    { rank: 10, username: '@algorithm_ace', wins: 65, losses: 38, points: 1480 }
  ];

  return (
    <div className="card">
      <div className="p-4 border-b border-dark-lightest">
        <h2 className="text-xl font-semibold">Global Leaderboard</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left bg-dark-lighter">
              <th className="p-4 font-medium">Rank</th>
              <th className="p-4 font-medium">User</th>
              <th className="p-4 font-medium text-center">W/L</th>
              <th className="p-4 font-medium text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-lightest">
            {leaderboardData.map(player => (
              <tr key={player.rank} className="hover:bg-dark-lightest transition-colors">
                <td className="p-4">
                  <div className="flex items-center">
                    {player.rank <= 3 ? (
                      <span className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${
                        player.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' : 
                        player.rank === 2 ? 'bg-gray-400/20 text-gray-300' : 
                        'bg-amber-700/20 text-amber-600'
                      }`}>
                        {player.rank}
                      </span>
                    ) : (
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-dark-lighter mr-2">
                        {player.rank}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4 font-medium">{player.username}</td>
                <td className="p-4 text-center">
                  <span className="text-green-400">{player.wins}</span>
                  <span className="text-gray-500">/</span>
                  <span className="text-red-400">{player.losses}</span>
                </td>
                <td className="p-4 text-right font-mono font-medium text-primary-light">{player.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DuelLeaderboard;
