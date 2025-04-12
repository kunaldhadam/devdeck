import { Button } from "../../components/ui/button";

const InputSection = ({ inputValue, onInputChange, onGenerate, loading, error }) => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Input Strings</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="input-strings" className="block text-sm font-medium text-gray-700 mb-1">
            Enter comma-separated values:
          </label>
          <textarea
            id="input-strings"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors min-h-[100px] font-mono text-sm"
            placeholder="abc123, abc456, abc789"
            value={inputValue}
            onChange={onInputChange}
          />
          <p className="text-sm text-gray-500 mt-1">
            Examples: phone numbers, email patterns, product codes, etc.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-error text-sm rounded-md p-2 bg-red-50">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={onGenerate}
            className="bg-primary hover:bg-blue-600 text-white transition-colors"
            disabled={loading}
          >
            <span>Generate RegEx</span>
            {loading && (
              <span className="ml-2 inline-block h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InputSection;
