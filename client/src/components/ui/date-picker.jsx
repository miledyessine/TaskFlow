/* eslint-disable react/prop-types */
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ onSelect,disabledBtn ,datePlaceholder}) {
    const [date, setDate] = useState();

    const handleDateSelect = (selectedDate) => {
        setDate(selectedDate);
        onSelect(selectedDate); 
    };

    return (
        <Popover>
            <PopoverTrigger  asChild>
                <Button disabled={disabledBtn} 
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "MM/dd/yyyy") : <span>{datePlaceholder||"Pick a date"}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent  className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                    
                />
            </PopoverContent>
        </Popover>
    );
}
