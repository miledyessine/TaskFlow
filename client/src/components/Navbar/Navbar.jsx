import { ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export function Navbar() {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    const handleSignup = async () => {
        await loginWithRedirect({
            authorizationParams: { screen_hint: "signup" },
        });
    };

    const handleLogin = async () => {
        await loginWithRedirect();
    };
    return (
        <div className="fixed z-50 h-[57px] w-full bg-white border-b flex items-center justify-between px-20">
            <div className="flex items-center">
                <Link to="/">
                    <Button variant="outline" size="icon" aria-label="Home">
                        <ListTodo strokeWidth={2.75} />
                    </Button>
                </Link>
                <Label className="text-xl font-semibold ml-2 text-blue-950">
                    TaskFlow
                </Label>
            </div>
            {!isAuthenticated && (
                <Tabs defaultValue="signup" className="gap-1.5 text-sm">
                    <TabsList>
                        <TabsTrigger value="login" onClick={handleLogin}>
                            Log in
                        </TabsTrigger>
                        <TabsTrigger value="signup" onClick={handleSignup}>
                            Sign up
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            )}
            {isAuthenticated && (
                <Button variant="destructive" onClick={logout}>
                    Log out
                </Button>
            )}
        </div>
    );
}
