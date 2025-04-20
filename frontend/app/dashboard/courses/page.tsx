import { Input } from "@/components/ui/input";
import Courses from "./_components/Courses";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import SearchInput from "./_components/SearchInput";

const CoursesPage = () => {
    return (
        <div className="w-full p-4 sm:p-6 h-auto">
            <div className="flex items-start justify-between">
                <h1 className="text-3xl font-bold text-foreground mb-6">Browse Courses</h1>
                <SearchInput/>
            </div>
            <Courses />
        </div>);
}

export default CoursesPage;