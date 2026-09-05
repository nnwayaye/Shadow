'use client';

    import { useRouter } from "next/navigation";
    import { useState } from "react";

    export default function AdminDeleteButton({ endpoint, message, label = "ဖျက်မယ်", disabled = false, disabledReason = "" }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    async function handleDelete() {
      if (disabled || !window.confirm(message)) return;
      setErrorMsg("");
      setIsDeleting(true);

      try {
        const response = await fetch(endpoint, { method: "DELETE" });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || "ဖျက်ရာတွင် အမှားရှိပါတယ်");
        router.refresh();
      } catch (error) {
        setErrorMsg(error.message || "ဖျက်ရာတွင် အမှားရှိပါတယ်");
        setIsDeleting(false);
      }
    }

    return (
      <span>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting || disabled}
          title={disabled ? disabledReason : "ဖျက်မယ်"}
          style={{ ...deleteButtonStyle, ...(disabled ? disabledButtonStyle : {}) }}
        >
          {isDeleting ? "ဖျက်နေပါတယ်..." : label}
        </button>
        {disabled && disabledReason && <span style={disabledTextStyle}>{disabledReason}</span>}
        {errorMsg && <span style={errorStyle}>{errorMsg}</span>}
      </span>
    );
    }

    const deleteButtonStyle = {
    padding: "6px 9px",
    background: "#fff",
    color: "#b42318",
    border: "1px solid #f0b4ad",
    borderRadius: 6,
    fontSize: 12,
    cursor: "pointer",
    };

    const disabledButtonStyle = {
    color: "#999",
    borderColor: "#ddd",
    cursor: "not-allowed",
    };

    const disabledTextStyle = { display: "block", color: "#888", fontSize: 11, marginTop: 4 };
    const errorStyle = { display: "block", color: "#b42318", fontSize: 12, marginTop: 4 };
    