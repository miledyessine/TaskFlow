import { Button } from "../ui/button";
import { useAuth0 } from "@auth0/auth0-react";
function HeroSection() {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const handleLogin = async () => {
        await loginWithRedirect();
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center p-3 max-w-2xl mx-auto">
                <h1 className="text-6xl font-bold text-blue-950 mb-3">
                    Welcome to TaskFlow
                </h1>
                <p className="text-gray-700 text-xl font-bold">
                    Get everyone working in a single platform
                </p>
                <p className="text-gray-700 text-xl">
                    designed to manage any type of work.
                </p>
                {!isAuthenticated && (
                    <>
                        <Button
                            size="lg"
                            variant="destructive"
                            className="mt-3 mb-1"
                            onClick={handleLogin}
                        >
                            Get Started. Its FREE
                        </Button>
                        <p className="text-gray-400 text-xs">
                            Free Forever. No Credit Card.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default HeroSection;
