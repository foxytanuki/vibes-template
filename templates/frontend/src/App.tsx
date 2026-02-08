import { env } from "@/env";

function App() {
	return (
		<div className="flex min-h-svh items-center justify-center">
			<div className="space-y-2 text-center">
				<h1 className="text-4xl font-bold">{env.VITE_APP_NAME}</h1>
				<p className="text-sm text-zinc-500">
					API: <span className="font-mono">{env.VITE_API_BASE_URL}</span>
				</p>
			</div>
		</div>
	);
}

export default App;
