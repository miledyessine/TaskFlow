/* eslint-disable react/prop-types */

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Bookmark, Orbit, Calendar, CircleUserRound, Flag } from "lucide-react";

export function TaskView({ task, assignee, open, setOpen }) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[725px]">
                    <DialogHeader>
                        <DialogTitle>{task.name}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <div className="space-y-6 p-4 bg-white rounded-lg shadow-lg">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-2 w-full   p-2 rounded-md">
                                    <Orbit
                                        className="text-blue-500"
                                        size={18}
                                    />
                                    <h3 className="font-semibold text-gray-700">
                                        Status :
                                    </h3>
                                    <p className="text-gray-600">
                                        {task.status}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 w-full  p-2 rounded-md">
                                    <CircleUserRound
                                        className="text-green-500"
                                        size={18}
                                    />
                                    <h3 className="font-semibold text-gray-700">
                                        Assignee :
                                    </h3>
                                    <p className="text-gray-600">
                                        {assignee.username}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-2 w-full   p-2 rounded-md">
                                    <Bookmark
                                        className="text-purple-500"
                                        size={18}
                                    />
                                    <h3 className="font-semibold text-gray-700">
                                        Type Of Ticket :
                                    </h3>
                                    <p className="text-gray-600">
                                        {task.typeOfTicket}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 w-full   p-2 rounded-md">
                                    <Flag className="text-red-500" size={18} />
                                    <h3 className="font-semibold text-gray-700">
                                        Priority :
                                    </h3>
                                    <p className="text-gray-600">Urgent</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2  p-2 rounded-md">
                                <Calendar
                                    className="text-yellow-500"
                                    size={18}
                                />
                                <h3 className="font-semibold text-gray-700">
                                    Due Date :
                                </h3>
                                <p className="text-gray-600">
                                    {new Date(task.due_date).toLocaleDateString(
                                        "en-GB",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                        }
                                    )}
                                </p>
                            </div>

                            <div className=" p-2 rounded-md">
                                <h3 className="font-semibold text-gray-700 mb-2">
                                    Description :
                                </h3>
                                <p className="text-gray-600">
                                    {task.description}
                                </p>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>{task.name}</DrawerTitle>
                </DrawerHeader>
                <div className="space-y-6 p-4 bg-white rounded-lg shadow-lg">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 w-full   p-2 rounded-md">
                            <Orbit className="text-blue-500" size={18} />
                            <h3 className="font-semibold text-gray-700">
                                Status :
                            </h3>
                            <p className="text-gray-600">{task.status}</p>
                        </div>
                        <div className="flex items-center gap-2 w-full  p-2 rounded-md">
                            <CircleUserRound
                                className="text-green-500"
                                size={18}
                            />
                            <h3 className="font-semibold text-gray-700">
                                Assignee :
                            </h3>
                            <p className="text-gray-600">{task.assignee}</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 w-full p-2 rounded-md">
                            <Bookmark className="text-purple-500" size={18} />
                            <h3 className="font-semibold text-gray-700">
                                Type Of Ticket :
                            </h3>
                            <p className="text-gray-600">Bug</p>
                        </div>
                        <div className="flex items-center gap-2 w-full   p-2 rounded-md">
                            <Flag className="text-red-500" size={18} />
                            <h3 className="font-semibold text-gray-700">
                                Priority :
                            </h3>
                            <p className="text-gray-600">Urgent</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2  p-2 rounded-md">
                        <Calendar className="text-yellow-500" size={18} />
                        <h3 className="font-semibold text-gray-700">
                            Due Date :
                        </h3>
                        <p className="text-gray-600">{task.dueDate}</p>
                    </div>

                    <div className=" p-2 rounded-md">
                        <h3 className="font-semibold text-gray-700 mb-2">
                            Description :
                        </h3>
                        <p className="text-gray-600">{task.description}</p>
                    </div>
                </div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
