"use client";

import { useState } from "react";

function TextExpander({ children }: { children: React.ReactNode }) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<span>
			<span className={isExpanded ? "" : "line-clamp-4"}>{children}</span>{" "}
			<button
				type="button"
				className="text-primary-700 border-primary-700 ml-1 inline-block border-b pb-0.5 text-sm font-semibold hover:cursor-pointer"
				onClick={() => setIsExpanded(!isExpanded)}
			>
				{isExpanded ? "Show less" : "Show more"}
			</button>
		</span>
	);
}

export default TextExpander;
