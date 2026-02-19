import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Briefcase, FolderKanban, Award, Mail, Activity } from "lucide-react";

const navItems = [
    { name: "About", icon: User },
    { name: "Experience", icon: Briefcase },
    { name: "Projects", icon: FolderKanban },
    { name: "Performance", icon: Activity },
    { name: "Certifications", icon: Award },
    { name: "Contact", icon: Mail }
];

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    const menuVariants = {
        closed: {
            x: "100%",
            transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            x: 0,
            transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 40
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, x: 20 },
        open: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.1,
                type: "spring" as const,
                stiffness: 300,
                damping: 24
            }
        })
    };

    return (
        <div className="md:hidden">
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors z-50 relative"
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6 text-foreground" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Menu className="w-6 h-6 text-foreground" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>

            {/* Portal for Menu & Overlay */}
            {createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 bg-background/80 backdrop-blur-md z-[9998]"
                                onClick={() => setIsOpen(false)}
                            />

                            {/* Slide-out Menu */}
                            <motion.nav
                                variants={menuVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                className="fixed top-0 right-0 bottom-0 w-[min(20rem,calc(100vw-2rem))] bg-card border-l-4 border-l-primary border-y border-r border-border z-[9999] flex flex-col shadow-[-8px_0_30px_-5px_rgba(0,0,0,0.3)]"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b border-border bg-secondary/50">
                                    <span className="text-xl font-bold tracking-tighter text-foreground">
                                        Sabrin<span className="text-primary">Singh</span>
                                    </span>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 rounded-full bg-secondary hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                                        aria-label="Close menu"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Navigation Links */}
                                <div className="flex-1 py-6 px-4 bg-card">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-4">Navigation</p>
                                    <ul className="space-y-1">
                                        {navItems.map((item, idx) => {
                                            const Icon = item.icon;
                                            return (
                                                <motion.li
                                                    key={item.name}
                                                    custom={idx}
                                                    variants={itemVariants}
                                                    initial="closed"
                                                    animate="open"
                                                >
                                                    <a
                                                        href={`#${item.name.toLowerCase()}`}
                                                        onClick={handleLinkClick}
                                                        className="flex items-center gap-4 py-3.5 px-4 text-base font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 group"
                                                    >
                                                        <span className="p-2 rounded-lg bg-secondary group-hover:bg-primary/20 transition-colors">
                                                            <Icon className="w-5 h-5" />
                                                        </span>
                                                        <span>{item.name}</span>
                                                    </a>
                                                </motion.li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                {/* Footer */}
                                <div className="p-6 border-t border-border bg-secondary/30">
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-foreground">Sabrin Lal Singh</p>
                                        <p className="text-xs text-muted-foreground mt-1">Data Engineer & Architect</p>
                                    </div>
                                </div>
                            </motion.nav>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
}

