"use client";

import React, { useEffect, useState } from "react";
// import "./search.css";

function SearchPage() {
    const [value, setValue] = useState("George");

    useEffect(() => {
        const windows: any = window;
        const cx = "73e607a2a5eeb4d79";
        const gcse = document.createElement("script");
        gcse.type = "text/javascript";
        gcse.async = true;
        gcse.src = `https://cse.google.com/cse.js?cx=${cx}`;
        const s: any = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(gcse, s);

        var renderSearchForms = function () {
            if (document.readyState === "complete") {
                windows.google.search.cse.element.render({
                    div: "gcse-searchresults-only",
                    tag: "search",
                    gname: "gsearch",
                });
                const element = windows.google.search.cse.element.getElement("gsearch");
                element.execute(value);
            } else {
                windows.google.setOnLoadCallback(function () {
                    windows.google.search.cse.element.render({
                        div: "gcse-searchresults-only",
                        tag: "search",
                        gname: "gsearch",
                    });
                    const element = windows.google.search.cse.element.getElement("gsearch");
                    element.execute(value);
                }, true);
            }
        };

        windows.__gcse = {
            parsetags: "explicit",
            callback: renderSearchForms,
        };
    }, []);

    return (
        <>
            <div id="search-container" className="w-full h-fit">
                <div id="gcse-searchresults-only"></div>
            </div>
        </>
    );
};

export default SearchPage;