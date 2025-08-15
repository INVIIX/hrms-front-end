import { NavLink } from "react-router";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useBreadcrumbs } from "@/components/context/breadcrumb-context";

export function PanelBreadcrumbs() {
    const { breadcrumbs } = useBreadcrumbs();
    return <>
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs && breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                        <div key={index} className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5">
                            <BreadcrumbItem  className={isLast ? "" : "hidden md:block"}>
                                {isLast || crumb.href == '#' || crumb.href == '' || crumb.href == undefined ? (
                                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild><NavLink to={crumb.href ?? ''}>{crumb.label}</NavLink></BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    </>
}