import { Tooltip } from "@heroui/react";
import { PowerIcon, SparklesIcon } from "lucide-react";

function App() {
  const [url, setURL] = useState<URL>(new URL("https://www.foobar.com"));

  return (
    <div className="flex flex-col items-stretch justify-between h-full">
      <div />
      <div className="flex flex-col items-stretch p-4">
        <div className="flex flex-col gap-4 items-center">
          <PowerIcon color="green" size={60} />
          <p>{url.hostname}</p>
        </div>
      </div>
      <div className="flex gap-4 justify-center bg-gray-300 py-2">
        <Tooltip content="View and edit filters.">
          <button
            onClick={() => {
              // TODO: Implement this
            }}
            type="button"
          >
            <SparklesIcon size={20} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default App;
