import { createFraction, createTerm } from '$slangpkg/slang-basic.js';

export {
  createTerm,
  createFraction,
  differentiateFraction,
  evaluateFraction,
  evaluatePolynomial,
  numericalIntegrateFraction,
  simplifyFraction
} from '$slangpkg/slang-basic.js';

export { latexToSlang, slangToLatex } from '$slangpkg/slang-convertor.js';

export {
  createFunction,
  evaluateFunction,
  extendedSlangToLatex,
  findCriticalPoints,
  gradient,
  hessian,
  tangentPlane
} from '$slangpkg/slang-extended.js';

export {
  parseExpr,
  symDiff,
  symEval,
  symIntegrate,
  symSimplify,
  symToLatex
} from '$slangpkg/slang-symbolic.js';

export { det, solve, trace } from '$slangpkg/slang-linalg.js';
export { rk4 } from '$slangpkg/slang-ode.js';

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
