"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from "axios";
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
import { CommandList } from "cmdk";

//value->only small letter allowed

interface receptient {
  value: string;
  label: string;
  id: number;
}
interface ComboBoxProps {
  value: number;
  setValue: (value: number) => void;
  value2: string;
  setValue2: (value: string) => void;
}

export function ComboBox({
  value,
  setValue,
  value2,
  setValue2,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState<boolean>(false);

  const [receptient, setReceptient] = React.useState<receptient[]>([]);
  React.useLayoutEffect(() => {
    const getReceptient = async (docId: number) => {
      const result = await axios.post(
        "http://localhost:3000/api/document/getreceptient",
        docId
      );
      const receptientres = result?.data;
      console.log(result);
      const receptientLabel = receptientres?.result?.map((item: any) => {
        //save email in small letter in db
        return { label: item.name, value: item.email, id: item.id };
      });
      console.log(receptientLabel);
      setReceptient(receptient ? receptientLabel : null);
    };
    getReceptient(1);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between p-4 h-10"
        >
          {value2
            ? receptient?.find((item: any) => item.value === value2)?.label
            : "Select Signer"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full  p-1 h-full" align="start">
        <Command label="Command Menu">
          <CommandInput placeholder="Search Signer" />
          <CommandEmpty>No Signer Found</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {receptient?.map((item: any) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    // console.log(currentValue, value);
                    setValue2(currentValue === value2 ? "" : currentValue);
                    setValue(item.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value2 === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ComboBox;
