"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BUSINESS } from "@/lib/general/constants";

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[${t(`form.subjects.${form.subject}`)}] — ${form.name}`
    );
    const body = encodeURIComponent(
      `${t("form.name")}: ${form.name}\n${t("form.email")}: ${form.email}\n${t("form.phone")}: ${form.phone}\n\n${form.message}`
    );
    window.location.href = `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-24 bg-muted/50 overflow-hidden">
      {/* Decorative top border — thin gold line */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
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
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* ── Left Column: Contact Info + Map (2/5 = 40%) ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
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

            {/* Google Maps embed */}
            <div className="rounded-xl overflow-hidden border border-border/60 shadow-sm aspect-[4/3]">
              <iframe
                title="MΩISIS Flower Design location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS.address.full)}&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          {/* ── Right Column: Contact Form (3/5 = 60%) ── */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-border/60 bg-card/70 backdrop-blur-sm p-8 md:p-10 shadow-sm space-y-6"
            >
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField label={t("form.name")} htmlFor="contact-name">
                  <Input
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("form.namePlaceholder")}
                    required
                  />
                </FormField>

                <FormField label={t("form.email")} htmlFor="contact-email">
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t("form.emailPlaceholder")}
                    required
                  />
                </FormField>
              </div>

              {/* Phone + Subject row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField label={t("form.phone")} htmlFor="contact-phone">
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={t("form.phonePlaceholder")}
                  />
                </FormField>

                <FormField label={t("form.subject")} htmlFor="contact-subject">
                  <select
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
                  >
                    {SUBJECT_KEYS.map((key) => (
                      <option key={key} value={key}>
                        {t(`form.subjects.${key}`)}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              {/* Message */}
              <FormField label={t("form.message")} htmlFor="contact-message">
                <Textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t("form.messagePlaceholder")}
                  rows={5}
                  required
                />
              </FormField>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-11 bg-gold text-white font-semibold hover:bg-gold-light transition-colors duration-300 cursor-pointer"
              >
                <Send className="size-4 mr-2" />
                {t("form.send")}
              </Button>
            </form>
          </div>
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
