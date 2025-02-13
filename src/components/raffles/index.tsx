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
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15), // 15 days
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
        "https://images.unsplash.com/photo-1619767886558-efdc259b6e31?w=500",
      verified: true,
      createdAt: new Date(),
    },
    ticketPrice: 50,
    totalTickets: 2000,
    soldTickets: 1800,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "3",
    creator: "0x789",
    prize: {
      id: "3",
      name: "100,000 SLK Tokens",
      description: "Win a massive bag of SLK tokens",
      owner: "0x789",
      price: 100000,
      totalSupply: 100000,
      availableSupply: 100000,
      imageUrl:
        "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500",
      verified: true,
      createdAt: new Date(),
    },
    ticketPrice: 25,
    totalTickets: 5000,
    soldTickets: 2500,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20), // 20 days
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "4",
    creator: "0xabc",
    prize: {
      id: "4",
      name: "Luxury Watch Collection",
      description: "Collection of 3 premium luxury watches",
      owner: "0xabc",
      price: 75000,
      totalSupply: 1,
      availableSupply: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=500",
      verified: true,
      createdAt: new Date(),
    },
    ticketPrice: 75,
    totalTickets: 3000,
    soldTickets: 1200,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "5",
    creator: "0xdef",
    prize: {
      id: "5",
      name: "Gaming PC Setup",
      description: "Ultimate gaming setup with RTX 4090",
      owner: "0xdef",
      price: 8000,
      totalSupply: 1,
      availableSupply: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=500",
      verified: true,
      createdAt: new Date(),
    },
    ticketPrice: 20,
    totalTickets: 1000,
    soldTickets: 750,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "6",
    creator: "0xaaa",
    prize: {
      id: "6",
      name: "Luxury Yacht Weekend",
      description: "3-day luxury yacht experience in Monaco",
      owner: "0xaaa",
      price: 45000,
      totalSupply: 1,
      availableSupply: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=500",
      verified: true,
      createdAt: new Date(),
    },
    ticketPrice: 40,
    totalTickets: 2500,
    soldTickets: 1800,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10), // 10 days
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "7",
    creator: "0xbbb",
    prize: {
      id: "7",
      name: "Bitcoin Mining Rig",
      description: "Professional crypto mining setup",
      owner: "0xbbb",
      price: 25000,
      totalSupply: 1,
      availableSupply: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1631897642056-97a7abff6818?w=500",
      verified: true,
      createdAt: new Date(),
    },
    ticketPrice: 30,
    totalTickets: 2000,
    soldTickets: 1500,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12), // 12 days
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "8",
    creator: "0xccc",
    prize: {
      id: "8",
      name: "Private Island Getaway",
      description: "1-week stay at a private island resort",
      owner: "0xccc",
      price: 35000,
      totalSupply: 1,
      availableSupply: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=500",
      verified: true,
      createdAt: new Date(),
    },
    ticketPrice: 35,
    totalTickets: 3000,
    soldTickets: 2200,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8), // 8 days
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "9",
    creator: "0xddd",
    prize: {
      id: "9",
      name: "Rare NFT Collection",
      description: "Bundle of 5 rare NFTs from top collections",
      owner: "0xddd",
      price: 50000,
      totalSupply: 1,
      availableSupply: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500",
      verified: true,
      createdAt: new Date(),
    },
    ticketPrice: 45,
    totalTickets: 4000,
    soldTickets: 3000,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6), // 6 days
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "10",
    creator: "0xeee",
    prize: {
      id: "10",
      name: "Smart Home Package",
      description: "Complete smart home automation system",
      owner: "0xeee",
      price: 15000,
      totalSupply: 1,
      availableSupply: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1558002038-1055907df827?w=500",
      verified: true,
      createdAt: new Date(),
    },
    ticketPrice: 25,
    totalTickets: 1500,
    soldTickets: 1000,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4), // 4 days
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "11",
    creator: "0xfff",
    prize: {
      id: "11",
      name: "Supercar Track Day",
      description: "Full day experience with 5 different supercars",
      owner: "0xfff",
      price: 20000,
      totalSupply: 1,
      availableSupply: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=500",
      verified: true,
      createdAt: new Date(),
    },
    ticketPrice: 30,
    totalTickets: 2000,
    soldTickets: 1600,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 9), // 9 days
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "12",
    creator: "0xggg",
    prize: {
      id: "12",
      name: "Exclusive Sneaker Collection",
      description: "10 pairs of limited edition sneakers",
      owner: "0xggg",
      price: 12000,
      totalSupply: 1,
      availableSupply: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500",
      verified: true,
      createdAt: new Date(),
    },
    ticketPrice: 20,
    totalTickets: 1500,
    soldTickets: 1200,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "13",
    creator: "0xhhh",
    prize: {
      id: "13",
      name: "Luxury Watch Collection",
      description: "Set of 3 premium luxury timepieces",
      owner: "0xhhh",
      price: 85000,
      totalSupply: 1,
      availableSupply: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=500",
      verified: true,
      createdAt: new Date(),
    },
    ticketPrice: 70,
    totalTickets: 3500,
    soldTickets: 2800,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 14 days
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "14",
    creator: "0xiii",
    prize: {
      id: "14",
      name: "VIP Concert Package",
      description: "VIP access to 5 major concerts of your choice",
      owner: "0xiii",
      price: 10000,
      totalSupply: 1,
      availableSupply: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500",
      verified: true,
      createdAt: new Date(),
    },
    ticketPrice: 15,
    totalTickets: 2000,
    soldTickets: 1700,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 11), // 11 days
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "15",
    creator: "0xjjj",
    prize: {
      id: "15",
      name: "Michelin Star Restaurant Tour",
      description: "Dining experience at 5 Michelin-starred restaurants",
      owner: "0xjjj",
      price: 15000,
      totalSupply: 1,
      availableSupply: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500",
      verified: true,
      createdAt: new Date(),
    },
    ticketPrice: 25,
    totalTickets: 1800,
    soldTickets: 1400,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 13), // 13 days
    status: "active",
    createdAt: new Date(),
  },
];

export default function Raffles() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getTimeLeft = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h left`;
  };

  const filteredRaffles = MOCK_RAFFLES.filter((raffle) => {
    if (activeTab === "ending-soon") {
      const timeLeft =
        (raffle.endDate.getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24);
      return timeLeft <= 7;
    }
    if (activeTab === "high-value") {
      return raffle.prize.price >= 50000;
    }
    return true;
  }).filter(
    (raffle) =>
      raffle.prize.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      raffle.prize.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  return (
    <MainLayout>
      <HowItWorks />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Raffles</h1>
            <p className="text-muted-foreground">
              Enter exciting raffles to win amazing prizes
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            Create Raffle
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search raffles..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="ending-soon">Ending Soon</TabsTrigger>
                <TabsTrigger value="high-value">High Value</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRaffles.map((raffle) => (
              <Card key={raffle.id} className="flex flex-col">
                <CardHeader>
                  <div className="relative">
                    <img
                      src={raffle.prize.imageUrl}
                      alt={raffle.prize.name}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <Badge
                      className="absolute top-2 right-2"
                      variant={
                        raffle.soldTickets / raffle.totalTickets > 0.8
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {getTimeLeft(raffle.endDate)}
                    </Badge>
                  </div>
                  <CardTitle className="line-clamp-1">
                    {raffle.prize.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <p className="text-muted-foreground line-clamp-2">
                    {raffle.prize.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-[#FB6415]" />
                      <div className="text-sm">
                        <p className="font-medium">
                          ${raffle.prize.price.toLocaleString()}
                        </p>
                        <p className="text-muted-foreground">Prize Value</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#FB6415]" />
                      <div className="text-sm">
                        <p className="font-medium">{raffle.soldTickets}</p>
                        <p className="text-muted-foreground">Participants</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tickets Sold</span>
                      <span className="text-[#FB6415]">
                        {(
                          (raffle.soldTickets / raffle.totalTickets) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <Progress
                      value={(raffle.soldTickets / raffle.totalTickets) * 100}
                      className="h-2"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex-col space-y-2">
                  <div className="flex justify-between w-full text-sm mb-2">
                    <span>Ticket Price</span>
                    <span className="font-medium">
                      {raffle.ticketPrice} USDC
                    </span>
                  </div>
                  <Button className="w-full bg-[#FB6415] hover:bg-[#FB6415]/90">
                    Buy Ticket
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <CreateRaffleDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </MainLayout>
  );
}
