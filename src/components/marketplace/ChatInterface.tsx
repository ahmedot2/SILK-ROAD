import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface ChatMessage {
  id: string;
  senderId: string;
  message: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  open: boolean;
  onClose: () => void;
  seller: {
    id: string;
    name: string;
    avatar?: string;
  };
  listingId: string;
  onSendMessage: (message: string) => void;
}

export function ChatInterface({
  open,
  onClose,
  seller,
  listingId,
  onSendMessage,
}: ChatInterfaceProps) {
  const [message, setMessage] = useState("");
  const [messages] = useState<ChatMessage[]>([
    {
      id: "1",
      senderId: seller.id,
      message:
        "Hello! Let me know if you have any questions about the listing.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Chat with {seller.name}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[400px]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === seller.id ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${msg.senderId === seller.id ? "bg-muted" : "bg-primary text-primary-foreground"}`}
                  >
                    <p>{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-4 flex gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
