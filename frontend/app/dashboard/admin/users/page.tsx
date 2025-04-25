import { UserTable } from "../__components/list-users";

import { User } from "../__components/list-users";

const users: User[] = [
    {
        id: "u1",
        name: "Alice Smith",
        email: "alice.smith@example.com",
        role: "ADMIN",
        status: "Active"
    },
    {
        id: "u2",
        name: "Brian Lee",
        email: "brian.lee@example.com",
        role: "TEACHER",
        status: "Pending"
    },
    {
        id: "u3",
        name: "Clara Johnson",
        email: "clara.j@example.com",
        role: "STUDENT",
        status: "Active"
    },
    {
        id: "u4",
        name: "Daniel Brown",
        email: "dan.brown@example.com",
        role: "TEACHER",
        status: "Active"
    },
    {
        id: "u5",
        name: "Eva Davis",
        email: "eva.davis@example.com",
        role: "ADMIN",
        status: "Pending"
    },
    {
        id: "u6",
        name: "Frank Wilson",
        email: "frank.w@example.com",
        role: "STUDENT",
        status: "Pending"
    },
    {
        id: "u7",
        name: "Grace Liu",
        email: "grace.liu@example.com",
        role: "TEACHER",
        status: "Active"
    },
    {
        id: "u8",
        name: "Henry Moore",
        email: "henry.moore@example.com",
        role: "ADMIN",
        status: "Active"
    },
    {
        id: "u9",
        name: "Ivy Kim",
        email: "ivy.kim@example.com",
        role: "STUDENT",
        status: "Pending"
    },
    {
        id: "u10",
        name: "Jack Carter",
        email: "jack.carter@example.com",
        role: "TEACHER",
        status: "Active"
    },
    {
        id: "u11",
        name: "Karen Lopez",
        email: "karen.lopez@example.com",
        role: "ADMIN",
        status: "Active"
    },
    {
        id: "u12",
        name: "Leo Walker",
        email: "leo.walker@example.com",
        role: "STUDENT",
        status: "Pending"
    },
    {
        id: "u13",
        name: "Mia Turner",
        email: "mia.turner@example.com",
        role: "STUDENT",
        status: "Active"
    },
    {
        id: "u14",
        name: "Nathan Scott",
        email: "nathan.scott@example.com",
        role: "TEACHER",
        status: "Pending"
    },
    {
        id: "u15",
        name: "Olivia Adams",
        email: "olivia.adams@example.com",
        role: "ADMIN",
        status: "Active"
    },
    {
        id: "u16",
        name: "Paul Green",
        email: "paul.green@example.com",
        role: "STUDENT",
        status: "Pending"
    }
];


const UsersPage = () => {
    return (

        <div className="w-full p-4 sm:p-6 h-auto">
            <h1 className="text-3xl font-bold text-foreground mb-6">All Users</h1>
            <UserTable users={users} />
        </div>
    );
}

export default UsersPage;