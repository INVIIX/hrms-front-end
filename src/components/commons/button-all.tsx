import { ReactNode, useState } from "react";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type ButtonAllProps = React.ComponentProps<"button"> & {
  loading?: boolean;
  children?: ReactNode | string;
  icon?: ReactNode;
  variant?: "default" | "primary" | "secondary";
  fabActions?: {
    icon: ReactNode;
    onClick: () => void;
    label: string;
    variant?: "default" | "primary" | "secondary";
  }[];
};

export function ButtonAll({
  className,
  loading = false,
  children = "New User",
  icon = <PlusIcon className="w-4 h-4" />,
  variant = "primary",
  fabActions = [],
  ...props
}: ButtonAllProps) {
  const [expanded, setExpanded] = useState(false);

  const variantClasses = {
    primary: "bg-gray-800 hover:bg-gray-600 text-white dark:bg-white dark:text-gray-800 dark:hover:bg-gray-300",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    default: "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300",
  };

  return (
    <>
      <Button
        {...props}
        disabled={loading}
        className={cn(
          "hidden sm:inline-flex items-center gap-2",
          variantClasses[variant],
          className
        )}
      >
        {loading ? (
          <Loader2Icon className="animate-spin w-4 h-4" />
        ) : (
          <>
            {icon}
            {children}
          </>
        )}
      </Button>

      <div className="sm:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {expanded &&
          fabActions.map((action, index) => (
            <Button
              key={index}
              className={cn(
                "rounded-full p-0 h-12 w-12 shadow-lg transition-all animate-in fade-in zoom-in-95",
                variantClasses[action.variant || "secondary"],
                "flex items-center justify-center"
              )}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
                setExpanded(false);
              }}
            >
              {action.icon}
              <span className="sr-only">{action.label}</span>
            </Button>
          ))}

        <Button
          {...props}
          disabled={loading}
          className={cn(
            "rounded-full p-0 h-14 w-14 shadow-lg transition-all",
            variantClasses[variant],
            "flex items-center justify-center",
            expanded ? "rotate-45" : "",
            className
          )}
          onClick={(e) => {
            if (fabActions.length > 0) {
              e.stopPropagation();
              setExpanded(!expanded);
            } else {
              props.onClick?.(e);
            }
          }}
        >
          {loading ? <Loader2Icon className="animate-spin w-6 h-6" /> : icon}
          <span className="sr-only">{children}</span>
        </Button>
      </div>
    </>
  );
}
