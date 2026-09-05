import { supabaseAdmin } from "@/lib/supabaseAdmin";
    import EditChapterForm from "./EditChapterForm";

    export const dynamic = "force-dynamic";

    export default async function EditChapterPage({ params }) {
    const { data: chapter, error } = await supabaseAdmin
      .from("chapters")
      .select("id, novel_id, chapter_number, content")
      .eq("id", params.id)
      .maybeSingle();

    if (error || !chapter) {
      return <p style={{ color: "#b42318" }}>အခန်း မတွေ့ပါ။</p>;
    }

    const { data: novel } = await supabaseAdmin
      .from("novels")
      .select("title")
      .eq("id", chapter.novel_id)
      .maybeSingle();

    return <EditChapterForm chapter={chapter} novelTitle={novel?.title || ""} />;
    }
    