import TeacherRequestForm from "./_components/apply-teacher";

const ApplyTeacherPage = () => {
    return (
        <div className="w-full p-4 sm:p-6 h-auto">
            <h1 className="text-3xl font-bold text-foreground mb-6">Apply as a Teacher</h1>
            <TeacherRequestForm />
        </div>
    );
}

export default ApplyTeacherPage;