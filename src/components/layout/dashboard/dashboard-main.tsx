"use client";

import { useEffect, useMemo, useState } from "react";
import { Message, useChat } from "ai/react";
import { v4 as uuidv4 } from "uuid";

import BlurFade from "@/components/ui/blur-fade";
import TypingAnimation from "@/components/ui/typing-animation";
import { ConversationInput } from "@/components/layout/dashboard/conversation-input";
import { AIInput } from "@/components/layout/dashboard/ai-input";
import { AIResponseModal } from "@/components/layout/dashboard/ai-response-modal";
import {
  getRandomSuggestions,
  type Suggestion,
} from "@/components/layout/dashboard/data/suggestions";
import { SuggestionCard } from "@/components/layout/dashboard/suggestion-card";

interface SectionTitleProps {
  children: React.ReactNode;
}

function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="mb-2 px-1 text-sm font-medium text-muted-foreground/80">
      {children}
    </h2>
  );
}

export function DashboardMain() {
  const [chatId] = useState(() => uuidv4());
  const [isClient, setIsClient] = useState(false);
  const suggestions = useMemo(() => getRandomSuggestions(4), []); 
  const [aiResponse, setAiResponse] = useState<{ assets: string[]; allocations: number[]; analysis: { asset_name: string; reason: string }[] } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { input, handleSubmit, setInput } = useChat({
    id: chatId,
    initialMessages: [] as Message[],
    body: { id: chatId },
  });

  // Handle client-side initialization
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent hydration mismatch by not rendering client components on server
  if (!isClient) {
    return null;
  }

  // const handleSend = async (value: string) => {
  //   if (!value.trim()) return;

  //   const fakeEvent = {
  //     preventDefault: () => {},
  //     type: "submit",
  //   } as React.FormEvent;

  //   await handleSubmit(fakeEvent, {
  //     data: value,
  //   });
  // };
  const handleAIResponse = (data: any) => {
    console.log("AI Response:", data);
    if (data && Array.isArray(data.assets) && Array.isArray(data.allocations) && Array.isArray(data.analysis)) {
      setAiResponse(data);
      setModalOpen(true);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Top Section - Typing Animation */}
      <div className="flex-none pt-12 px-4 sm:px-6">
        <BlurFade delay={0.2}>
          <TypingAnimation
            className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-center text-3xl sm:text-4xl font-semibold tracking-tight text-transparent md:text-4xl lg:text-5xl"
            duration={50}
            text="How may I assist you today?"
          />
        </BlurFade>
      </div>

      {/* Middle Section - Scrollable Content */}
      <div className="mx-auto my-8 w-full max-w-3xl px-4 sm:px-6">
        <div className="space-y-8">
          <BlurFade delay={0.2}>
            <div className="space-y-2">
              <SectionTitle>Suggestions</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {suggestions.map((suggestion: Suggestion, index: number) => (
                  <SuggestionCard
                    key={suggestion.title}
                    {...suggestion}
                    delay={0.3 + index * 0.1}
                    onSelect={setInput}
                  />
                ))}
              </div>
            </div>
          </BlurFade>
        </div>
      </div>

      {/* Bottom Section - Input */}
      <div className="flex h-screen flex-col">
        <div className="mx-auto my-8 w-full max-w-3xl px-4 sm:px-6">
          <AIInput onResult={handleAIResponse} />
        </div>

        {/* AI Response Modal */}
        {aiResponse && <AIResponseModal open={modalOpen} onClose={() => setModalOpen(false)} data={aiResponse} />}
      </div>

    </div>
  );
}
