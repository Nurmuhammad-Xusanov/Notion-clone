import { LoaderPinwheel } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const loadervariants = cva(
    "text-muted-foreground animate-spin", {
    variants: {
        size: {
            default: "h-4 w-4",
            sm: "h-2 w-2",
            lg: "h-6 w-6",
            xl: "h-10 w-10",
        },
    },
    defaultVariants: {
        size: "default",
    },
}
)

interface LoaderProps extends VariantProps<typeof loadervariants> { }

export default function Loader({ size }: LoaderProps) {
    return (
        <LoaderPinwheel className={cn(loadervariants({ size }))} />
    )
}
