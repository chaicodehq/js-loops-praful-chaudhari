/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
    // Your code here
    if (!Array.isArray(matches) || matches.length === 0) return [];

    const accumulator = {};

    matches.forEach((match) => {
        const { team1, team2, result, winner } = match;

        let team1Point, team2Point;

        if (result === "tie" || result === "no_result") {
            team1Point = 1;
            team2Point = 1;
        } else {
            if (winner === team1) {
                team1Point = 2;
                team2Point = 0;
            } else {
                team1Point = 0;
                team2Point = 2;
            }
        }

        if (accumulator.hasOwnProperty(team1)) {
            accumulator[team1].played++;
            if (team1Point === 2) {
                accumulator[team1].won++;
            } else if (team1Point === 1 && result === "tie") {
                accumulator[team1].tied++;
            } else if (team1Point === 1 && result === "no_result") {
                accumulator[team1].noResult++;
            } else {
                accumulator[team1].lost++;
            }
            accumulator[team1].points += team1Point;
        } else {
            const won = result === "win" && winner === team1 ? 1 : 0;
            const lost = result === "win" && winner !== team1 ? 1 : 0;
            const tied = team1Point === 1 && result === "tie" ? 1 : 0;
            const noResult = team1Point === 1 && result === "no_result" ? 1 : 0;
            accumulator[team1] = {
                played: 1,
                won,
                lost,
                tied,
                noResult,
                points: team1Point,
            };
        }

        if (accumulator.hasOwnProperty(team2)) {
            accumulator[team2].played++;
            if (team2Point === 2) {
                accumulator[team2].won++;
            } else if (team2Point === 1 && result === "tie") {
                accumulator[team2].tied++;
            } else if (team2Point === 1 && result === "no_result") {
                accumulator[team2].noResult++;
            } else {
                accumulator[team2].lost++;
            }
            accumulator[team2].points += team2Point;
        } else {
            const won = result === "win" && winner === team2 ? 1 : 0;
            const lost = result === "win" && winner !== team2 ? 1 : 0;
            const tied = team2Point === 1 && result === "tie" ? 1 : 0;
            const noResult = team2Point === 1 && result === "no_result" ? 1 : 0;
            accumulator[team2] = {
                played: 1,
                won,
                lost,
                tied,
                noResult,
                points: team2Point,
            };
        }
    });

    const accArray = Object.entries(accumulator)
        .map((team) => {
            const [teamName, stats] = team;

            return {
                ...stats,
                team: teamName,
            };
        })
        .sort((a, b) => {
            if (a.points !== b.points) {
                return b.points - a.points;
            }
            return a.team.localeCompare(b.team);
        });

    return accArray;
}
