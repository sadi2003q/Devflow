import React from "react";

type ISidebarButton = {
    setSidebarOpen: (value: React.SetStateAction<boolean>) => void
}
export const SidebarButton_Mobile = (
    {setSidebarOpen}: ISidebarButton
) => {
    return (
        <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
        ></div>
    )
}