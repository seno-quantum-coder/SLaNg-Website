import { createFraction, createTerm } from '../../../slang-basic.js';

export {
  createTerm,
  createFraction,
  differentiateFraction,
  evaluateFraction,
  evaluatePolynomial,
  numericalIntegrateFraction,
  simplifyFraction
} from '../../../slang-basic.js';

export { latexToSlang, slangToLatex } from '../../../slang-convertor.js';

export {
  createFunction,
  evaluateFunction,
  extendedSlangToLatex,
  findCriticalPoints,
  gradient,
  hessian,
  tangentPlane
} from '../../../slang-extended.js';

export {
  parseExpr,
  symDiff,
  symEval,
  symIntegrate,
  symSimplify,
  symToLatex
} from '../../../slang-symbolic.js';

export { det, solve, trace } from '../../../slang-linalg.js';
export { rk4 } from '../../../slang-ode.js';

export function polynomial(coeffs, variable = 'x') {
  const terms = [];
  const degree = coeffs.length - 1;

  for (let i = 0; i < coeffs.length; i += 1) {
    const coeff = coeffs[i];
    const power = degree - i;

    if (coeff === 0) continue;

    terms.push(power === 0 ? createTerm(coeff) : createTerm(coeff, { [variable]: power }));
  }

  return [[createFraction(terms, 1)]];
}
