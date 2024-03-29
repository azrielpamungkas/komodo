import SettingsForm from "@/app/ui/dashboard/settings-form";
import CandidateForm from "@/app/ui/setting/table";
import Search from "@/app/ui/search";
import { fetchCandidates } from "@/app/lib/data";
import CreateCandidate from "@/app/ui/settingButton";
import AdminForm from "@/app/ui/setting/admin-form";
import PageTitle from "@/components/PageTitle";
import StatusBar from "@/app/components/status-bar";

export default async function Page() {
    const candidates: any = await fetchCandidates();

    return (
        <>
            <main>
                <StatusBar/>
                <PageTitle title="Pengaturan Sistem" />
                <div className="">
                    <AdminForm />
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Search voter..." />
                    <CreateCandidate />
                </div>

                <CandidateForm candidates={candidates} />
            </main>
        </>
    );
}
