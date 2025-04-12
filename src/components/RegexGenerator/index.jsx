import { useState } from "react";
import InputSection from "./InputSection";
import ResultSection from "./ResultSection";
import TestSection from "./TestSection";
import { generateRegex, testRegex } from "../../lib/regexGenerator";
import { useToast } from "../../hooks/use-toast";

const RegexGenerator = () => {
  const [inputValue, setInputValue] = useState("abc123, abc456, abc789");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [testValue, setTestValue] = useState("");
  const [testResult, setTestResult] = useState(null);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError("");
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError("");
      setResult(null);
      setTestResult(null);

      // Validate input
      const trimmedInput = inputValue.trim();
      if (!trimmedInput) {
        setError("Please enter some values");
        return;
      }

      const inputStrings = trimmedInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      if (inputStrings.length < 2) {
        setError("Please enter at least two comma-separated values");
        return;
      }

      // Generate regex
      const result = generateRegex(inputStrings);
      setResult(result);
      setTestValue(inputStrings[0]); // Set first input as initial test value
    } catch (err) {
      setError(err.message || "Failed to generate regex");
      toast({
        title: "Error",
        description: err.message || "Failed to generate regex",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyRegex = () => {
    if (!result?.regex) return;
    
    navigator.clipboard.writeText(result.regex.toString())
      .then(() => {
        toast({
          title: "Copied!",
          description: "RegEx copied to clipboard",
        });
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "Could not copy to clipboard",
          variant: "destructive",
        });
      });
  };

  const handleTestInputChange = (e) => {
    setTestValue(e.target.value);
    setTestResult(null);
  };

  const handleTestRegex = () => {
    if (!result?.regex || !testValue) return;
    
    const matches = testRegex(result.regex, testValue);
    setTestResult({
      value: testValue,
      matches,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-secondary">RegEx Generator</h1>
        <p className="text-gray-600 mt-2">
          Generate optimal regular expressions from patterns in your data
        </p>
      </header>

      <main className="space-y-8">
        <InputSection
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onGenerate={handleGenerate}
          loading={loading}
          error={error}
        />

        <ResultSection
          regex={result?.regex}
          processingSteps={result?.processingSteps}
          inputValues={result?.inputValues}
          onCopyRegex={handleCopyRegex}
        />

        <TestSection
          regex={result?.regex}
          testValue={testValue}
          testResult={testResult}
          onTestInputChange={handleTestInputChange}
          onTestRegex={handleTestRegex}
        />
      </main>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>RegEx Generator - A modular component for pattern recognition</p>
        <p className="mt-1">Can be easily integrated into any React application</p>
      </footer>
    </div>
  );
};

export default RegexGenerator;
