import { supabaseAdmin } from "@/lib/supabaseAdmin";
    import NewChapterForm from "./NewChapterForm";

    export default async function NewChapterPage({ searchParams }) {
    const { novel_id: initialNovelId } = searchParams;
    const { data: novels, error } = await supabaseAdmin
      .from("novels")
      .select("id, title");

    if (error) {
      return <p>ဝတ္ထုစာရင်း ဖတ်ရာတွင် အမှားရှိပါတယ်။</p>;
    }

    return <NewChapterForm novels={novels || []} initialNovelId={initialNovelId || ""} />;
    }
    