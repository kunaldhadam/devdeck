import { useEffect, useRef } from "react";
import { Button } from "../../components/ui/button";
import { Check, ChevronDown, Copy, FileText } from "lucide-react";

const ResultSection = ({ regex, processingSteps, inputValues, onCopyRegex }) => {
  const regexRef = useRef(null);

  useEffect(() => {
    // Apply syntax highlighting to code blocks
    // This would ideally use a syntax highlighting library
    // For now, we'll just display the regex as plain text
  }, [regex]);

  if (!regex && !processingSteps && !inputValues) {
    return (
      <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Generated RegEx</h2>
        <div className="text-center py-6 text-gray-500">
          <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <p>Enter your values and click "Generate RegEx" to see the results</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Generated RegEx</h2>

      <div>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-700">Expression</h3>
            <Button
              onClick={onCopyRegex}
              variant="ghost"
              className="text-primary hover:text-blue-700 text-sm font-medium flex items-center"
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <div className="bg-gray-50 rounded-md p-3 font-mono text-base overflow-x-auto">
            <code ref={regexRef}>{regex?.toString()}</code>
          </div>
          {regex && (
            <p className="text-sm text-gray-500 mt-2">
              This expression will match patterns similar to your input values.
            </p>
          )}
        </div>

        {processingSteps?.length > 0 && (
          <div className="border-t border-gray-200 pt-4">
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="font-medium text-gray-700">Pattern Details</h3>
                <span className="text-primary group-open:rotate-180 transition-transform">
                  <ChevronDown className="h-5 w-5" />
                </span>
              </summary>
              <div className="mt-2 text-sm text-gray-600 space-y-2">
                {processingSteps.map((step, index) => (
                  <p key={index}>{`${index + 1}. ${step}`}</p>
                ))}
              </div>
            </details>
          </div>
        )}

        {inputValues?.length > 0 && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="font-medium text-gray-700">Matched Values</h3>
                <span className="text-primary group-open:rotate-180 transition-transform">
                  <ChevronDown className="h-5 w-5" />
                </span>
              </summary>
              <div className="mt-2 space-y-1">
                {inputValues.map((val, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    <code className="font-mono">{val}</code>
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultSection;
