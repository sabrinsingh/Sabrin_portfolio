import { Github, Linkedin, Mail } from "lucide-react";


export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-muted/50 border-t border-border py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4">
                            Sabrin<span className="text-primary">Singh</span>
                        </h3>
                        <p className="text-muted-foreground max-w-sm">
                            Data Engineer specializing in building scalable, reliable, and secure data infrastructure.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
                            <li><a href="#projects" className="hover:text-primary transition-colors">Projects</a></li>
                            <li><a href="#blog" className="hover:text-primary transition-colors">Blog</a></li>
                            <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <a href="https://github.com/sabrinsingh" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="https://linkedin.com/in/sabrin-lal-singh-478218a0" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="mailto:sabrinlalsingh@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© {currentYear} Sabrin Singh. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
