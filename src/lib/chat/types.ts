export type ChatLink = { label: string; href: string };

export type ChatReply = {
  text: string;
  links: ChatLink[];
  suggestions: string[];
};

export type ChatApiResponse = { reply: ChatReply } | { error: { code: string; message: string } };
