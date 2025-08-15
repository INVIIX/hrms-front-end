import { createContext, useContext, useState } from "react";

export type TBreadcrumb = { label: string; href?: string };
export type TBreadcrumbs = TBreadcrumb[] | [];

export type TBreadcrumbContext = {
    breadcrumbs: TBreadcrumbs;
    setBreadcrumbs: (breadcrumbs: TBreadcrumbs) => void;
};

export const BreadcrumbContext = createContext<TBreadcrumbContext>({
    breadcrumbs: [],
    setBreadcrumbs: () => { }
});

export const BreadcrumbsProvider = ({ children }: { children: React.ReactNode }) => {
    const [breadcrumbs, setBreadcrumbs] = useState<TBreadcrumbs>([]);
    return (
        <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
            {children}
        </BreadcrumbContext.Provider>
    );
}

export const useBreadcrumbs = () => useContext(BreadcrumbContext);