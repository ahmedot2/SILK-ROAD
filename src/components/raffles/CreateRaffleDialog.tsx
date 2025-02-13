import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Upload } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CreateRaffleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateRaffleDialog({
  open,
  onOpenChange,
}: CreateRaffleDialogProps) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();

  const renderPrizeDetails = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Prize Name</label>
        <Input placeholder="Enter prize name" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea placeholder="Describe the prize" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Prize Value (USD)</label>
        <Input type="number" placeholder="0.00" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Prize Image</label>
        <Card className="cursor-pointer hover:border-[#FB6415]/40 transition-colors">
          <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Click to upload image
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderRaffleDetails = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Ticket Price (USDC)</label>
        <Input type="number" placeholder="0.00" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Total Tickets</label>
        <Input type="number" placeholder="Enter total number of tickets" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">End Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Raffle</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between mb-4">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-2 w-1/2 ${s === step ? "bg-[#FB6415]" : "bg-muted"}`}
              />
            ))}
          </div>

          {step === 1 && renderPrizeDetails()}
          {step === 2 && renderRaffleDetails()}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              className="bg-[#FB6415] hover:bg-[#FB6415]/90"
              onClick={() =>
                step === 2 ? onOpenChange(false) : setStep((s) => s + 1)
              }
            >
              {step === 2 ? "Create Raffle" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
