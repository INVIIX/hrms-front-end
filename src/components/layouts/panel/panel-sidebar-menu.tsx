import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronRightIcon, LucideIcon } from "lucide-react";

type PanelSidebarMenuProps = {
    navTitle?: string;
    navs?: Array<{
        title: string;
        icon: LucideIcon;
        url?: string;
        children?: Array<{ title: string; url: string }>;
    }>;
};

export function PanelSidebarMenu({ navTitle, navs, ...props }: React.ComponentProps<typeof SidebarGroup> & PanelSidebarMenuProps) {
    return <>
        <SidebarGroup {...props}>
            {navTitle && <SidebarGroupLabel>{navTitle}</SidebarGroupLabel>}
            <SidebarMenu>
                {navs && navs.map((item) => {
                    const isParentActive =
                        item.url === location.pathname ||
                        (item.children && item.children.some(child => child.url === location.pathname));
                    return (
                        <SidebarMenuItem key={item.title}>
                            {item.children ? (
                                <Collapsible defaultOpen={isParentActive} className="group/collapsible">
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton isActive={isParentActive} tooltip={item.title} className="cursor-pointer">
                                            <item.icon />
                                            <span>{item.title}</span>
                                            <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.children.map((child) => {
                                                const isChildActive = child.url === location.pathname;
                                                return (
                                                    <SidebarMenuSubItem key={child.title}>
                                                        <SidebarMenuSubButton asChild isActive={isChildActive}>
                                                            <NavLink to={child.url}>{child.title}</NavLink>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                );
                                            })}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </Collapsible>
                            ) : (
                                <SidebarMenuButton asChild isActive={isParentActive}>
                                    <NavLink to={item.url ?? '/'}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            )}
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    </>
}