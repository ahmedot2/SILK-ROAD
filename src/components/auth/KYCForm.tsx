import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth";

export function KYCForm() {
  const [documentType, setDocumentType] = useState<string>();
  const [documentNumber, setDocumentNumber] = useState("");
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, setUser, setError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentType || !documentNumber || !documentFile) return;

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("documentType", documentType);
      formData.append("documentNumber", documentNumber);
      formData.append("document", documentFile);

      const response = await fetch("/api/kyc/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // Update user KYC status
      setUser({ ...user!, kycStatus: "pending" });
    } catch (error) {
      console.error("KYC submission failed:", error);
      setError("Failed to submit KYC documents");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>KYC Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Document Type</label>
            <Select onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="id_card">ID Card</SelectItem>
                <SelectItem value="driving_license">Driving License</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Document Number</label>
            <Input
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              placeholder="Enter document number"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Upload Document</label>
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
            />
          </div>

          <Button
            type="submit"
            disabled={
              isSubmitting || !documentType || !documentNumber || !documentFile
            }
            className="w-full bg-[#FB6415] hover:bg-[#FB6415]/90"
          >
            {isSubmitting ? "Submitting..." : "Submit KYC"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
