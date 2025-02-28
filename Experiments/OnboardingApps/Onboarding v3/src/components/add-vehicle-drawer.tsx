import { useFetcher } from "@remix-run/react";
import { CirclePlus, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { CarWireframeFront } from "src/assets/car-wireframe-front";
import { CarWireframeSide } from "src/assets/car-wireframe-side";
import { Button } from "src/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "src/components/ui/drawer";
import { Input } from "src/components/ui/input";

export const AddVehicleDrawer = () => {
  const fetcher = useFetcher();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.ok) {
      setIsOpen(false);
    }
  }, [fetcher]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <CirclePlus className="mr-2 h-4 w-4" /> Add vehicle
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-2xl mx-auto flex items-center sm:rounded-2xl sm:bottom-4 sm:after:hidden">
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="ADD_VEHICLE" />
          <div className="flex flex-col gap-9 max-w-md m-4 sm:my-8">
            <div className="flex flex-col gap-4">
              <DrawerTitle>What’s the VIN?</DrawerTitle>
              <Input
                name="vin"
                placeholder="VIN"
                onChange={(e) =>
                  (e.target.value = e.target.value.toUpperCase())
                }
              />
              {fetcher.state === "idle" && fetcher.data?.error ? (
                <p className="text-destructive text-sm -mt-3">
                  {fetcher.data.error}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-4">
              <p className="mb-2">
                Don’t have the Vehicle Identification Number (VIN) handy? Here’s
                where to find it.
              </p>

              <div className="relative flex gap-4 items-center">
                <CarWireframeFront className="w-24 h-auto shrink-0" />
                <div className="absolute top-[18px] left-[56px] size-2">
                  <div className="absolute size-full rounded-full bg-green-400 opacity-80 animate-slow-ping" />
                  <div className="absolute size-full rounded-full border border-background bg-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Driver side dashboard
                  </p>
                  <p className="text-sm">Just look through the windshield.</p>
                </div>
              </div>

              <div className="relative flex gap-4 items-center">
                <CarWireframeSide className="w-24 h-auto shrink-0" />
                <div className="absolute bottom-[15px] left-[52px] size-2">
                  <div className="absolute size-full rounded-full bg-green-400 opacity-80 animate-slow-ping" />
                  <div className="absolute size-full rounded-full border border-background bg-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Driver side door jamb
                  </p>
                  <p className="text-sm">
                    Look for a sticker with lots of numbers and letters.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button disabled={fetcher.state !== "idle"}>
                {fetcher.state !== "idle" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Fetching your vehicle...
                  </>
                ) : (
                  "Add vehicle"
                )}
              </Button>
              <DrawerClose asChild>
                <Button className="w-full" variant="ghost">
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </div>
        </fetcher.Form>
      </DrawerContent>
    </Drawer>
  );
};
