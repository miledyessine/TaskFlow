import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/hooks/getInitials";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ProfileCard = () => {
    const { user, isAuthenticated } = useAuth0();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.name || "",
        email: user?.email || "",
        role: user?.role || [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleRoleChange = (value) => {
        setFormData({ ...formData, role: value });
    };
    const handleEditing = async () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        console.log(user);
        setIsEditing(false);
    };

    return isAuthenticated ? (
        <Card className="max-w-md mx-auto mt-10">
            <CardHeader className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    <Avatar className="w-16 h-16">
                        <AvatarFallback>
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                        <h1 className="text-lg font-bold">{user.name}</h1>
                        <h1 className="text-sm text-gray-500">{user.email}</h1>
                    </div>
                </div>
                <Button variant="outline" onClick={handleEditing}>
                    Modify
                </Button>
            </CardHeader>
            <CardContent className="p-4">
                <div className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select
                            onChange={handleRoleChange}
                            disabled={!isEditing}
                            id="role"
                            name="role"
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={formData.role} />
                            </SelectTrigger>
                            <SelectContent>
                                {formData.role.map((role) => (
                                    <SelectItem key={role} value={role}>
                                        {role.charAt(0).toUpperCase() +
                                            role.slice(1).replace("_", " ")}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {isEditing && <Button onClick={handleSave}>Save</Button>}
                </div>
            </CardContent>
        </Card>
    ) : (
        <h1 className="text-center mt-10">
            You need to log in to view your profile.
        </h1>
    );
};

export default ProfileCard;
