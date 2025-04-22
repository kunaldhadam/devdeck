/**
 * Generates an optimal regular expression from a set of input strings
 * @param {string[]} inputStrings - Array of input strings to analyze
 * @returns {Object} - Object containing the regex, processing steps, and input values
 */
export const generateRegex = (inputStrings) => {
  if (!inputStrings || inputStrings.length < 2) {
    throw new Error("At least two input strings are required");
  }

  // Trim whitespace from input strings
  const cleanedStrings = inputStrings.map(str => str.trim());
  const processingSteps = [];
  
  // Find common prefix
  const commonPrefix = findCommonPrefix(cleanedStrings);
  if (commonPrefix) {
    processingSteps.push(`Found common prefix: "${commonPrefix}"`);
  }

  // Find common suffix
  const commonSuffix = findCommonSuffix(cleanedStrings);
  if (commonSuffix) {
    processingSteps.push(`Found common suffix: "${commonSuffix}"`);
  }

  // Remove common prefix and suffix for pattern analysis
  const patterns = cleanedStrings.map(str => {
    let pattern = str;
    if (commonPrefix) pattern = pattern.substring(commonPrefix.length);
    if (commonSuffix) pattern = pattern.substring(0, pattern.length - commonSuffix.length);
    return pattern;
  });

  // Analyze middle patterns
  const patternInfo = analyzePatterns(patterns);
  processingSteps.push(...patternInfo.steps);

  // Build the final regex
  let regexStr = "^";
  if (commonPrefix) regexStr += escapeRegExp(commonPrefix);
  regexStr += patternInfo.pattern;
  if (commonSuffix) regexStr += escapeRegExp(commonSuffix);
  regexStr += "$";

  // Create the final RegExp object
  const regex = new RegExp(regexStr);
  
  // Add optimization info
  if (patternInfo.optimization) {
    processingSteps.push(`Optimized to use ${patternInfo.optimization}`);
  }

  return {
    regex,
    processingSteps,
    inputValues: cleanedStrings
  };
};

/**
 * Finds the common prefix among all input strings
 * @param {string[]} strings - Array of strings to analyze
 * @returns {string} - The common prefix
 */
function findCommonPrefix(strings) {
  if (!strings.length) return '';
  let prefix = strings[0];
  
  for (let i = 1; i < strings.length; i++) {
    while (strings[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (!prefix) return '';
    }
  }
  
  return prefix;
}

/**
 * Finds the common suffix among all input strings
 * @param {string[]} strings - Array of strings to analyze
 * @returns {string} - The common suffix
 */
function findCommonSuffix(strings) {
  if (!strings.length) return '';
  
  let suffix = strings[0];
  
  for (let i = 1; i < strings.length; i++) {
    const current = strings[i];
    let j = 0;
    
    while (
      j < suffix.length && 
      j < current.length && 
      suffix[suffix.length - 1 - j] === current[current.length - 1 - j]
    ) {
      j++;
    }
    
    suffix = suffix.substring(suffix.length - j);
    if (!suffix) return '';
  }
  
  return suffix;
}

/**
 * Escapes special regex characters in a string
 * @param {string} string - String to escape
 * @returns {string} - Escaped string
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Analyzes patterns and attempts to find an optimal regex
 * @param {string[]} patterns - Array of patterns to analyze
 * @returns {Object} - Object containing the pattern and steps
 */
function analyzePatterns(patterns) {
  // If all patterns are empty, just return an empty string
  if (patterns.every(p => p === '')) {
    return { pattern: '', steps: [], optimization: null };
  }

  // Check if all patterns are numbers with consistent length
  const allNumbers = patterns.every(p => /^\d+$/.test(p));
  if (allNumbers) {
    const lengths = new Set(patterns.map(p => p.length));
    
    if (lengths.size === 1) {
      const length = patterns[0].length;
      return {
        pattern: `\\d{${length}}`,
        steps: [
          "Detected numeric pattern",
          `All numeric patterns are exactly ${length} digits`
        ],
        optimization: `quantifier: \\d{${length}}`
      };
    } else {
      const minLength = Math.min(...patterns.map(p => p.length));
      const maxLength = Math.max(...patterns.map(p => p.length));
      
      if (maxLength - minLength === 1) {
        return {
          pattern: `\\d{${minLength},${maxLength}}`,
          steps: [
            "Detected numeric pattern",
            `Numeric patterns vary between ${minLength} and ${maxLength} digits`
          ],
          optimization: `range quantifier: \\d{${minLength},${maxLength}}`
        };
      }

      return {
        pattern: `\\d+`,
        steps: [
          "Detected numeric pattern",
          "Numeric patterns have variable length"
        ],
        optimization: "one or more digits: \\d+"
      };
    }
  }

  // Check if all patterns are letters
  const allLetters = patterns.every(p => /^[a-zA-Z]+$/.test(p));
  if (allLetters) {
    const allUppercase = patterns.every(p => /^[A-Z]+$/.test(p));
    const allLowercase = patterns.every(p => /^[a-z]+$/.test(p));
    
    if (allUppercase) {
      const lengths = new Set(patterns.map(p => p.length));
      if (lengths.size === 1) {
        const length = patterns[0].length;
        return {
          pattern: `[A-Z]{${length}}`,
          steps: [
            "Detected uppercase letter pattern",
            `All uppercase patterns are exactly ${length} characters`
          ],
          optimization: `quantifier with character class: [A-Z]{${length}}`
        };
      }
      
      return {
        pattern: `[A-Z]+`,
        steps: [
          "Detected uppercase letter pattern",
          "Patterns have variable length"
        ],
        optimization: "one or more uppercase letters: [A-Z]+"
      };
    }
    
    if (allLowercase) {
      const lengths = new Set(patterns.map(p => p.length));
      if (lengths.size === 1) {
        const length = patterns[0].length;
        return {
          pattern: `[a-z]{${length}}`,
          steps: [
            "Detected lowercase letter pattern",
            `All lowercase patterns are exactly ${length} characters`
          ],
          optimization: `quantifier with character class: [a-z]{${length}}`
        };
      }
      
      return {
        pattern: `[a-z]+`,
        steps: [
          "Detected lowercase letter pattern",
          "Patterns have variable length"
        ],
        optimization: "one or more lowercase letters: [a-z]+"
      };
    }
    
    // Mixed case
    const lengths = new Set(patterns.map(p => p.length));
    if (lengths.size === 1) {
      const length = patterns[0].length;
      return {
        pattern: `[a-zA-Z]{${length}}`,
        steps: [
          "Detected letter pattern (mixed case)",
          `All letter patterns are exactly ${length} characters`
        ],
        optimization: `quantifier with character class: [a-zA-Z]{${length}}`
      };
    }
    
    return {
      pattern: `[a-zA-Z]+`,
      steps: [
        "Detected letter pattern (mixed case)",
        "Patterns have variable length"
      ],
      optimization: "one or more letters: [a-zA-Z]+"
    };
  }

  // Check if all patterns are alphanumeric
  const allAlphaNum = patterns.every(p => /^[a-zA-Z0-9]+$/.test(p));
  if (allAlphaNum) {
    const lengths = new Set(patterns.map(p => p.length));
    if (lengths.size === 1) {
      const length = patterns[0].length;
      return {
        pattern: `[a-zA-Z0-9]{${length}}`,
        steps: [
          "Detected alphanumeric pattern",
          `All alphanumeric patterns are exactly ${length} characters`
        ],
        optimization: `quantifier with character class: [a-zA-Z0-9]{${length}}`
      };
    }
    
    return {
      pattern: `[a-zA-Z0-9]+`,
      steps: [
        "Detected alphanumeric pattern",
        "Patterns have variable length"
      ],
      optimization: "one or more alphanumeric characters: [a-zA-Z0-9]+"
    };
  }

  // If no common pattern is detected, use alternation as a fallback
  return {
    pattern: `(${patterns.map(escapeRegExp).join('|')})`,
    steps: ["No common pattern detected", "Generated alternation pattern"],
    optimization: "alternation for unique patterns"
  };
}

/**
 * Tests if a string matches the given regex
 * @param {RegExp} regex - Regex to test against 
 * @param {string} testValue - Value to test
 * @returns {boolean} - True if test value matches regex
 */
export const testRegex = (regex, testValue) => {
  if (!regex) return false;
  return regex.test(testValue);
};
