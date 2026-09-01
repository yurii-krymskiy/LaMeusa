import { useState } from "react";
import {
    TRANSLATION_LANGUAGES,
    LANGUAGE_LABELS,
    type TranslationLang,
    type TranslationMap,
} from "../../lib/admin.service";

export type TranslationField = {
    key: string;
    label: string;
    multiline?: boolean;
    placeholder?: string;
};

type Props = {
    /** Translatable fields for this entity, e.g. [{key:"title"},{key:"description"}]. */
    fields: TranslationField[];
    /** English/base values (edited in the main form) — shown read-only under the EN tab. */
    baseValues: Record<string, string>;
    /** Current translations for all languages (this component edits the non-English ones). */
    value: TranslationMap;
    onChange: (next: TranslationMap) => void;
};

// English is authored via the main form fields, so tabs here cover the other six.
const OTHER_LANGUAGES = TRANSLATION_LANGUAGES.filter(
    (l) => l !== "en"
) as TranslationLang[];

export const TranslationTabs = ({ fields, baseValues, value, onChange }: Props) => {
    const [active, setActive] = useState<TranslationLang>("en");

    const isLangComplete = (lang: TranslationLang): boolean => {
        const src = lang === "en" ? baseValues : value[lang];
        if (!src) return false;
        return fields.every((f) => (src[f.key] ?? "").trim() !== "");
    };

    const setField = (lang: TranslationLang, key: string, val: string) => {
        onChange({
            ...value,
            [lang]: { ...(value[lang] ?? {}), [key]: val },
        });
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-gray-50/60">
            <div className="flex flex-wrap gap-1 border-b border-gray-200 p-2">
                {TRANSLATION_LANGUAGES.map((lang) => {
                    const complete = isLangComplete(lang);
                    const isActive = active === lang;
                    return (
                        <button
                            key={lang}
                            type="button"
                            onClick={() => setActive(lang)}
                            className={[
                                "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold uppercase transition-colors",
                                isActive
                                    ? "bg-royal-blue text-white"
                                    : "bg-white text-gray-600 hover:bg-gray-100",
                            ].join(" ")}
                            title={LANGUAGE_LABELS[lang]}
                        >
                            {lang}
                            <span
                                className={[
                                    "inline-block h-1.5 w-1.5 rounded-full",
                                    complete
                                        ? "bg-green-500"
                                        : isActive
                                          ? "bg-white/50"
                                          : "bg-gray-300",
                                ].join(" ")}
                                aria-hidden
                            />
                        </button>
                    );
                })}
            </div>

            <div className="space-y-3 p-3">
                {active === "en" ? (
                    <div className="space-y-3">
                        <p className="text-xs text-gray-500">
                            English is edited in the fields above — shown here for
                            reference. Other languages fall back to English when left
                            empty.
                        </p>
                        {fields.map((f) => (
                            <div key={f.key}>
                                <label className="mb-1 block text-xs font-medium text-gray-500">
                                    {f.label}
                                </label>
                                <div className="min-h-[2.25rem] whitespace-pre-wrap rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
                                    {baseValues[f.key]?.trim() || (
                                        <span className="text-gray-400">—</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    OTHER_LANGUAGES.filter((l) => l === active).map((lang) => (
                        <div key={lang} className="space-y-3">
                            {fields.map((f) => (
                                <div key={f.key}>
                                    <label className="mb-1 block text-xs font-medium text-gray-500">
                                        {f.label}
                                        <span className="ml-1 font-normal text-gray-400">
                                            ({LANGUAGE_LABELS[lang]})
                                        </span>
                                    </label>
                                    {f.multiline ? (
                                        <textarea
                                            value={value[lang]?.[f.key] ?? ""}
                                            onChange={(e) =>
                                                setField(lang, f.key, e.target.value)
                                            }
                                            placeholder={
                                                f.placeholder ??
                                                baseValues[f.key] ??
                                                ""
                                            }
                                            rows={3}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-royal-blue focus:outline-none"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={value[lang]?.[f.key] ?? ""}
                                            onChange={(e) =>
                                                setField(lang, f.key, e.target.value)
                                            }
                                            placeholder={
                                                f.placeholder ??
                                                baseValues[f.key] ??
                                                ""
                                            }
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-royal-blue focus:outline-none"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
