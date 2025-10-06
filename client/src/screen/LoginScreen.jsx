import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate } from "react-router-dom";

gsap.registerPlugin(ScrollToPlugin);

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

  const {isAuthuser, login, isLogin}=useAuthStore();

	useEffect(() => {
		// simple entrance animation for the login card
		gsap.fromTo(
			".login-card",
			{ y: 30, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
		);	

	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			login({ email, password });
		} catch (err) {
			setError(err.message || "Network error");
		} finally {
			setLoading(false);
		}
	};
    if (isAuthuser) {
    return <Navigate to="/" replace />;
  }
	return (
		<>

			<main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/40 via-transparent to-transparent">
				{/* subtle background model like landing */}
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
					<img src="/model.png" alt="" aria-hidden className="object-contain opacity-10 max-h-[100vh] mx-auto" />
				</div>

				<section className="relative z-10 w-full max-w-2xl mx-auto px-6">
					<div className="login-card p-8 rounded-2xl bg-white/6 backdrop-blur-sm border border-white/5 shadow-lg">
						<h2 className="text-3xl text-white font-semibold mb-2">Welcome back</h2>
						<p className="text-white/80 mb-6">Sign in to continue to Vaani</p>

						<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
							<label className="text-sm text-white/80">Email</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="you@example.com"
								required
								className="p-3 rounded bg-white/6 text-white outline-none"
							/>

							<label className="text-sm text-white/80">Password</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								required
								className="p-3 rounded bg-white/6 text-white outline-none"
							/>

							{error && <div className="text-sm text-red-400">{error}</div>}

							<div className="flex items-center justify-between mt-2">
								<div className="flex items-center gap-2">
									<input id="remember" type="checkbox" className="accent-white" />
									<label htmlFor="remember" className="text-white/80 text-sm">Remember me</label>
								</div>

								<a href="/signup" className="text-sm text-white/80 underline">Create account</a>
							</div>

							<button
								type="submit"
								disabled={loading}
								className="mt-4 px-6 py-3 rounded-2xl bg-white text-black font-semibold shadow-lg hover:scale-[0.995] transition disabled:opacity-60"
							>
								{loading ? "Signing in..." : "Sign in"}
							</button>

							<div className="mt-4 text-center text-white/70">or continue with</div>
							<div className="mt-2 flex gap-3">
								<button type="button" className="flex-1 px-4 py-3 rounded-xl bg-white/6 text-white cursor-not-allowed" disabled>GitHub</button>
								<button type="button" className="flex-1 px-4 py-3 rounded-xl bg-white/6 text-white cursor-not-allowed" disabled>Google</button>
							</div>
						</form>
					</div>
				</section>
			</main>
		</>
	);
}
