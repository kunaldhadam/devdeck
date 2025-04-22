import { Button } from "../../components/ui/button";
import { Check, X } from "lucide-react";

const TestSection = ({
  regex,
  testValue,
  testResult,
  onTestInputChange,
  onTestRegex,
}) => {
  if (!regex) {
    return (
      <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Test Your RegEx</h2>
        <div className="text-center py-6 text-gray-500">
          <p>Generate a RegEx first to test it against new values</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Test Your RegEx</h2>

      <div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label
              htmlFor="test-input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Test a new value:
            </label>
            <input
              type="text"
              id="test-input"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors font-mono"
              placeholder="Enter test value"
              value={testValue}
              onChange={onTestInputChange}
            />
          </div>
          <div className="md:pt-7">
            <Button
              onClick={onTestRegex}
              className="w-full md:w-auto bg-primary hover:bg-blue-900 text-white transition-colors"
            >
              Test
            </Button>
          </div>
        </div>

        {/* Test result */}
        {testResult && (
          <div className="mt-4">
            {testResult.matches ? (
              <div className="flex items-center p-3 bg-green-50 text-green-800 rounded-md">
                <Check className="h-5 w-5 text-accent mr-2" />
                <span>
                  <span className="font-mono font-medium">{testResult.value}</span> matches the
                  pattern
                </span>
              </div>
            ) : (
              <div className="flex items-center p-3 bg-red-50 text-red-800 rounded-md">
                <X className="h-5 w-5 text-error mr-2" />
                <span>
                  <span className="font-mono font-medium">{testResult.value}</span> does not match
                  the pattern
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestSection;
