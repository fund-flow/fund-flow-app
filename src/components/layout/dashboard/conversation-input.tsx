"use client";

import { ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ConversationInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}

export function ConversationInput({
  value,
  onChange,
  onSubmit,
}: ConversationInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-xl p-4 sm:p-6 flex items-center"
    >
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder="Start a conversation..."
        className="min-h-[40px] sm:min-h-[60px] resize-none rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 pr-16 sm:pr-20 transition-all duration-200 ease-in-out bg-white flex-grow placeholder:text-sm sm:placeholder:text-base"
        style={{ overflow: "hidden" }}
      />
      <Button
        type="submit"
        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 sm:py-2 sm:px-5 rounded-xl transition-all duration-200 ease-in-out shadow-md ml-1 sm:ml-2"
        disabled={!value.trim()}
      >
        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
    </form>
  );
}
