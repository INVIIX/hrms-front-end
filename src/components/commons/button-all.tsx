import { ReactNode } from "react";
import { Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";

export function ButtonAll({
    className,
    loading = false,
    children = 'New User',
    ...props
}: React.ComponentProps<"button"> & {
    loading?: boolean,
    children?: ReactNode | string
}) {
    return <>
        <Button {...props} disabled={loading}>
            {loading ? <Loader2Icon className="animate-spin" /> : children}
        </Button>
    </>
}