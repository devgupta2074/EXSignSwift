"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "User Settings",
    label: "User Settings",
    class: "",
  },
  {
    value: "Sign Out",
    label: "Sign Out",
    class: "text-red-600",
  },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="custom"
          role="combobox"
          size="default"
          aria-expanded={open}
          className="w-[200px] justify-between bg-gray-700 "
        >
          {value ? (
            frameworks.find((framework) => framework.value === value)?.label
          ) : (
            <div className=" flex  gap-2">
              {" "}
              <Avatar>
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback className="text-gray-400 bg-black">
                  CN
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p>Dev Gupta</p>
                <p className="text-[0.78rem] text-gray-300">Personal Acount</p>
              </div>
            </div>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 ",

                    value === framework.value ? "opacity-100" : "opacity-0 "
                  )}
                />
                <p className={framework.class}>{framework.label}</p>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
