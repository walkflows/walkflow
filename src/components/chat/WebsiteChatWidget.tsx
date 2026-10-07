"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { chatCopy, chatLinks } from "@/content/chat-assistant";
import { IconChat, IconClose } from "@/components/ui/icons";
import type { ChatApiResponse, ChatLink, ChatReply } from "@/lib/chat/types";

type Message = {
  id: number;
  from: "assistant" | "user";
  text: string;
  links?: ChatLink[];
  suggestions?: string[];
};

const welcomeMessage: Message = { id: 0, from: "assistant", text: chatCopy.welcome, suggestions: chatCopy.starters };

export function WebsiteChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const nextId = useRef(1);
  const inFlight = useRef(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const inputId = useId();
  const panelId = useId();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, pending]);

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  function append(message: Omit<Message, "id">) {
    setMessages((current) => [...current, { ...message, id: nextId.current++ }]);
  }

  async function send(rawText: string) {
    const text = rawText.trim();
    if (!text || inFlight.current) return;
    inFlight.current = true;
    append({ from: "user", text });
    setDraft("");
    setPending(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = (await response.json()) as ChatApiResponse;
      if ("reply" in data) {
        const reply: ChatReply = data.reply;
        append({ from: "assistant", text: reply.text, links: reply.links, suggestions: reply.suggestions });
      } else {
        append({ from: "assistant", text: data.error.message, links: [chatLinks.contactWalkflow] });
      }
    } catch {
      append({ from: "assistant", text: chatCopy.networkError, links: [chatLinks.contactWalkflow] });
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send(draft);
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <motion.section
          id={panelId}
          role="dialog"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
          onKeyDown={(event) => {
            if (event.key === "Escape") close();
          }}
          className="flex max-h-[min(34rem,calc(100dvh-10rem))] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-orange/30 bg-navy shadow-[0_20px_45px_-24px_rgba(0,0,0,0.6),0_0_22px_-14px_rgba(255,153,28,0.22)]"
        >
          <header className="flex items-start justify-between gap-3 border-b border-white/10 bg-navy-deep px-5 py-4">
            <div className="min-w-0">
              <h2 id={titleId} className="text-base text-white">
                {chatCopy.title}
              </h2>
              <p id={descriptionId} className="mt-1 text-xs leading-relaxed text-white/55">
                {chatCopy.disclosure}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={chatCopy.closeLabel}
              className="-mr-2 -mt-2 flex h-11 w-11 flex-none items-center justify-center rounded-full text-white/70 transition-colors hover:text-orange"
            >
              <IconClose className="h-4 w-4" />
            </button>
          </header>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-4"
          >
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} disabled={pending} onSuggest={send} />
            ))}
            {pending && (
              <p role="status" className="text-xs text-white/50">
                {chatCopy.thinking}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-white/10 p-3">
            <label htmlFor={inputId} className="sr-only">
              {chatCopy.inputLabel}
            </label>
            <input
              id={inputId}
              ref={inputRef}
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={500}
              autoComplete="off"
              placeholder={chatCopy.inputPlaceholder}
              className="min-w-0 flex-1 rounded-full border border-white/15 bg-navy-deep px-4 py-2.5 text-sm text-white placeholder:text-white/45 focus-visible:outline-2 focus-visible:outline-orange"
            />
            <button
              type="submit"
              disabled={pending || draft.trim().length === 0}
              className="flex-none rounded-full bg-orange px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-orange-hover disabled:opacity-50"
            >
              {chatCopy.sendLabel}
            </button>
          </form>
        </motion.section>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${chatCopy.launcherLabel}: chat with the WALKFLOW assistant`}
        className="flex h-14 items-center gap-2 rounded-full border border-white/15 bg-navy-deep pl-2 pr-2 text-white shadow-[var(--shadow-card)] transition-colors hover:border-orange/60 sm:pr-5"
      >
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-orange text-navy">
          <IconChat className="h-5 w-5" />
        </span>
        <span className="hidden text-sm font-semibold sm:inline">{chatCopy.launcherLabel}</span>
      </button>
    </div>
  );
}

function MessageBubble({
  message,
  disabled,
  onSuggest,
}: {
  message: Message;
  disabled: boolean;
  onSuggest: (text: string) => void;
}) {
  if (message.from === "user") {
    return (
      <p className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-orange px-4 py-2.5 text-sm leading-relaxed text-navy">
        {message.text}
      </p>
    );
  }

  return (
    <div className="flex max-w-[92%] flex-col gap-3">
      <p className="rounded-2xl rounded-tl-sm bg-white/[0.07] px-4 py-3 text-sm leading-relaxed text-white/90">
        {message.text}
      </p>
      {message.links && message.links.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {message.links.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className="inline-flex min-h-11 items-center rounded-full border border-orange/40 px-3.5 text-xs font-bold uppercase tracking-wide text-orange transition-colors hover:bg-orange hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
      {message.suggestions && message.suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {message.suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              disabled={disabled}
              onClick={() => onSuggest(suggestion)}
              className="min-h-11 rounded-full border border-white/20 px-3.5 py-2 text-left text-xs text-white/85 transition-colors hover:border-orange hover:text-orange disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
