"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock, Send, User, AtSign, MessageSquare, Tag, Loader2, CheckCircle2 } from "lucide-react";
import { sendContactEmail } from "@/server_actions/send-contact-email";
import { FadeIn } from "@/components/motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BUSINESS } from "@/lib/general/constants";
import { LocationMap } from "@/components/ui/expand-map";

const SUBJECT_KEYS = [
  "general",
  "wedding",
  "christening",
  "graduation",
  "corporate",
  "other",
] as const;

export function ContactSection() {
  const t = useTranslations("Contact");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const result = await sendContactEmail({
      ...form,
      subject: t(`form.subjects.${form.subject}`),
    });

    if (result.success) {
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", subject: "general", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-muted/50 overflow-hidden">
      {/* Decorative top border — thin gold line */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl tracking-tight text-foreground mb-4">
            {t("title")}
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-0.5 w-16 bg-gold rounded-full" />
            <div className="size-1 rounded-full bg-gold" />
          </div>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </FadeIn>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* ── Left Column: Contact Info + Map (2/5 = 40%) ── */}
          <FadeIn direction="left" className="lg:col-span-2 flex flex-col gap-6">
            {/* Contact info cards */}
            <div className="space-y-4">
              {/* Address */}
              <ContactInfoCard
                icon={<MapPin className="size-4" />}
                label={t("info.address")}
              >
                <span className="text-sm text-foreground leading-relaxed">
                  {BUSINESS.address.full}
                </span>
              </ContactInfoCard>

              {/* Phone */}
              <ContactInfoCard
                icon={<Phone className="size-4" />}
                label={t("info.phone")}
              >
                <a
                  href={BUSINESS.phoneHref}
                  className="text-sm text-foreground hover:text-gold transition-colors duration-300"
                >
                  {BUSINESS.phone}
                </a>
              </ContactInfoCard>

              {/* Email */}
              <ContactInfoCard
                icon={<Mail className="size-4" />}
                label={t("info.email")}
              >
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-sm text-foreground hover:text-gold transition-colors duration-300 break-all"
                >
                  {BUSINESS.email}
                </a>
              </ContactInfoCard>

              {/* Hours */}
              <ContactInfoCard
                icon={<Clock className="size-4" />}
                label={t("info.hours")}
              >
                <div className="w-full space-y-1.5 text-sm">
                  <HoursRow
                    day={t("hours.weekdays")}
                    time={`${BUSINESS.hours.weekdays.open}–${BUSINESS.hours.weekdays.close}`}
                  />
                  <HoursRow
                    day={t("hours.saturday")}
                    time={`${BUSINESS.hours.saturday.open}–${BUSINESS.hours.saturday.close}`}
                  />
                  <HoursRow
                    day={t("hours.sunday")}
                    time={`${BUSINESS.hours.sunday.open}–${BUSINESS.hours.sunday.close}`}
                  />
                </div>
              </ContactInfoCard>
            </div>

            {/* Interactive map card */}
            <LocationMap
              location={BUSINESS.address.full}
              coordinates="37.9300° N, 23.7500° E"
              mapsUrl={BUSINESS.googleMapsLink}
            />
          </FadeIn>

          {/* ── Right Column: Contact Form (3/5 = 60%) ── */}
          <FadeIn direction="right" delay={0.2} className="lg:col-span-3">
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="rounded-xl border border-border/60 bg-card/70 backdrop-blur-sm p-8 md:p-10 shadow-sm space-y-6"
            >
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField label={t("form.name")} htmlFor="contact-name">
                  <IconInput icon={<User className="size-4" />}>
                    <Input
                      id="contact-name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t("form.namePlaceholder")}
                      className="pl-9"
                      required
                    />
                  </IconInput>
                </FormField>

                <FormField label={t("form.email")} htmlFor="contact-email">
                  <IconInput icon={<AtSign className="size-4" />}>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t("form.emailPlaceholder")}
                      className="pl-9"
                      required
                    />
                  </IconInput>
                </FormField>
              </div>

              {/* Phone + Subject row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField label={t("form.phone")} htmlFor="contact-phone">
                  <IconInput icon={<Phone className="size-4" />}>
                    <Input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={t("form.phonePlaceholder")}
                      className="pl-9"
                    />
                  </IconInput>
                </FormField>

                <FormField label={t("form.subject")} htmlFor="contact-subject">
                  <IconInput icon={<Tag className="size-4" />}>
                    <Select
                      value={form.subject}
                      onValueChange={(value) =>
                        setForm((prev) => ({ ...prev, subject: value }))
                      }
                    >
                      <SelectTrigger id="contact-subject" className="w-full pl-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECT_KEYS.map((key) => (
                          <SelectItem key={key} value={key}>
                            {t(`form.subjects.${key}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </IconInput>
                </FormField>
              </div>

              {/* Message */}
              <FormField label={t("form.message")} htmlFor="contact-message">
                <IconInput icon={<MessageSquare className="size-4" />} alignTop>
                  <Textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t("form.messagePlaceholder")}
                    className="pl-9"
                    rows={5}
                    required
                  />
                </IconInput>
              </FormField>

              {/* Status message */}
              {status === "sent" && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm text-emerald-400">
                  <CheckCircle2 className="size-4 shrink-0" />
                  {t("form.success")}
                </div>
              )}
              {status === "error" && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
                  {t("form.error")}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full h-11 bg-gold text-white font-semibold hover:bg-gold-light transition-colors duration-300 cursor-pointer disabled:opacity-50"
              >
                {status === "sending" ? (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                ) : (
                  <Send className="size-4 mr-2" />
                )}
                {status === "sending" ? t("form.sending") : t("form.send")}
              </Button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── Sub-components ────────────────────────────────────── */

function ContactInfoCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group flex items-start gap-4 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-gold/5 hover:border-gold/30">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold/20">
        {icon}
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}

function HoursRow({ day, time }: { day: string; time: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-muted-foreground">{day}</span>
      <span className="font-medium text-foreground tabular-nums">{time}</span>
    </div>
  );
}

function FormField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function IconInput({
  icon,
  alignTop,
  children,
}: {
  icon: React.ReactNode;
  alignTop?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className={`absolute left-3 z-10 text-muted-foreground pointer-events-none ${alignTop ? "top-3" : "top-1/2 -translate-y-1/2"}`}>
        {icon}
      </div>
      {children}
    </div>
  );
}
