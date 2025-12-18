import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Send, AlertCircle, CheckCircle2 } from "lucide-react";
import emailjs from "@emailjs/browser";

export function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: null, message: "" });

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            setStatus({
                type: "error",
                message: "EmailJS is not configured. Please check your environment variables.",
            });
            setIsSubmitting(false);
            return;
        }

        try {
            await emailjs.sendForm(
                serviceId,
                templateId,
                formRef.current!,
                publicKey
            );

            setStatus({
                type: "success",
                message: "Message sent successfully! I'll get back to you soon.",
            });
            formRef.current?.reset();
        } catch (error) {
            console.error("EmailJS Error:", error);
            setStatus({
                type: "error",
                message: "Failed to send message. Please try again later or email me directly.",
            });
        } finally {
            setIsSubmitting(false);
            // Clear success message after 5 seconds
            if (status.type === "success") {
                setTimeout(() => setStatus({ type: null, message: "" }), 5000);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-md mx-auto bg-card border border-border rounded-2xl p-8 shadow-lg"
        >
            <h3 className="text-2xl font-bold mb-6 text-center">Get in Touch</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="user_name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Name
                    </label>
                    <Input
                        id="user_name"
                        name="user_name"
                        placeholder="John Doe"
                        required
                        className="bg-background"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="user_email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Email
                    </label>
                    <Input
                        id="user_email"
                        name="user_email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="bg-background"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Message
                    </label>
                    <Textarea
                        id="message"
                        name="message"
                        placeholder="How can I help you?"
                        required
                        className="min-h-[120px] bg-background"
                    />
                </div>

                {status.message && (
                    <div
                        className={`p-3 rounded-lg text-sm flex items-center gap-2 ${status.type === "success"
                                ? "bg-emerald-500/10 text-emerald-500"
                                : "bg-destructive/10 text-destructive"
                            }`}
                    >
                        {status.type === "success" ? (
                            <CheckCircle2 className="w-4 h-4" />
                        ) : (
                            <AlertCircle className="w-4 h-4" />
                        )}
                        {status.message}
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        "Sending..."
                    ) : (
                        <>
                            Send Message <Send className="w-4 h-4 ml-2" />
                        </>
                    )}
                </Button>
            </form>
        </motion.div>
    );
}
