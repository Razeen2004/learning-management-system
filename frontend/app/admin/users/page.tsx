"use client";
import { getSession, useSession } from "next-auth/react";
import { UserTable } from "../__components/list-users";

import { User } from "../__components/list-users";
import { useEffect, useState } from "react";
import { toast } from "sonner";



const UsersPage = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    // Assuming you have a session object from next-auth

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const session = await getSession();
                setUser(session?.user);
                setLoading(true);

                if (!session?.user?.id || !session?.user?.role) {
                    toast.error("User not authenticated");
                    return;
                }

                const res = await fetch("/api/admin/getusers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user: {
                            id: session.user.id,
                            role: session.user.role,
                        },
                    }),
                });

                const data = await res.json();

                if (!res.ok) {
                    toast.error(data?.error || "Failed to fetch users");
                    return;
                }

                setUsers(data);
            } catch (err) {
                console.error("Error fetching users:", err);
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    return (

        <div className="w-full p-4 sm:p-6 h-auto">
            <h1 className="text-3xl font-bold text-foreground mb-6">All Users</h1>
            <UserTable user={user} users={users} loading={loading} />
        </div>
    );
}

export default UsersPage;