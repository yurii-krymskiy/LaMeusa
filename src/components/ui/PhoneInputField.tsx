import { useState, useRef, useEffect } from "react";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";

type Country = {
    iso2: string;
    dialCode: string;
    name: string;
};

const displayNames = new Intl.DisplayNames(["en"], { type: "region" });

const COUNTRIES: Country[] = getCountries()
    .map((iso2) => ({
        iso2,
        dialCode: `+${getCountryCallingCode(iso2)}`,
        name: displayNames.of(iso2) ?? iso2,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

const DEFAULT_COUNTRY = COUNTRIES.find((c) => c.iso2 === "ES") ?? COUNTRIES[0];

function parseValue(
    value: string,
    countries: Country[]
): { country: Country; localNumber: string } {
    const defaultCountry = DEFAULT_COUNTRY;

    if (!value) return { country: defaultCountry, localNumber: "" };

    // Sort by dialCode length (longest first) so "+380" matches before "+38"
    const sorted = [...countries].sort(
        (a, b) => b.dialCode.length - a.dialCode.length
    );

    for (const country of sorted) {
        if (value.startsWith(country.dialCode)) {
            return {
                country,
                localNumber: value.slice(country.dialCode.length).trimStart(),
            };
        }
    }

    return { country: defaultCountry, localNumber: value };
}

type Props = {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
};

export const PhoneInputField = ({
    value = "",
    onChange,
    placeholder = "Phone number",
    error,
    disabled,
    className,
}: Props) => {
    const { country: parsedCountry, localNumber: parsedLocal } = parseValue(
        value,
        COUNTRIES
    );

    const [selectedCountry, setSelectedCountry] =
        useState<Country>(parsedCountry);
    const [localNumber, setLocalNumber] = useState(parsedLocal);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    const wrapperRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    // Sync external value changes (e.g. form reset)
    useEffect(() => {
        const { country, localNumber: local } = parseValue(value, COUNTRIES);
        setSelectedCountry(country);
        setLocalNumber(local);
    }, [value]);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
                setSearch("");
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => searchRef.current?.focus(), 50);
        }
    }, [isOpen]);

    const filteredCountries = COUNTRIES.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.dialCode.includes(search)
    );

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country);
        setIsOpen(false);
        setSearch("");
        onChange?.(country.dialCode + localNumber);
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^\d\s\-().]/g, "");
        setLocalNumber(raw);
        onChange?.(selectedCountry.dialCode + raw);
    };

    const hasError = !!error;

    return (
        <div ref={wrapperRef} className={`phone-input-root relative w-full ${className ?? ""}`}>
            <div
                className={`phone-input-wrapper ${hasError ? "phone-input-wrapper--error" : ""} ${disabled ? "phone-input-wrapper--disabled" : ""}`}
            >
                {/* Country code dropdown trigger */}
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                        if (!disabled) setIsOpen((prev) => !prev);
                    }}
                    className="phone-input-country-btn"
                    aria-label="Select country code"
                >
                    <span className="phone-input-dial-code">
                        {selectedCountry.dialCode}
                    </span>
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`phone-input-chevron transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>

                {/* Divider */}
                <span className="phone-input-divider" />

                {/* Phone number input */}
                <input
                    type="tel"
                    inputMode="tel"
                    value={localNumber}
                    onChange={handleNumberChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="phone-input-number"
                    autoComplete="tel-national"
                />
            </div>

            {/* Error message */}
            {error && (
                <span className="absolute -bottom-5 left-0 block text-xs text-red-500">
                    {error}
                </span>
            )}

            {/* Dropdown */}
            {isOpen && (
                <div className="phone-input-dropdown">
                    {/* Search */}
                    <div className="phone-input-search-wrapper">
                        <svg
                            className="phone-input-search-icon"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            ref={searchRef}
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search country..."
                            className="phone-input-search"
                        />
                    </div>

                    {/* Country list */}
                    <ul className="phone-input-country-list">
                        {filteredCountries.length === 0 ? (
                            <li className="phone-input-country-empty">
                                No countries found
                            </li>
                        ) : (
                            filteredCountries.map((country) => (
                                <li key={country.iso2 + country.dialCode}>
                                    <button
                                        type="button"
                                        onClick={() => handleCountrySelect(country)}
                                        className={`phone-input-country-option ${selectedCountry.iso2 === country.iso2 ? "phone-input-country-option--active" : ""}`}
                                    >
                                        <span className="phone-input-country-name">
                                            {country.name}
                                        </span>
                                        <span className="phone-input-country-code">
                                            {country.dialCode}
                                        </span>
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};
