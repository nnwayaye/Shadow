import { supabaseAdmin } from "@/lib/supabaseAdmin";
    import EditNovelForm from "./EditNovelForm";

    export const dynamic = "force-dynamic";

    export default async function EditNovelPage({ params }) {
    const { data: novel, error } = await supabaseAdmin
      .from("novels")
      .select("id, title, synopsis, status")
      .eq("id", params.id)
      .maybeSingle();

    if (error || !novel) {
      return <p style={{ color: "#b42318" }}>ဝတ္ထု မတွေ့ပါ။</p>;
    }

    return <EditNovelForm novel={novel} />;
    }
    