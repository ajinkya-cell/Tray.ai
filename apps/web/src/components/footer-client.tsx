"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import type {
  QueryFooterDataResult,
  QueryGlobalSeoSettingsResult,
} from "@workspace/sanity/types";
import { Logo } from "./logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "./social-icons";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type FooterClientProps = {
  data: NonNullable<QueryFooterDataResult>;
  settingsData: QueryGlobalSeoSettingsResult | null;
};

function SocialLinks({ data }: { data: NonNullable<QueryGlobalSeoSettingsResult>["socialLinks"] }) {
  if (!data) {
    return null;
  }

  const { facebook, twitter, instagram, youtube, linkedin } = data;

  const socialLinks = [
    {
      url: instagram,
      Icon: InstagramIcon,
      label: "Follow us on Instagram",
    },
    {
      url: facebook,
      Icon: FacebookIcon,
      label: "Follow us on Facebook",
    },
    { url: twitter, Icon: XIcon, label: "Follow us on Twitter" },
    {
      url: linkedin,
      Icon: LinkedinIcon,
      label: "Follow us on LinkedIn",
    },
    {
      url: youtube,
      Icon: YoutubeIcon,
      label: "Subscribe to our YouTube channel",
    },
  ].filter((link) => link.url);

  return (
    <ul className="flex items-center space-x-6 text-muted-foreground">
      {socialLinks.map(({ url, Icon, label }, index) => (
        <li
          className="font-medium hover:text-primary"
          key={`social-link-${url}-${index.toString()}`}
        >
          <Link
            aria-label={label}
            href={url ?? "#"}
            prefetch={false}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon className="fill-muted-foreground hover:fill-primary/80 dark:fill-zinc-400 dark:hover:fill-primary" />
            <span className="sr-only">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FooterClient({ data, settingsData }: FooterClientProps) {
  const { subtitle, columns } = data;
  const siteTitle = settingsData?.siteTitle ?? "";
  const logo = settingsData?.logo ?? null;
  const socialLinks = settingsData?.socialLinks ?? null;
  const year = new Date().getFullYear();
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-20 pb-8"
    >
      <section className="container mx-auto">
        <div className="h-auto">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-4 text-center md:px-6 lg:flex-row lg:text-left">
           

            {Array.isArray(columns) && columns?.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:mr-20 lg:gap-28 w-full">
                {columns.map((column, index) => (
                  <div key={`column-${column?._key}-${index}`}>
                    <h3 className="mb-6 font-semibold">{column?.title}</h3>
                    {column?.links && column?.links?.length > 0 && (
                      <ul className="space-y-2 text-muted-foreground text-sm dark:text-zinc-300">
                        {column?.links?.map((link, columnIndex) => (
                          <li
                            className="font-medium hover:text-primary"
                            key={`${link?._key}-${columnIndex}-column-${column?._key}`}
                          >
                            <Link
                              href={link.href ?? "#"}
                              rel={
                                link.openInNewTab
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              target={link.openInNewTab ? "_blank" : undefined}
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-8 lg:mt-20 border-t pt-8">
            <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 text-center font-normal text-zinc-200 text-sm md:px-6 lg:flex-row lg:items-center lg:text-left">
              <p>
                © {year} {siteTitle}. All rights reserved.
              </p>
              <ul className="flex justify-center gap-2 lg:justify-start">
                <li className="hover:text-primary">
                  <Link href="/terms">Terms and Conditions</Link>
                </li>
                <li className="hover:text-primary">
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </motion.footer>
  );
}
