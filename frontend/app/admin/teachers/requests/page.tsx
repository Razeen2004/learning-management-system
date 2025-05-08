import { TeacherRequestsTable } from "../../__components/list-teacher-requests";

const arrayOfTeacherRequests = [
    {
        id: "1",
        fullName: "Amina Yusuf",
        email: "amina@example.com",
        phone: "+254712345678",
        bio: "Passionate physics teacher with 5 years' experience.",
        education: "B.Ed in Physics & Math, University of Nairobi",
        subjects: "Physics, Mathematics",
        experience: "5 years",
        jobTitle: "High School Teacher",
        linkedin: "https://linkedin.com/in/aminayusuf",
        resume: "/uploads/amina_resume.pdf", // Simulated paths or S3 links
        certifications: "/uploads/amina_cert.pdf",
        status: "PENDING",
    },
    {
        id: "2",
        fullName: "James Otieno",
        email: "james@example.com",
        phone: "+254798765432",
        bio: "Senior Chemistry lecturer, passionate about education.",
        education: "M.Sc in Chemistry, Kenyatta University",
        subjects: "Chemistry",
        experience: "8 years",
        jobTitle: "Lecturer",
        linkedin: "https://linkedin.com/in/jamesotieno",
        resume: "/uploads/james_resume.pdf",
        certifications: "/uploads/james_cert.pdf",
        status: "PENDING",
    },
];

const TeacherPage = () => {
    return (
        <div className="w-full p-4 sm:p-6 h-auto">
            <h1 className="text-3xl font-bold text-foreground mb-6">Teacher Requests</h1>
            <TeacherRequestsTable requests={arrayOfTeacherRequests} />
        </div>
    );
}

export default TeacherPage;