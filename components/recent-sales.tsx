import { Avatar } from "@/components/ui/avatar";

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <div className="font-semibold">JD</div>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">John Doe</p>
          <p className="text-sm text-muted-foreground">john@example.com</p>
        </div>
        <div className="ml-auto font-medium">+₹429.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <div className="font-semibold">JS</div>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jane Smith</p>
          <p className="text-sm text-muted-foreground">jane@example.com</p>
        </div>
        <div className="ml-auto font-medium">+₹829.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <div className="font-semibold">RJ</div>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Robert Johnson</p>
          <p className="text-sm text-muted-foreground">robert@example.com</p>
        </div>
        <div className="ml-auto font-medium">+₹659.00</div>
      </div>
    </div>
  );
}