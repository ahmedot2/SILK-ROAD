import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HowItWorks } from "./HowItWorks";
import { Progress } from "@/components/ui/progress";
import { type Raffle } from "@/types";
import { Clock, Search, Trophy, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateRaffleDialog } from "./CreateRaffleDialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const MOCK_RAFFLES: Raffle[] = [
  {
    id: "1",
    creator: "0x123",
    prize: {
      id: "1",
      name: "Luxury Dubai Apartment",
      description: "Win a fully furnished luxury apartment in Dubai Marina",
      owner: "0x123",
      price: 500000,
      totalSupply: 1,
      availableSupply: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500",
      verified: true,
      createdAt: new Date(),
    },
    ticketPrice: 100,
    totalTickets: 10000,
    soldTickets: 4500,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "2",
    creator: "0x456",
    prize: {
      id: "2",
      name: "Tesla Model Y 2024",
      description: "Brand new Tesla Model Y Performance Edition",
      owner: "0x456",
      price: 65000,
      totalSupply: 1,
      availableSupply: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500",
      verified: true,
      createdAt: new Date(),
    },
    ticketPrice: 50,
    totalTickets: 2000,
    soldTickets: 1800,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    status: "active",
    createdAt: new Date(),
  },
  // ... rest of the raffles remain the same
];

export default function Raffles() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <MainLayout>
      <div className="space-y-6">
        <HowItWorks />

        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Raffles</h1>
            <p className="text-muted-foreground">
              Win exclusive prizes with SLK tokens
            </p>
          </div>
          <Button
            className="bg-[#FB6415] hover:bg-[#FB6415]/90"
            onClick={() => setShowCreateDialog(true)}
          >
            <Trophy className="mr-2 h-4 w-4" /> Create Raffle
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search raffles..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="my-tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="ended">Ended</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_RAFFLES.map((raffle) => (
                <Card key={raffle.id} className="relative overflow-hidden">
                  <CardHeader>
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                      <img
                        src={raffle.prize.imageUrl}
                        alt={raffle.prize.name}
                        className="object-cover w-full h-full"
                      />
                      <Badge
                        className="absolute top-2 right-2"
                        variant={
                          raffle.status === "active" ? "default" : "secondary"
                        }
                      >
                        {raffle.status.charAt(0).toUpperCase() +
                          raffle.status.slice(1)}
                      </Badge>
                    </div>
                    <CardTitle>{raffle.prize.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {raffle.prize.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-[#FB6415]" />
                        <div>
                          <p className="font-medium">
                            ${raffle.prize.price.toLocaleString()}
                          </p>
                          <p className="text-muted-foreground">Prize Value</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[#FB6415]" />
                        <div>
                          <p className="font-medium">
                            {raffle.soldTickets}/{raffle.totalTickets}
                          </p>
                          <p className="text-muted-foreground">Tickets Sold</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {Math.round(
                            (raffle.soldTickets / raffle.totalTickets) * 100,
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={(raffle.soldTickets / raffle.totalTickets) * 100}
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {Math.ceil(
                          (raffle.endDate.getTime() - Date.now()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        days left
                      </div>
                      <span className="font-medium">
                        {raffle.ticketPrice} SLK/ticket
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-[#FB6415] hover:bg-[#FB6415]/90">
                      Buy Tickets
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <CreateRaffleDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
        />
      </div>
    </MainLayout>
  );
}
