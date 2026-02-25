import { Link, useLocation } from "react-router-dom";
import { pagesLabels } from "../../router";

export function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
    const location = useLocation();
    const pathname = location.pathname;

    const segments = pathname.split("/").filter(Boolean);

    const crumbs = segments.map((segment, index) => {
        const fullPath = "/" + segments.slice(0, index + 1).join("/");
        const page = pagesLabels.find((p) => p.path === fullPath);
        return {
            label: page?.label || segment,
            path: fullPath,
        };
    });

    const breadcrumbItems = [
        { label: "Home", path: "/" },
        ...crumbs.filter((c) => c.path !== "/"),
    ];

    return (
        <nav aria-label="breadcrumb" className="mb-5" data-slot="breadcrumb" {...props}>
            <BreadcrumbList>
                {breadcrumbItems.map((crumb, index) => (
                    <BreadcrumbItem key={crumb.path}>
                        {index < breadcrumbItems.length - 1 ? (
                            <Link to={crumb.path} className="hover:underline">
                                {crumb.label}
                            </Link>
                        ) : (
                            <span className="font-[300] text-gray-800">
                                {crumb.label}
                            </span>
                        )}
                        {index < breadcrumbItems.length - 1 && (
                            <BreadcrumbSeparator>›</BreadcrumbSeparator>
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </nav>
    );
}

function BreadcrumbList({ ...props }: React.ComponentProps<"ol">) {
    return (
        <ol
            data-slot="breadcrumb-list"
            className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm sm:gap-2.5"
            {...props}
        />
    );
}

function BreadcrumbItem({ ...props }: React.ComponentProps<"li">) {
    return (
        <li
            data-slot="breadcrumb-item"
            className="inline-flex items-center gap-1.5"
            {...props}
        />
    );
}

function BreadcrumbSeparator({
    children,
    ...props
}: React.ComponentProps<"span">) {
    return (
        <span
            data-slot="breadcrumb-separator"
            role="presentation"
            aria-hidden="true"
            className="[&>svg]:size-3.5"
            {...props}
        >
            {children}
        </span>
    );
}
