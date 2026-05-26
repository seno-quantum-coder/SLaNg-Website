# SLaNg — Saad's Language of Arithmetic Numerics and Geometry

SLaNg is a modular calculus and algebra library for JavaScript, designed to power the [CalculusSolver](../calculussolver) ML project under [QuantumLogicsLabs](https://github.com/QuantumLogicsLabs). It provides symbolic expression trees, differentiation, integration, multivariable calculus, linear algebra, statistics, ODEs, and bidirectional LaTeX conversion — all without external runtime dependencies.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Module Reference](#module-reference)
- [Examples](#examples)
- [LaTeX Converter](#latex-converter)
- [Tips & Best Practices](#tips--best-practices)
- [Running Tests](#running-tests)
- [License](#license)

---

## Features

- **Symbolic expressions** — create, evaluate, simplify polynomial and rational expressions
- **Single-variable calculus** — differentiation (product/quotient/chain rules), definite/indefinite integration, limits, Taylor series, critical points, second-derivative test
- **Multivariable calculus** — partial derivatives, gradients, directional derivatives, double and triple integrals (2D/3D Gauss-Legendre quadrature)
- **Geometry** — arc length, surface area of revolution, volume of revolution
- **Complex numbers** — full arithmetic on the complex plane
- **Linear algebra** — vectors, matrices, dot/cross products, determinants, inverses, eigenvalues
- **ODEs** — Euler and Runge-Kutta (RK4) solvers for ordinary differential equations
- **Statistics** — descriptive stats, probability distributions, regression
- **Caching** — memoized evaluation for repeated computations
- **LaTeX converter** — bidirectional SLaNg ↔ LaTeX with batch processing, validation, and display-mode formatting
- **Preprocessor** — expression string parsing/tokenization into symbolic ASTs

---

## Project Structure

```
slang/
├── slang-basic.js          # Core types: createTerm, createFraction, evaluate, differentiate
├── slang-advanced.js       # Taylor series, limits, critical points, second-derivative test
├── slang-complex.js        # Complex number arithmetic
├── slang-convertor.js      # Bidirectional SLaNg ↔ LaTeX conversion
├── slang-errors.js         # Custom error types
├── slang-extended.js       # Arc length, surface area, volume, double/triple integrals
├── slang-helpers.js        # Convenience constructors: polynomial(), monomial(), sum()
├── slang-linalg.js         # Linear algebra (vectors, matrices, eigen)
├── slang-math.js           # Core math utilities
├── slang-ode.js            # ODE solvers (Euler, RK4)
├── slang-preprocessor.js   # String tokenizer and expression parser
├── slang-stats.js          # Statistics and probability distributions
├── slang-symbolic.js       # Symbolic diff/eval engine (symDiff, symEval, symSimplify)
├── slang-cache.js          # Memoization layer
├── main.js                 # Entry point / re-exports
├── predict.py              # Python inference bridge (CalculusSolver ML model)
├── package.json
├── experiments/            # Runnable demos and usage guides
│   ├── complete-guide.js
│   ├── advanced-examples.js
│   ├── converter-demo.js
│   └── ...
└── tests/
    └── unit/
        └── converter.test.js
```

---

## Installation

```bash
# Clone the repo (or use as a submodule inside CalculusSolver)
git clone https://github.com/QuantumLogicsLabs/calculussolver.git
cd calculussolver/slang

npm install
```

SLaNg uses ES module syntax (`import`/`export`). Make sure your project has `"type": "module"` in `package.json`, or use a bundler.

---

## Quick Start

```js
import {
  createTerm,
  createFraction,
  evaluateFraction,
  differentiateFraction,
} from "./slang-basic.js";
import { polynomial } from "./slang-helpers.js";

// Build f(x) = x² - 4x + 4
const f = polynomial([1, -4, 4], "x");

// Evaluate at x = 2  →  0  (it's (x-2)²)
console.log(evaluateEquation(f, { x: 2 }));

// Differentiate: f'(x) = 2x - 4
const fPrime = differentiateFraction(f[0][0], "x");

// Evaluate f'(2) = 0  (critical point)
console.log(evaluateEquation([[fPrime]], { x: 2 }));
```

---

## Module Reference

### `slang-basic.js`

The foundation of the library.

| Export                                               | Description                                                     |
| ---------------------------------------------------- | --------------------------------------------------------------- |
| `createTerm(coeff, vars?)`                           | Creates a monomial term, e.g. `createTerm(3, { x: 2 })` → `3x²` |
| `createFraction(numer, denom)`                       | Creates a rational expression                                   |
| `evaluateFraction(expr, vars)`                       | Numerically evaluates an expression at given variable values    |
| `differentiateFraction(expr, variable)`              | Returns the derivative with respect to `variable`               |
| `numericalIntegrateFraction(expr, a, b, var, steps)` | Numerical integration                                           |
| `simplifyFraction(expr)`                             | Combines like terms                                             |
| `fractionToString(expr)`                             | Human-readable string representation                            |

### `slang-helpers.js`

Higher-level constructors to avoid verbose manual creation.

```js
polynomial([1, -4, 4], "x"); // x² - 4x + 4
monomial(3, { x: 2, y: 1 }); // 3x²y
sum([
  [1, { x: 2 }],
  [2, { y: 1 }],
]); // x² + 2y
```

### `slang-advanced.js`

| Export                                        | Description                         |
| --------------------------------------------- | ----------------------------------- |
| `taylorSeries(expr, var, center, order)`      | Taylor series expansion             |
| `computeLimit(expr, var, point)`              | Evaluates limits                    |
| `findCriticalPoints(expr, var, range, steps)` | Locates critical points numerically |
| `secondDerivativeTest(expr, var, point)`      | Classifies a critical point         |

### `slang-extended.js`

| Export                                                 | Description                             |
| ------------------------------------------------------ | --------------------------------------- |
| `arcLength(expr, var, a, b)`                           | Arc length of y = f(x) from a to b      |
| `surfaceAreaOfRevolution(expr, var, a, b)`             | Surface area rotating about x-axis      |
| `volumeOfRevolution(expr, var, a, b)`                  | Volume by disk method                   |
| `doubleIntegral(expr, xVar, yVar, ax, bx, ay, by, n?)` | 2D Gauss-Legendre integration           |
| `tripleIntegral(expr, xVar, yVar, zVar, ...)`          | 3D integration; bounds may be functions |

All geometric integrals use 32-point Gauss-Legendre quadrature for high accuracy.

### `slang-symbolic.js`

String-based symbolic engine used internally and by `slang-preprocessor.js`.

| Export                    | Description                                                                                                     |
| ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `symDiff(expr, variable)` | Symbolic differentiation of an AST node                                                                         |
| `symEval(expr, vars)`     | Evaluate a symbolic expression                                                                                  |
| `symSimplify(expr)`       | Algebraic simplification                                                                                        |
| Supported functions       | `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `sinh`, `cosh`, `tanh`, `exp`, `ln`, `log`, `sqrt`, `abs`, `log10` |

### `slang-convertor.js`

| Export                              | Description                                   |
| ----------------------------------- | --------------------------------------------- |
| `slangToLatex(expr, options?)`      | Converts a SLaNg expression to a LaTeX string |
| `latexToSlang(latex)`               | Parses a LaTeX string into a SLaNg expression |
| `batchConvertToLatex(exprs)`        | Batch SLaNg → LaTeX                           |
| `batchConvertToSlang(latexStrings)` | Batch LaTeX → SLaNg                           |
| `validateLatex(latex)`              | Returns `{ valid: boolean, error? }`          |
| `formatDisplayMode(latex)`          | Wraps in `\[ ... \]` display-mode delimiters  |

Options for `slangToLatex`: `parentheses: true`, `multiplySymbol: '\\cdot'`.

---

## Examples

### Optimization — Minimize Average Cost

```js
// AC(x) = (x² + 100x + 1000) / x
const AC = createFraction(
  [createTerm(1, { x: 2 }), createTerm(100, { x: 1 }), createTerm(1000)],
  [createTerm(1, { x: 1 })],
);
const AC_prime = differentiateFraction(AC, "x");

// Evaluate AC'(x) to find where it equals zero
for (let x of [10, 20, 30, 40, 50]) {
  console.log(`x=${x}: AC'=${evaluateFraction(AC_prime, { x }).toFixed(4)}`);
}
```

### Physics — Electric Field from Potential

```js
// V(r) = kQ/r,  E = -dV/dr
const V = createFraction([createTerm(9000)], [createTerm(1, { r: 1 })]);
const dV_dr = differentiateFraction(V, "r");
const E_at_1m = -evaluateFraction(dV_dr, { r: 1 });
```

### Multivariable — Gradient

```js
import { partialDerivative, gradient } from "./slang-helpers.js";

// f(x,y) = x²y + 2xy² - x + y
const f = sum([
  [1, { x: 2, y: 1 }],
  [2, { x: 1, y: 2 }],
  [-1, { x: 1 }],
  [1, { y: 1 }],
]);
const grad = gradient(f[0][0], ["x", "y"]);
```

### Enzyme Kinetics (Michaelis-Menten)

```js
// v([S]) = (Vmax·[S]) / (Km + [S])
const v = createFraction(
  [createTerm(100, { S: 1 })],
  [createTerm(0.5), createTerm(1, { S: 1 })],
);
const dv_dS = differentiateFraction(v, "S");
```

### Double Integral

```js
import { doubleIntegral } from "./slang-extended.js";
import { symVar, symMul } from "./slang-symbolic.js";

// ∫₀² ∫₀³ xy dy dx  =  9
const xy = symMul(symVar("x"), symVar("y"));
const result = doubleIntegral(xy, "x", "y", 0, 2, 0, 3);
```

---

## LaTeX Converter

SLaNg supports round-trip conversion between internal expressions and LaTeX:

```js
import {
  slangToLatex,
  latexToSlang,
  validateLatex,
} from "./slang-convertor.js";

// SLaNg → LaTeX
const latex = slangToLatex(
  createFraction(
    [createTerm(1, { x: 1 })],
    [createTerm(1, { x: 1 }), createTerm(1)],
  ),
);
// → \frac{x}{x+1}

// LaTeX → SLaNg
const expr = latexToSlang("\\frac{x^{2}-1}{x^{2}+1}");

// Validate
const { valid, error } = validateLatex("\\frac{x}{");
// → { valid: false, error: '...' }
```

Supported LaTeX input: polynomials (`x^{2} + 2x + 1`), fractions (`\frac{...}{...}`), multivariable expressions, signed terms.

---

## Tips & Best Practices

1. **Use helpers** — `polynomial([1,-2,1], 'x')` is far cleaner than manual `createTerm` chains.
2. **Simplify after operations** — call `simplifyFraction()` to collect like terms after differentiation or multiplication.
3. **Integration order matters** — for double integrals, `∫∫ f dy dx` and `∫∫ f dx dy` are different when bounds depend on outer variables.
4. **Increase quadrature points for precision** — the `n` parameter on `doubleIntegral`/`tripleIntegral` defaults to 16/8; increase for more accuracy.
5. **Use `verifyIntegration()`** to sanity-check that `d/dx[∫f] = f`.
6. **Build complex expressions incrementally** — compose smaller parts before combining into large fractions.
7. **Numerical methods are approximations** — arc length and surface area use numerical quadrature; `numSteps` or `n` controls accuracy.

---

## Running Tests

```bash
npm test
```

Unit tests live in `tests/unit/converter.test.js`. Experiment scripts in `experiments/` are runnable directly:

```bash
node experiments/complete-guide.js
node experiments/advanced-examples.js
node experiments/converter-demo.js
```

---

## License

Part of the [QuantumLogicsLabs / CalculusSolver](https://github.com/QuantumLogicsLabs) project.
See root `LICENSE` for terms.
