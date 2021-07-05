import React from "react";

import Sidebar from "../components/Sidebar";
import menu_items from "../config/menu_items";

export default function Home() {
    return (
        <>
            <Sidebar items={menu_items()} />
        </>
    );
}
