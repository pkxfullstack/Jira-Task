import { useState } from "react";

interface toggleProps {
	initialValue?: boolean;
}

const useToogle = ({ initialValue = false }: toggleProps = {}) => {
	const [value, setValue] = useState(initialValue);
	const toggle = () => {
		setValue(!value);
	};

	return { value, toggle };
};

export default useToogle;

// function solution(S) {
//   const memo = new Map();

//   function solve(s) {
//     if (memo.has(s)) return memo.get(s);

//     let best = s;

//     for (let i = 0; i < s.length; i++) {
//       for (let j = i + 1; j < s.length; j++) {
//         if (s[i] === s[j]) {
//           const next = s.slice(0, i) + s.slice(i + 1, j) + s.slice(j + 1);
//           const candidate = solve(next);

//           if (
//             candidate.length < best.length ||
//             (candidate.length === best.length && candidate < best)
//           ) {
//             best = candidate;
//           }
//         }
//       }
//     }

//     memo.set(s, best);
//     return best;
//   }

//   return solve(S);
// }
