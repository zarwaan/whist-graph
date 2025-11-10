const variants = {
    sm: { small: "block sm:hidden", large: "hidden sm:block" },
    md: { small: "block md:hidden", large: "hidden md:block" },
    lg: { small: "block lg:hidden", large: "hidden lg:block" },
    xl: { small: "block xl:hidden", large: "hidden xl:block" },
    "2xl": { small: "block 2xl:hidden", large: "hidden 2xl:block" },
};

export default function Responsive({ smaller, larger, breakpoint = 'md' }: {
    breakpoint?: "md" | "sm" | "lg" | "xl" | "2xl",
    smaller: React.ReactNode,
    larger: React.ReactNode
}) {
    const {small, large} = variants[breakpoint]
    return (
        <>
            <div className={small}>{smaller}</div>
            <div className={large}>{larger}</div>
        </>
    )
}